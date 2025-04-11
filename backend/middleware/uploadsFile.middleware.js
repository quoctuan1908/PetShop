const multer = require('multer');

const storage1 = multer.diskStorage({
    destination: (req,file,cb)=> {
        cb(null,'./uploads/images/pets')
    },
    filename: (req,file,cb)=> {
        cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
    }
})


const storage2 = multer.diskStorage({
    destination: (req,file,cb)=> {
        cb(null,'./uploads/images/species')
    },
    filename: (req,file,cb)=> {
        cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
    }
})

const storage3 = multer.diskStorage({
    destination: (req,file,cb)=> {
        cb(null,'./uploads/images/items')
    },
    filename: (req,file,cb)=> {
        cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
    }
})


const uploadsPet = multer({storage: storage1})
const uploadsSpecies = multer({storage: storage2})
const uploadsItem = multer({storage: storage3})
module.exports = {
    uploadsPet,
    uploadsSpecies,
    uploadsItem
};
