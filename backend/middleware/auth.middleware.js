const jwt = require("jsonwebtoken")
const config = require("../config/index");

const verifyToken = (req,res,next) => {
    let token = req.headers["token"]
    console.log("Hello")
    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }
    jwt.verify(token,config.key.jwt_key, (err,decoded)=> {
        if (err) {
            console.log(err)
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }else {
            req.decoded = decoded
            next()
        }
    })
}
module.exports = verifyToken