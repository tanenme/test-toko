import Joi from "joi";

export const userSchema = Joi.object({
    username: Joi.string().max(10).min(6).required(),
    password: Joi.string().max(60).min(8).required()
})

