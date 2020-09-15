const Database = require('./database/db')

const { services, weekdays, getService, convertHoursToMinutes} = require('./utils/format')

function pageLanding(req,res){
    return res.render("index.html")
}

async function pageProfs(req, res){
    const filters = req.query

    if(!filters.service || !filters.weekday || !filters.time){
        return res.render('profs.html', {filters, services, weekdays})
    }

    const timeToMinutes = convertHoursToMinutes(filters.time)

    const query = `
    SELECT occupations.*, profs.*
    FROM profs
    JOIN occupations ON (occupations.prof_id = profs.id)
    WHERE EXISTS (
            SELECT occupation_schedule.*
            FROM occupation_schedule
            WHERE occupation_schedule.occupation_id = occupations.id
            AND occupation_schedule.weekday = ${filters.weekday}
            AND occupation_schedule.time_from <= ${timeToMinutes}
            AND occupation_schedule.time_to > ${timeToMinutes}
        )
        AND occupations.service = '${filters.service}'
    `
    try {
        const db = await Database
        const profs = await db.all(query)

        profs.map((prof) => {
            prof.service = getService(prof.service)
        })

        return res.render('profs.html', { profs, services, filters, weekdays })

    } catch (error) {
        console.log(error)
    }

}

function pageGiveAppointment(req, res){

    return res.render("give-appointment.html", {services, weekdays})
}

async function saveAppointment (req,res){
    const createProf = require('./database/createProf')
    
    const profValue = {
        name: req.body.name, 
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp, 
        bio: req.body.bio
    }

    const occupationsValue = {
        service: req.body.service, 
        cost: req.body.cost
    }

    const occupationsScheduleValues = req.body.weekday.map((weekday, index) => {
        return {
            weekday,
            time_from: convertHoursToMinutes(req.body.time_from[index]),
            time_to: convertHoursToMinutes(req.body.time_to[index])
        }
    })

   try {
        const db = await Database
        
        await createProf(db, { profValue, occupationsValue, occupationsScheduleValues })

        let queryString = "?service=" + req.body.service
        queryString += "&weekday=" + req.body.weekday[0]
        queryString += "&time=" + req.body.time_from[0]


        return res.redirect("/profs" + queryString)

   } catch (error) {
        console.log(error)
    }
    
}

module.exports = {
    pageLanding,
    pageProfs,
    pageGiveAppointment,
    saveAppointment
}