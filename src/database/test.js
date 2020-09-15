const Database  = require('./db')
const createProf = require('./createProf')   

Database.then(async (db) => {
    
    profValue = {
        name: "Ana Silva", 
        avatar: "/imagens/profs/fisio.jpg", 
        whatsapp: "2189917876", 
        bio: "Fisioterapeuta especialista em Fisioterapia em Ortopedia, Gerontologia, Pilates e posturologia. Diagnóstico cinético-funcional e plano de tratamento otimizado.",   
    }

    occupationsValue = {
        service: 2, 
        cost: "80", 
    }

    occupationsScheduleValues = [
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        }
    ]

    //await createProf(db, { profValue, occupationsValue, occupationsScheduleValues })

    //const selectedProfs = await db.all("SELECT * FROM profs")
    //console.log(selectedProfs)

    const selectOccupationsAndProfs = await db.all(`
        SELECT occupations.*, profs.*
        FROM profs
        JOIN occupations ON (occupations.prof_id = profs.id)
        WHERE occupations.prof_id = 1;
    `)
    //console.log(selectServicesAndProfs)

    const selectOccupationsSchedules = await db.all(`
        SELECT occupation_schedule.*
        FROM occupation_schedule
        WHERE occupation_schedule.occupation_id = "1"
        AND occupation_schedule.weekday = "0"
        AND occupation_schedule.time_from <= "1300"
        AND occupation_schedule.time_to >"1300"
    `)

    //console.log(selectServiceSchedules)

})