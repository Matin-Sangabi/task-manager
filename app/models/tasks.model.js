const { Schema, Types, model } = require('mongoose')

const tasksSchema = new Schema(
    {
        userId: { type: Types.ObjectId, ref: 'users', required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        status: {
            type: String,
            enums: ['pending', 'in-progress', 'done'],
            default: 'pending',
        },
    },
    { timestamps: true }
)

const taskModel = model('tasks', tasksSchema)
module.exports = {
    taskModel,
}
