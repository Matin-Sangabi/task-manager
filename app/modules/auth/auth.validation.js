const joi = require('joi')

const registerSchema = joi.object({
    email: joi.string().email().required(),
    password: joi
        .string()
        .pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/
        )
        .message(
            'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character'
        )
        .required(),
    first_name: joi.string().required(),
    last_name: joi.string().required(),
})

const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi
        .string()
        .pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/
        )
        .message(
            'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character'
        )
        .required(),
})

module.exports = {
    registerSchema,
    loginSchema,
}
