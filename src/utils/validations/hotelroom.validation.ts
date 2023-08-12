import * as Joi from 'joi';

export const createHotelRoomSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.base': 'The name must be a string',
        'any.required': 'The name is required',
    }),

    description: Joi.string().required().messages({
        'string.base': 'The description must be a string',
        'any.required': 'The description is required',
    }),

    pricePerNight: Joi.number().required().messages({
        'number.base': 'The price must be a number',
        'any.required': 'The price is required',
    }),

    capacity: Joi.number().required().messages({
        'number.base': 'The capacity must be a number',
        'any.required': 'The capacity is required',
    }),

    isAvailable: Joi.boolean().required().messages({
        'boolean.base': 'The availability must be a boolean',
        'any.required': 'The availability is required',
    }),

    onPromotion: Joi.object({
        status: Joi.boolean().required().messages({
            'boolean.base': 'The onPromotion status must be a boolean',
            'any.required': 'The onPromotion status is required',
        }),
        newPrice: Joi.when('status', {
            is: true,
            then: Joi.number().required().messages({
                'number.base': 'The new price must be a number',
                'any.required': 'The new price is required when onPromotion status is true',
            }),
            otherwise: Joi.forbidden(),
        }),
        initialDate: Joi.when('status', {
            is: true,
            then: Joi.date().required().messages({
                'date.base': 'The initial date must be a valid date',
                'any.required': 'The initial date is required when onPromotion status is true',
            }),
            otherwise: Joi.forbidden(),
        }),
        endDate: Joi.when('status', {
            is: true,
            then: Joi.date().required().messages({
                'date.base': 'The end date must be a valid date',
                'any.required': 'The end date is required when onPromotion status is true',
            }),
            otherwise: Joi.forbidden(),
        }),
    }),

    imageURL: Joi.string().allow(null).optional().messages({
        'string.base': 'The image URL must be a string',
        'string.empty': 'The image URL cannot be empty',
    }),
});
