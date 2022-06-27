const newsRouter = require("./news")
const siteRouter = require("./site")

function route(app) {
    //use news router
    app.use("/news", newsRouter)
    app.use("/", siteRouter)
}

module.exports = route;
