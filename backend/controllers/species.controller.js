const  SpeciesService  = require("../services/species.service")

exports.findAll = async (req,res,next) => {
    const species = await SpeciesService.findAll()
    return res.json(species)
}
exports.create = async (req,res,next) => {
    try {
        console.log(req.body)
        const result = await SpeciesService.create(JSON.parse(req.body.species), req.file.filename)
        if (!result) {
            return res.json({statusCode: 401,message: "Create species failed."})
        }
        return res.json({statusCode: 200,message: "Create species successfully."})
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
        const pet = await SpeciesService.findOne({where:{id: req.params.id}})
        if (!pet)
            return res.json({statusCode: 404,message: "Account not found"})
        return res.json(pet)
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: "Cannot connect to server"
        })
    }
}
exports.update = async (req,res,next) => {
     try {
        const species = await SpeciesService.update(req.params.id, req.body)
        if (!species)
            return res.json({statusCode: 404,message: "Species not found"})
        return res.json(species)
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: "Cannot connect to server"
        })
    }
}
exports.delete = async (req,res,next) => {
    try {
        const result = await SpeciesService.delete(req.params.id)
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