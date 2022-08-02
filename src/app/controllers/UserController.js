const User = require("../models/User")
const {
    multipleMongooseToObject,
    mongooseToObject,
    addPropertiesToObject,
    parseOrCreateObjectId
} = require("../../util/mongoose")

class UserController {

    //[GET] users/:id/update
    edit(req, res, next) {
        if (req.user){
            return res.render("users/edit", {user: req.user})
        }
        return res.redirect("/")
    }

    update(req, res, next) {
        let currentUser = req.user

        if (! currentUser) {
            return res.redirect("back")
        }
        User.findById(currentUser._id).then((user) =>{
            let update_params = req.body
            delete update_params["avatarFile"]
            if (req.file){
                console.log(req.file)
                update_params["avatarPath"] = req.file.filename
            }
            user.updateOne(update_params).exec()

            return res.json(user)
        }).catch(next)

    }
}

module.exports = new UserController
