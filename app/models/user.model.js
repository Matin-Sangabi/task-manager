const { Schema, model } = require('mongoose')

const useSchema = new Schema(
    {
        first_name: { type: String },
        last_name: { type: String },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
)
const userModel = model('users', useSchema)
module.exports = {
    userModel,
}
