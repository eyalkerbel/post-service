import {celebrate, Joi} from 'celebrate'


export const createPostSchema = celebrate({
    body: Joi.object({
        title: Joi.string().required(),
        body: Joi.string().required(),
        user: Joi.string().required(),
    }),
})

export const getPostsSchema = celebrate({
    query: Joi.object({
        start: Joi.number().integer().min(0),
        limit: Joi.number().integer().min(0),
    }),
})