const { Router } = require('express')
const { TaskController } = require('./tasks.controller')
const router = Router()

router.post('/', TaskController.createTask)
router.get('/', TaskController.getTasks)
router.get('/:id', TaskController.getTaskById)
router.put('/:id', TaskController.updateTask)
router.delete('/:id', TaskController.deleteTask)

module.exports = {
    taskRoutes: router,
}
