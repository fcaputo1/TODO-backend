const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Defino el esquema para las tareas
const todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    completed: {
        type: Boolean,
        default: "false"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Todo", todoSchema)