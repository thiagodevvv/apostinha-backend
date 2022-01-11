const Joi = require('joi')


const schema = Joi.object({
    token: Joi.string().required()
})

module.exports = schema