class TaskController {
    #taskService
    constructor() {
        autoBind(this)
        this.#taskService = TaskService
    }

    async createTask(req, res, next) {
        try {
            const { title, description } = req.body
            const { id } = req.user
            const taskDto = { title, description, userId: id }
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
            const { id } = req.user
            const tasks = await this.#taskService.getTasks(id)
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
            const { id: userId } = req.user
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
            const { id } = req.params
            const { id: userId } = req.user
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
            const { id: userId } = req.user
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
