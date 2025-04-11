const { Op } = require("sequelize")
const petService = require("../services/pet.service")

exports.findAll = async (req,res,next) => {
    try {
        if (req.params.search != "*") {
            return res.json(await petService.findAll({where: {pet_name: {[Op.iLike]: `%${req.params.search}%`}}}))
        }
        const pets = await petService.findAll()
        return res.status(200).json(pets)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            statusCode: 500,
            message: "Cannot connect to server"
        })
    }
}
exports.findWithSpeciesId = async (req,res,next) => {
    try {
        console.log("hello from here")
        const pets = await petService.findAll({where:{species_id:req.params.id}})
        console.log(pets)
        return res.status(200).json(pets)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            statusCode: 500,
            message: "Cannot connect to server"
        })
    }
}
exports.create = async (req,res,next) => {
    try {
        console.log(req.body)
        const result = await petService.create(JSON.parse(req.body.pet), req.file.filename)
        if (!result) {
            return res.json({statusCode: 401,message: "Add pet failed"})
        }
        return res.json({statusCode: 200,message: "Add pet successfully"})
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
        console.log(req.params.id)
        const pet = await petService.findOne({where:{id: req.params.id}})
        if (!pet)
            return res.json({statusCode: 404,message: "Pet not found"})
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
        const result = await petService.delete(req.params.id)
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
exports.update = async (req,res,next) => {
     try {
        const pet = await petService.update(req.params.id, req.body)
        if (!pet)
            return res.json({statusCode: 404,message: "Pet not found"})
        return res.json({statusCode: 200,message: "Create pet successfully"})
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: "Cannot connect to server"
        })
    }
}
exports.count = async (req,res,next) => {
    try {
        console.log()
        const result = await petService.count()
        console.log(result)
        return res.json(result)
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: "Cannot connect to server"
        })
    }
}