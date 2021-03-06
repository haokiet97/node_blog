const newsRouter = require("./news")
const siteRouter = require("./site")
const courseRouter = require("./course")
const tagRouter = require("./tag")
const authRouter = require("./auth")

function route(app) {
    //use news router
    app.use("/auth", authRouter)
    app.use("/courses", courseRouter)
    app.use("/news", newsRouter)
    app.use("/tags", tagRouter)
    app.use("/", siteRouter)
}

module.exports = route;
