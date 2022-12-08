const { StatusCodes } = require('http-status-codes')
const Product = require('../models/products')

exports.createProduct = async (req, res) => {
    try {
       const {product_name, price} = req.body 

       if (!product_name || !price) {
        return res.status(StatusCodes.BAD_REQUEST).json({msg : 'Please provide all the required parameters'})
       }

       const newProduct = await Product.create({...req.body})

       return res.status(StatusCodes.CREATED).json({newProduct})

    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error : error.message})
    }
}

exports.getAllProduct = async (req, res) => {
    try {
        const {name, field, sort, numerical} = req.query 

        let queryObject = {} 
    
        if (name) {
            queryObject.product_name = {$regex : name, $options : 'xi'}
        }

        if (numerical) {
            let operatorMap = {
                "<" : "$lt",
                "<=" : "$lte",
                "=" : "$eq",
                ">" : "$gt",
                ">=" : "$gte"
            }

            const regEx = /\b(<|<=|=|>|>=)\b/g

            let filter = numerical.replace(regEx, (match) => `*${operatorMap[match]}*`)
            console.log(filter)

            const options = ['price']

            filter = filter.split(',').forEach((item) => {
                const [regex, operator, value] = item.split('*')
                if (options.includes(regex)) {
                    queryObject[regex] = {[operator] : Number(value)}
                } 
            })
        }
        console.log(queryObject)
        let result = Product.find(queryObject)

        if (field) {
            let fieldList = field.split(',').join(' ')
            result = result.select(fieldList)
        }


        if (sort) {
            let sortList = sort.split(',').join(' ')
            result = result.sort(sortList)
        }

        else {
            result = result.sort('product_name')
        }

        const page = req.query.page || 1
        const limit = req.query.limit || 5
        const skip = (page - 1) * limit

        result = result.skip(skip).limit(limit)

        const products = await result
    
        return res.status(200).json({total : products.length, products})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

exports.getSingleProduct = async (req, res) => {
    try {
       const {id : productId}  = req.params

       const product = await Product.findOne({_id : productId})

       if (!product) {
        return res.status(StatusCodes.NOT_FOUND).json({msg : `Product with id ${productId} does not exist`})
       }

       return res.status(StatusCodes.OK).json({product})
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error : error.message})
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const {params : {id : productId}, body : {product_name, price}} = req

        if (!product_name || !price) {
            return res.status(StatusCodes.BAD_REQUEST).json({msg : `Please provide all the required parameters!`})
        }

        const updateProduct = await Product.findByIdAndUpdate(
            {_id : productId}, 
            req.body, 
            {new : true, runValidators: true})

        if (!updateProduct) {
            return res.status(StatusCodes.NOT_FOUND).json({msg : `Product does not exist!`})
        }

        return res.status(StatusCodes.CREATED).json({updateProduct})
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error : error.message})
    }
}

exports.deleteProduct = async (req, res) => {
   try {
    const {id : productId} = req.params

    const deleteProduct = await Product.findByIdAndDelete({_id : productId})

    if (!deleteProduct) {
        return res.status(StatusCodes.NOT_FOUND).json({msg : `Product with id ${productId} not found`})
    }

    return res.status(StatusCodes.OK).json({msg : `Product deleted successfully!`})
   } catch (error) {
    console.log(error)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error : error.message})
   }
}