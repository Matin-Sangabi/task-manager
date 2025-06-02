
const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.JWT_SECRET_KEY
function createJwt(payload, expire) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: expire })
}
function verifyJwt(token) {
    return jwt.verify(token, SECRET_KEY)
}
module.exports = {
    createJwt,
    verifyJwt,
}