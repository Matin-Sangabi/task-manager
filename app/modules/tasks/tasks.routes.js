const { TaskController } = require('./tasks.controller')

const router = require('express').Router()

router.post('/', TaskController.createTask)
router.get('/', TaskController.getTasks)
router.get('/:id', TaskController.getTaskById)
router.put('/:id', TaskController.updateTask)
router.delete('/:id', TaskController.deleteTask)

module.exports = {
    taskRoutes: router,
}
