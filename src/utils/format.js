const services = [
    "Fisioterapia", 
    "Nutrição", 
    "Personal Trainner", 
    "Psicologia",
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]

function getService(serviceNumber){
    const position = +serviceNumber - 1
    return services[position]
}

function convertHoursToMinutes(time){
    const [hour, minutes] = time.split(":")
    return Number((hour * 60) + minutes)
}

module.exports = {
    services,
    weekdays,
    getService,
    convertHoursToMinutes
}