module.exports = async function(db, { profValue, occupationsValue, occupationsScheduleValues }){
    
    const insertedProf = await db.run(`
        INSERT INTO profs (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${profValue.name}", 
            "${profValue.avatar}",
            "${profValue.whatsapp}",
            "${profValue.bio}"
        );
    `)

    const prof_id = insertedProf.lastID

    const insertedOccupation = await db.run(`
            INSERT INTO occupations (
                service,
                cost,
                prof_id
            ) VALUES (
                "${occupationsValue.service}",
                "${occupationsValue.cost}",
                "${prof_id}"
            );
    `)

    const occupation_id = insertedOccupation.lastID

    const intesertedAllOccupationsScheduleValues = occupationsScheduleValues.map((occupationsScheduleValue) => {
        return db.run(`
            INSERT INTO occupation_schedule (
                occupation_id,
                weekday,
                time_from,
                time_to
            )  VALUES (
                "${occupation_id}",
                "${occupationsScheduleValue.weekday}",
                "${occupationsScheduleValue.time_from}",
                "${occupationsScheduleValue.time_to}"
            );
        `)
    })

    await Promise.all(intesertedAllOccupationsScheduleValues)

}