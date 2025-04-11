const express = require('express')
const cors = require('cors')
const { connectDB } = require('./connectDB')
const pet_router = require('./routers/pet.router')
const account_router = require('./routers/account.router')
const species_router = require('./routers/species.router')
const supplier_router = require('./routers/supplier.router')
const pet_item_router = require('./routers/pet_item.router')
const item_usage_router = require('./routers/item_usage.router')
const bodyParser = require('body-parser')
const user_router = require('./routers/user.router.js')
const order_router = require('./routers/order.router.js')
const app = express()
const path = require('path')
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.get('/', (req,res)=> {
    res.json({
        message:"Hello"
    })
})
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
connectDB()

app.use('/api/pet',pet_router)
app.use('/api/account',account_router)
app.use('/api/species',species_router)
app.use('/api/order',order_router)
app.use('/api/supplier',supplier_router)
app.use('/api/pet_item', pet_item_router)
app.use('/api/item_usage',item_usage_router)
app.use('/api/user', user_router)

app.listen(3001, () => {
    console.log("Backend is running on port "+ 3001)
})