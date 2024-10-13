const express = require('express')
const app = express()
const todoRoutes = require('./routes/todo.routes')

//Método JSON para leer datos del body
app.use(express.json())

app.use([ todoRoutes ])

module.exports = app