const Course = require("../models/Course")
const {multipleMongooseToObject, mongooseToObject} = require("../../util/mongoose")

class CourseController {

    index(req, res, next) {
        Course.find({}).sortable(req)
            .then(courses => {
                res.render("courses/index", {courses: multipleMongooseToObject(courses)})
            })
            .catch(next)
    }

    show(req, res, next) {
        let slug = req.params.slug
        Course.findOne({slug: slug})
            .then(course => {
                res.render("courses/show", {course: mongooseToObject(course)})
            })
            .catch(next)

    }

    new(req, res, next) {
        res.render("courses/new")
    }

    create(req, res, next) {
        Course.create(req.body, (err, small) => {
            if (err) {
                res.json(err)
            }
            console.log(`create course successfully: ${small}`)
        })
        res.json(req.body)
    }

    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => {
                res.render("courses/edit", {course: mongooseToObject(course)})
            })
            .catch(next)
    }

    update(req, res, next) {
        Course.findOneAndUpdate({_id: req.params.id}, req.body).then(() => {
            res.redirect("/courses")
        }).catch(next)
    }

    destroy(req, res, next) {
        Course.delete({_id: req.params.id})
            .then(() => {
                res.redirect("back")
            })
            .catch(next)
    }
}

module.exports = new CourseController
