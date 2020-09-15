const Database = require('sqlite-async')

function execute(db) {
    // criar as tabelas do banco de dados.
    return db.exec(`
        CREATE TABLE IF NOT EXISTS profs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            whatsapp TEXT,
            bio TEXT
        );

        CREATE TABLE IF NOT EXISTS occupations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            service INTEGER,
            cost TEXT,
            prof_id INTEGER
        );

        CREATE TABLE IF NOT EXISTS occupation_schedule (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            occupation_id INTEGER,
            weekday INTEGER,
            time_from INTEGER,
            time_to INTEGER
        );
    `)
}
module.exports = Database.open(__dirname + '/database.sqlite').then(execute)
