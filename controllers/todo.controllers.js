const Todo = require('../models/todo.model')

//Trae todas las tareas desde la DB
async function getTodos(req, res) {

    try {
        const todos = await Todo.find()
        console.log(todos)
        return res.status(200).send(todos)

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            ok: false,
            message: "Error al obtener las tareas"
        })
    }
}

//Crea una tarea
async function createTodo(req,res) {

    const todo = new Todo(req.body)

    if (!todo.title) {
        console.log("El titulo de la tarea es requerido", todo)
        return res.status(400).send({
            ok: false,
            message: "El título de la tarea es requerido", 
            todo
        })
    }

    try {
        const newTodo = await todo.save()
        console.log(newTodo)

        return res.status(201).send({
            ok: true,
            message: "La tarea se ha creado satisfactoriamente",
            newTodo
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            ok: false, 
            message: "No se ha podido crear la tarea"
        })
    }
}

//Trae desde la DB una tarea específica
async function getTodoById(req,res) {

    try {
        const { id } = req.params
        const todo = await Todo.findById(id)

        if (!todo) {
            console.log("No se ha encontrado la tarea", id);
            return res.status(404).send({
                ok: false, 
                message: "No se ha encontrado la tarea"
            })
        }

        return res.status(200).send({
            ok: true,
            message: "La tarea fue encontrada", 
            todo
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            ok: false, 
            message: "Error al obtener la tarea"
        })
    }
}

//Borra una tarea
async function deleteTodo(req, res) {

    try {
        const { id } = req.params
        const deletedTodo = await Todo.findByIdAndDelete(id)

        if(!deletedTodo) {
            console.log("No se ha encontrado la tarea", id)
            return res.status(404).send({
                ok: false,
                message: "No se ha podido encontrar la tarea"
            })
        }

        console.log("La tarea se ha borrado", deletedTodo)
        return res.status(200).send({
            ok: true,
            message: "La tarea fue borrada correctamente",
            deletedTodo
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            ok: false, 
            message: "No se ha podido borrar la tarea"
        })
    }
}

//Actualizar tarea
async function updateTodo(req,res) {

    try {
        const { id } = req.params
        const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, { new: true })

        if (!updatedTodo) {
            console.log("No se ha encontrado la tarea", id)
            return res.status(404).send({
                ok: false,
                message: "No se ha encontrado la tarea"
            })
        }

        console.log("Se ha actualizado la tarea", updatedTodo)
        return res.status(200).send({
            ok: true,
            message: "Se ha actualizado la tarea correctamente",
            updatedTodo
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            ok: false,
            message: "No se ha podido actualizar la tarea"
        })
    }
}

module.exports = {
    getTodos,
    createTodo,
    getTodoById,
    deleteTodo,
    updateTodo
}