const Joi = require('joi')


const schema = Joi.object({
    token: Joi.string().max(4).required(),
    email: Joi.string().email().required(),
    newpass: Joi.string().required()
})

module.exports = schema