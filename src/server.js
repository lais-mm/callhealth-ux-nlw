const express = require('express')
const server = express()

const {
    pageLanding,
    pageProfs,
    pageGiveAppointment,
    saveAppointment
} = require('./pages')

//nunjucks (template engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache:true,
})

//Configurar arquivos estáticos (css,scripts,imgs)
server
.use(express.urlencoded({ extended: true}))
.use(express.static("public"))
//Rotas da aplicação
.get("/", pageLanding)
.get("/profs", pageProfs)
.get("/give-appointment", pageGiveAppointment)
.post("/save-appointment", saveAppointment)
//server
.listen(5500)
