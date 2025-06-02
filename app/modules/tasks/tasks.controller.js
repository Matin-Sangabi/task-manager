const autoBind = require('auto-bind')
const { TaskService } = require('./tasksk.service')
const { createTaskSchema, updateTaskSchema } = require('./tasks.validatio')

class TaskController {
    #taskService
    constructor() {
        autoBind(this)
        this.#taskService = TaskService
    }

    async createTask(req, res, next) {
        try {
            await createTaskSchema.validateAsync(req.body)
            const { title, description } = req.body
            const { _id } = req.user
            const taskDto = { title, description, userId: _id }
            const task = await this.#taskService.createTask(taskDto)
            res.status(201).json({
                message: 'Task created successfully',
                data: task,
            })
        } catch (error) {
            next(error)
        }
    }

    async getTasks(req, res, next) {
        try {
            const { _id } = req.user
            const tasks = await this.#taskService.getTasks(_id)
            res.status(200).json({
                message: 'Tasks fetched successfully',
                data: tasks,
            })
        } catch (error) {
            next(error)
        }
    }

    async getTaskById(req, res, next) {
        try {
            const { id } = req.params
            const { _id: userId } = req.user
            const task = await this.#taskService.getTaskById(id, userId)
            res.status(200).json({
                message: 'Task fetched successfully',
                data: task,
            })
        } catch (error) {
            next(error)
        }
    }

    async updateTask(req, res, next) {
        try {
            await updateTaskSchema.validateAsync(req.body)
            const { id } = req.params
            const { _id: userId } = req.user
            const taskDto = req.body
            const task = await this.#taskService.updateTask(id, userId, taskDto)
            res.status(200).json({
                message: 'Task updated successfully',
                data: task,
            })
        } catch (error) {
            next(error)
        }
    }

    async deleteTask(req, res, next) {
        try {
            const { id } = req.params
            const { _id: userId } = req.user
            const task = await this.#taskService.deleteTask(id, userId)
            res.status(200).json({
                message: 'Task deleted successfully',
                data: task,
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    TaskController: new TaskController(),
}
