const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const data = require("./test_data") // importamos data de test
const { Carrera, Curso } = require("./dao")

const PUERTO = 4444

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended : true
}))
app.use(cors()) // politica CORS (cualquier origen) <---- TODO: cuidado!!!
app.use(express.static("assets")) // <-- configuracion de contenido estatico


//1. Servicio que nos devuelva una lista de carreras
// path: "/carreras" metodo: GET
app.get("/carreras", async (req, resp) => {
    const listaCarreras = await Carrera.findAll()

    resp.send(listaCarreras)
})


//2. Servicio (endpoint) que nos devuelva una lista de cursos
// path: "/cursos" metodo: GET
// query parameter "/cursos?carrera=1"
app.get("/cursos", async (req, resp) => {
    const carreraId = req.query.carrera

    if (carreraId == undefined || carreraId === "-1") {

        const listaCursos = await Curso.findAll()

        resp.send(listaCursos)
    }else {
        const cursosFiltrados = await Curso.findAll({
            where : {
                carrera_id : carreraId
            }
        })
        resp.send(cursosFiltrados)
    }

})


app.listen(PUERTO, () => {
    console.log(`Servidor web iniciado en puerto ${PUERTO}`)
})

