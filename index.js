const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const data = require("./test_data") // importamos data de test

const PUERTO = 4444

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended : true
}))
app.use(cors()) // politica CORS (cualquier origen) <---- TODO: cuidado!!!


//1. Servicio que nos devuelva una lista de carreras
// path: "/carreras" metodo: GET
app.get("/carreras", (req, resp) => {
    resp.send(data.carreras)
})


//2. Servicio (endpoint) que nos devuelva una lista de cursos
// path: "/cursos" metodo: GET
// query parameter "/cursos?carrera=1"
app.get("/cursos", (req, resp) => {
    const carreraId = req.query.carrera

    if (carreraId == undefined) {
        resp.send(data.cursos)
    }else {
        const cursosFiltrados = data.cursos.filter((curso) => {
            if (curso.carreraId == carreraId) return true
            else return false
        })
        resp.send(cursosFiltrados)
    }

})


app.listen(PUERTO, () => {
    console.log(`Servidor web iniciado en puerto ${PUERTO}`)
})

