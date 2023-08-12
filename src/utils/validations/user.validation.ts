import * as Joi from 'joi';

const createUserSchema = Joi.object({
    firstName: Joi.string()
        .required()
        .messages({
            'string.base': 'First name must be a string',
            'string.empty': 'First name cannot be empty',
            'any.required': 'First name is required',
        }),

    lastName: Joi.string().required().messages({
        'string.base': 'Last name must be a string',
        'string.empty': 'Last name cannot be empty',
        'any.required': 'Last name is required',
    }),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'br'] } })
        .required()
        .messages({
            'string.base': 'Email must be a string',
            'string.email': 'Email must be a valid email',
            'string.empty': 'Email cannot be empty',
            'any.required': 'Email is required',
        }),

    password: Joi.string()
        .required()
        .pattern(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/
        )
        .messages({
            'string.base': 'Password must be a string',
            'string.pattern.base': 'Password must meet the security criteria',
            'string.empty': 'Password cannot be empty',
            'any.required': 'Password is required',
        }),

    role: Joi.number().required().messages({
        'string.base': 'Role must be a number',
        'string.empty': 'Role cannot be empty',
        'any.required': 'Role is required',
    }),

    cpf: Joi.string()
        .required()
        .pattern(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)
        .messages({
            'string.base': 'CPF must be a string',
            'string.pattern.base': 'CPF must be in the format "123.456.789-00"',
            'string.empty': 'CPF cannot be empty',
            'any.required': 'CPF is required',
        }),
});


const loginUserSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'br'] } })
        .required()
        .messages({
            'string.base': 'Email must be a string',
            'string.email': 'Email must be a valid email',
            'string.empty': 'Email cannot be empty',
            'any.required': 'Email is required',
        }),
    password: Joi.string()
        .required()
});

export {
    createUserSchema,
    loginUserSchema
}