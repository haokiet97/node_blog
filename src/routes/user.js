const express  = require("express")
const router = express.Router()
const userController = require("../app/controllers/UserController")
const multer  = require('multer')

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../public/img/users");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `${req.user._id}.${ext}`);
    },
})
// const upload = multer({dest: "../public/img/users/"})
const upload = multer({storage: multerStorage})


router.get("/:id/update",  userController.edit)
router.post("/:id/update", upload.single("avatarFile"), userController.update)


module.exports = router
