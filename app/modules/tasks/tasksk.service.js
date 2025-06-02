const autoBind = require('auto-bind')
const { taskModel } = require('../../models/tasks.model')
const { userModel } = require('../../models/user.model')

class TaskService {
    #taskModel
    #userModel
    constructor() {
        autoBind(this)
        this.#taskModel = taskModel
        this.#userModel = userModel
    }

    async createTask(taskDto) {
        const { title, description, userId } = taskDto
        const task = await this.#taskModel.create({
            title,
            description,
            userId,
        })
        return task
    }

    async getTasks(userId) {
        const tasks = await this.#taskModel
            .find({ userId })
            .populate('userId', 'first_name last_name')
            .sort({ createdAt: -1 })
        return tasks
    }

    async getTaskById(taskId, userId) {
        const task = await this.#taskModel
            .findOne({ _id: taskId, userId })
            .populate('userId', 'first_name last_name')
        return task
    }

    async updateTask(taskId, userId, taskDto) {
        const task = await this.#taskModel.findOneAndUpdate(
            { _id: taskId, userId },
            taskDto,
            { new: true }
        )
        return task
    }

    async deleteTask(taskId, userId) {
        const task = await this.#taskModel.findOneAndDelete({
            _id: taskId,
            userId,
        })
        return task
    }

    async getUserTasks(userId) {
        const tasks = await this.#taskModel.find({ userId })
        return tasks
    }
}

module.exports = {
    TaskService: new TaskService(),
}
