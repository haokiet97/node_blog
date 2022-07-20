const Tag = require("../models/Tag")
const SocialNetwork = require("../models/SocialNetwork")
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
        let currentUser = req.user //get from session
        if (!currentUser) {
            req.session.reqUrl = req.originalUrl
            return res.redirect("/auth/login")
        }
        Tag.findById(req.params.id)
            .then(tag => {
                if (tag.userId && tag.userId !== currentUser._id) {
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
        Tag.delete({_id: req.params.id})
            .then(() => {
                res.redirect("back")
            })
            .catch(next)
    }
}

module.exports = new TagController
