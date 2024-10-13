const express = require('express')
const router = express.Router()
const todoControllers = require('../controllers/todo.controllers')

//Trae las tareas desde la DB
router.get("/todos", todoControllers.getTodos)

//Crea una tarea
router.post("/todos", todoControllers.createTodo)

//Busca una tarea por Id en la DB
router.get("/todos/:id", todoControllers.getTodoById)

//Borra una tarea
router.delete("/todos/:id", todoControllers.deleteTodo)

//Actualizar tarea
router.put("/todos/:id", todoControllers.updateTodo)

//Exporta los endpoints
module.exports = router