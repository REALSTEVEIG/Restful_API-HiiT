const mongoose = require('mongoose')

const productsSchema = mongoose.Schema({
    product_name : {
        type : String
    },

    price : {
        type : String
    }
})

module.exports = mongoose.model('Product', productsSchema)