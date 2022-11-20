const mongoose = require('mongoose')

const productsSchema = mongoose.Schema({
    product_name : {
        type : String
    },

    price : {
        type : Number
    }
})

module.exports = mongoose.model('Product', productsSchema)