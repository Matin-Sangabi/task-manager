const bcrypt = require('bcrypt')

async function hashPassword(password) {
    const saltRounds = 10
    const saltPass = await bcrypt.genSaltSync(saltRounds)

    const hashedPass = await bcrypt.hashSync(password, saltPass)

    return `${hashedPass}`
}

async function verifyPassword(password, hashPassword) {
    const hashedPassword = hashPassword
    const verify = await bcrypt.compareSync(password, hashedPassword)
    
    return verify
}

module.exports = {
    hashPassword,
    verifyPassword,
}