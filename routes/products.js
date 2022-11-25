const express = require('express')
const authMiddleware = require('../middlewares/auth')
const router = express.Router()
const productValitaion = require('../middlewares/productValidation')

const {
    createProduct,
    getAllProduct,
    getSingleProduct, 
    updateProduct, 
    deleteProduct} = require('../controllers/products')

router.route('/product').post(authMiddleware, productValitaion,createProduct).get(getAllProduct)
router.route('/product/:id').get(getSingleProduct).patch(authMiddleware, updateProduct).delete(authMiddleware, deleteProduct)

module.exports = router
