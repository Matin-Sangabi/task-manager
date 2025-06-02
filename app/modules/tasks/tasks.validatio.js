const joi = require('joi')

const createTaskSchema = joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
})

const updateTaskSchema = joi.object({
    title: joi.string().optional(),
    description: joi.string().optional(),
    status: joi.string().optional(),
})

module.exports = {
    createTaskSchema,
    updateTaskSchema,
}
