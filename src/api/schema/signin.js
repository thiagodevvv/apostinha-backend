const Joi = require('joi')


const schema = Joi.object({
    userNameOrEmail: Joi.string().required(),
    password: Joi.string().required()
})

module.exports = schema