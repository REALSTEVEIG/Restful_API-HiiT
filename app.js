require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 8000
const connectDB = require('./db/connect')
const customerRoute = require('./routes/customer')

app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use('/api/v1', customerRoute)

const start = async () => {
    try {
        await connectDB(process.env.mongo_uri)
        app.listen(port, () => console.log(`Server is listening on port ${port}`))
    } catch (error) {
       console.log(error) 
    }
}

start()