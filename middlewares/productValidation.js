const { StatusCodes } = require('http-status-codes')
const Joi = require('joi')

const productValitaion = async (req, res, next) => {
    try {
        const payload = req.body
        await productSchema.validateAsync(payload)
        next()
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.NOT_ACCEPTABLE).json({error : error.details[0].message})
    }
}

const productSchema = Joi.object({
    product_name : Joi.string()
        .required(),

    price : Joi.number()
        .min(1000)
        .max(30000)
        .required()
})

module.exports = productValitaion