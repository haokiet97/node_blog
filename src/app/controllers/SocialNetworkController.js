const Tag = require("../models/Tag")
const SocialNetwork = require("../models/SocialNetwork")
const {multipleMongooseToObject, mongooseToObject, addPropertiesToObject} = require("../../util/mongoose")

class SocialNetworkController {

    // index(req, res, next) {
    //     Tag.find({}).sortable(req)
    //         .then(courses => {
    //             res.render("courses/index", {courses: multipleMongooseToObject(courses)})
    //         })
    //         .catch(next)
    // }
    //[GET] tags/:id
    // show(req, res, next) {
    //     Promise.all([Tag.findById(req.params.id), SocialNetwork.find({tagId: req.params.id})])
    //         .then( ([tag, socialNetworks]) => {
    //             if (!tag.userId){
    //                 // TODO: redirect to update tag for current_user
    //                 console.log(`Thẻ id: ${tag._id} chưa có thông tin người dùng! Tạo thông tin!`)
    //                 return res.json(null)
    //             }
    //             res.json(tag, socialNetworks)
    //             }
    //         ).catch(next)
    // }
    //[GET] tags/:tag_id/social_networks/create
    new(req, res, next) {
        if (!req.params.tag_id){
            res.send("New networks")
            return
        }

        Tag.findById(req.params.tag_id).then( tag => {
            // res.render("social_networks/new", {tag: mongooseToObject(tag)})
            res.send("NEW Networks with tag's info")
        }).catch(next)
        // res.render("social_networks/new")

    }
    //
    create(req, res, next) {
        let currentUserId = 1 // TODO: get current login user id
        let tag_id = req.params.tag_id
        if (!tag_id){
            res.send("Don't have tag's info")
            return
        }
        Tag.findOne({_id: tag_id, userId: currentUserId})
            .then(tag => {
                SocialNetwork.insertMany(addPropertiesToObject(req.body.socialNetworks, {tagId: tag_id, userId: currentUserId}))
            })
            .catch(next)

        res.json(req.body)
    }
    //
    // edit(req, res, next) {
    //     Course.findById(req.params.id)
    //         .then(course => {
    //             res.render("courses/edit", {course: mongooseToObject(course)})
    //         })
    //         .catch(next)
    // }
    //
    //[PATH] tags/:id
    update(req, res, next) {
        // require login
        let currentUserId = 1 //TODO: get current userId from Cookie

        Tag.findOneAndUpdate({_id: req.params.id}, req.body).then(tag => {
            res.json(tag)
            // res.redirect("/tags")
        }).catch(next)
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

module.exports = new SocialNetworkController
