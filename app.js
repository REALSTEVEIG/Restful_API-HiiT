require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 8000
const connectDB = require('./db/connect')
const customersRoute = require('./routes/customer')
const productsRoute = require('./routes/products')

//API SECURITY MODULES
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const expressRateLimmitter = require('express-rate-limit')
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml')

app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.set('trust proxy', 1)
app.use(helmet())
app.use(cors())
app.use(xss())
app.use(expressRateLimmitter({windowMs : 60 * 1000, max : 60}))

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
app.use('/api/v1', customersRoute)
app.use('/api/v1', productsRoute)

const start = async () => {
    try {
        await connectDB(process.env.mongo_uri)
        app.listen(port, () => console.log(`Server is listening on port ${port}`))
    } catch (error) {
       console.log(error) 
    }
}

start()