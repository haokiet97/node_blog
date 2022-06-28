const Course = require("../models/Course")

const { multipleMongooseToObject } = require("../../util/mongoose")

class SiteController {
    // GET home page
    home(req, res, next) {

        // callback function
        // Course.find({}, function (err, courses){
        //     if (!err) res.json(courses)
        //     else res.status(500).json({error: "Cannot get courses!"})
        // })
        //promise
        Course.find({})
            .then(courses => {
                res.render("home", {courses: multipleMongooseToObject(courses)})
            })
            .catch(next)

        // res.render("home")
    }

    //GET search page
    search(req, res) {
        res.render("search")
    }

    //POST search
    post_search(req, res) {
        let body = req.body
        res.render("search", {"result": `this is result of "${body.q}" `})
    }
}

module.exports = new SiteController
