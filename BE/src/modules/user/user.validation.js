const Joi = require('joi');

const logInValidation = {
    body: Joi.object().required().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    })
};

module.exports = {logInValidation}