require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 8000
const connectDB = require('./db/connect')
const customersRoute = require('./routes/customer')
const productsRoute = require('./routes/products')

//API SECURITY MODULES
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cors = require('cors')
const xss = require('xss-clean')
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml')

app.use(helmet());
app.use(cors())
app.use(xss())

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour",
});

app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use('/getdocs', (req, res) => {
    res.send('<h1>VISIT MY BLOG API VIA THE LINK BELOW</h1><a href="/api-docs">Documentation</a>')
  })
  
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument))
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