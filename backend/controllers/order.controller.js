const { Op } = require("sequelize")
const orderService = require("../services/order.service")
const petService = require("../services/pet.service")
const petItemService = require("../services/pet_item.service")

exports.findAll = async (req,res,next) => {
    const orders = await orderService.findAll({where: {status: "PROCESSING"}})
    return res.send(orders)
}

exports.findHistory = async (req,res,next) => {
    try {
        let orders = []
        if (req.query.id == null) {
            orders = await orderService.findAllHistory({where: {status: {
                [Op.ne]: 'PROCESSING'
            }},attributes: {exclude: ['createdAt']}})
        } else {
            orders = await orderService.findAllHistory({where: {buyer_id: req.query.id,status: {
                    [Op.ne]: 'PROCESSING'
            }}})
    }
    
    return res.send(orders)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            statusCode: 500,
            message: "Cannot connect to server"
        })
    }
}
exports.create = async (req,res,next) => {
    try {
        console.log(req.body)
        const result = await orderService.createMany(req.body.orders, req.body.address)
        if (result) return res.json({statusCode: 200, message:"Order created successfully"})
        return {statusCode: 401, message:"Create orders fail"}
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            statusCode: 500,
            message: "Cannot connect to server"
        })
    }
}
exports.findOne = async (req,res,next)=> {
    try {
        const pet = await orderService.findOne({where:{id: req.params.id}})
        if (!pet)
            return res.json({statusCode: 404,message: "Account not found"})
        return res.json(pet)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            statusCode: 500,
            message: "Cannot connect to server"
        })
    }

}
exports.findByUser = async (req,res,next)=> {
    console.log(req.params)
    try {
        const pet = await orderService.findAll({where:{buyer_id: req.params.id, status: "PROCESSING"}})
        console.log(pet)
        if (!pet)
            return res.json({statusCode: 404,message: "Account not found"})
        return res.json(pet)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            statusCode: 500,
            message: "Cannot connect to server"
        })
    }

}
exports.delete = async (req,res,next) => {
    try {
        const result = await orderService.delete(req.params.id)
        if (!result) {
            console.log(result)
            return res.json(result)
        }
        return res.json(result)
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: "Cannot connect to server"
        })
    }
}
exports.cancel = async (req,res,next) => {
    try {
        const result = await orderService.cancel(req.params.id, req.body.staff_id)
        if (!result) {
            console.log(result)
            return res.json(result)
        }
        return res.json(result)
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: "Cannot connect to server"
        })
    }
}

exports.finish = async (req,res,next) => {
    try {
        const result = await orderService.finish(req.params.id, req.body.staff_id)
        if (!result) {
            console.log(result)
            return res.json({statusCode: 404,message: "Order not found"})
        }
        return res.json({statusCode: 200,message: "Delivery done"})
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: "Cannot connect to server"
        })
    }
}
exports.update = async (req,res,next) => {
     try {
        const order = await orderService.findOne({where: {id: req.params.id}})
        let merchandiseType = 0;
        let merchandise = await petService.findOne({where: {id : order.merchandise_id}})
        if (!merchandise) {
            
            merchandise = await petItemService.findOne({where: {id: order.merchandise_id}})
            if (!merchandise) {
                return res.status(404).json({
                    message: "Merchandise not found"
                })
            }
            merchandiseType = 1;
        }
        let updateOrder;
        if (merchandise.quantity < order.quantity) {
            updateOrder = await orderService.cancel(req.params.id, req.body.staff_id)
            return res.json(updateOrder)
        }
        merchandise.quantity -= order.quantity
        if (merchandiseType) {
            const reslt = await petItemService.updateQuantity(merchandise.id,merchandise.quantity)
            console.log(reslt)
        }
        else {
            console.log(merchandise.quantity)
            const res = await petService.updateQuantity(merchandise.quantity,merchandise.id)
            console.log(res)
        }
        updateOrder = await orderService.accept(req.params.id, req.body.staff_id)
        if (!updateOrder)
            return res.json({statusCode: 404,message: "Order not found"})
        return res.json(merchandise)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            statusCode: 500,
            message: "Cannot connect to server"
        })
    }
}

exports.countProcessingOrder = async (req,res,next) => {
    try {
        const result = await orderService.countProcessingOrder()
        console.log(result)
        return res.json(result)
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: "Cannot connect to server"
        })
    }
}
