const Joi = require('joi')


const schema = Joi.object({
    username: Joi.string().min(5).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

module.exports = schema