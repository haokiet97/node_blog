const Tag = require("../models/Tag")
const SocialNetwork = require("../models/SocialNetwork")
const User = require("../models/User")
const {
    multipleMongooseToObject,
    mongooseToObject,
    addPropertiesToObject,
    parseOrCreateObjectId
} = require("../../util/mongoose")

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
                        return res.redirect(`${tag._id}/update`)
                    }
                    User.findById({_id: tag.userId.toString()}).then((user) => {
                        return res.render("tags/show", {
                            tag: mongooseToObject(tag),
                            user: mongooseToObject(user),
                            socialNetworks: multipleMongooseToObject(socialNetworks)
                        })
                    }).catch(next)
                }
            ).catch(next)
    }

    edit(req, res, next) {
        let currentUser = req.user //get from session
        if (!currentUser) {
            req.session.reqUrl = req.originalUrl
            return res.redirect("/auth/login")
        }
        Tag.findById(req.params.id)
            .then(tag => {
                if (tag.userId && tag.userId.toString() !== currentUser._id.toString()) {
                    return res.redirect(`/tags/${tag._id}`)
                }
                SocialNetwork.find({tagId: req.params.id})
                    .then(socialNetworks => {
                        res.render("tags/edit", {
                            tag: mongooseToObject(tag),
                            socialNetworks: multipleMongooseToObject(socialNetworks)
                        })
                    }).catch(next)

            })
            .catch(next)
    }
    //
    //[PATH] tags/:id/update
    update(req, res, next) {
        // require login
            let currentUserId = req.user._id

        let updateTagUserFunc = Tag.findOneAndUpdate({_id: req.params.id}, {...req.body, userId: currentUserId})
        // let createSocialNetworksFunc = SocialNetwork.insertMany(addPropertiesToObject(req.body.socialNetworks, {tagId: req.params.id, userId: currentUserId}))
        let upsertSocialNetworksFunc = SocialNetwork.bulkWrite(
            req.body.socialNetworks.map((socialNetwork) => {
                    const { _id = parseOrCreateObjectId(null) } = socialNetwork
                    return {
                        updateOne: {
                            filter: {_id, userId: currentUserId},
                            update: {
                                $set: {...socialNetwork, tagId: req.params.id, userId: currentUserId},
                            },
                            upsert: true
                        }
                    }
                }
            )
        )

        Promise.all([updateTagUserFunc, upsertSocialNetworksFunc]).then(
            ([tag, socialNetworks]) => {
                res.json([socialNetworks])
            }
        ).catch(next)

        // Tag.findOneAndUpdate({_id: req.params.id}, {...req.body, userId: currentUserId}).then(tag => {
        //     //return res.json(tag)
        //     // res.redirect("/tags")
        //     return res.redirect(`/tags/${tag._id}`)
        // }).catch(next)
    }
    //[DELETE] tags/:id
    destroy(req, res, next) {
        let currentUser = req.user
        if (! currentUser){
            return res.redirect("back")
        }
        Tag.delete({_id: req.params.id, userId: currentUser._id})
            .then((result) => {
                if(result){
                    return res.redirect("back")
                }
                return next()
            })
            .catch(next)
    }
}

module.exports = new TagController
