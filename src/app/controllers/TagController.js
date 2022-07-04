const Tag = require("../models/Tag")
const SocialNetwork = require("../models/SocialNetwork")
const {multipleMongooseToObject, mongooseToObject} = require("../../util/mongoose")

class TagController {

    // index(req, res, next) {
    //     Tag.find({}).sortable(req)
    //         .then(courses => {
    //             res.render("courses/index", {courses: multipleMongooseToObject(courses)})
    //         })
    //         .catch(next)
    // }
    //[GET] tags/:id
    show(req, res, next) {
        Promise.all([Tag.findById(req.params.id), SocialNetwork.find({tagId: req.params.id})])
            .then(([tag, socialNetworks]) => {
                    if (!tag.userId) {
                        // TODO: redirect to update tag for current_user
                        console.log(`Thẻ id: ${tag._id} chưa có thông tin người dùng! Tạo thông tin!`)
                        res.redirect(`${tag._id}/update`)
                        return
                    }
                    res.json([tag, socialNetworks])
                }
            ).catch(next)
    }
    //
    // new(req, res, next) {
    //     res.render("courses/new")
    // }
    //
    // create(req, res, next) {
    //     Course.create(req.body, (err, small) => {
    //         if (err) {
    //             res.json(err)
    //         }
    //         console.log(`create course successfully: ${small}`)
    //     })
    //     res.json(req.body)
    // }
    //[GET] tags/:id/update
    edit(req, res, next) {
        Tag.findById(req.params.id)
            .then(tag => {
                if (tag.userId) {
                    return res.redirect(`/tags/${tag._id}`)
                }
                res.render("tags/edit", {tag: mongooseToObject(tag)})
            })
            .catch(next)
    }
    //
    //[PATH] tags/:id/update
    update(req, res, next) {
        // require login
        let currentUserId = "62bff197aaa5337144dfb445" //TODO: get current userId from Cookie
        console.log(req.body)

        // Tag.findOneAndUpdate({_id: req.params.id}, {...req.body, userId: currentUserId}).then(tag => {
        //     //return res.json(tag)
        //     // res.redirect("/tags")
        //     return res.redirect(`/tags/${tag._id}`)
        // }).catch(next)
        res.json(req.body)
    }
    //[DELETE] tags/:id
    destroy(req, res, next) {
        Tag.delete({_id: req.params.id})
            .then(() => {
                res.redirect("back")
            })
            .catch(next)
    }
}

module.exports = new TagController
