const Joi = require('joi');

const createTaskValidation = {
    body: Joi.object().required().keys({
        title: Joi.string(),
        description: Joi.string(),
        dueDate: Joi.date(),
    })
};

module.exports = {createTaskValidation}