class SiteController {
    // GET home page
    home(req, res) {
        res.render("home")
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
