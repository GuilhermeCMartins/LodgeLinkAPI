import * as Joi from 'joi';

export const createReservationSchema = Joi.object({
    checkIn: Joi.string().required().messages({
        'any.required': 'The checkin date is required'
    }),
    checkOut: Joi.string().required().messages({
        'any.required': 'The checkout date is required'
    }),
    user: Joi.required().messages({
        'any.required': 'The user is required'
    }),
    room: Joi.required().messages({
        'any.required': 'The room is required'
    }),
});
