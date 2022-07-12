const express = require("express")
const methodOverride = require('method-override')
const handlebars = require("express-handlebars")
const path = require("path")
const morgan = require("morgan")
const route = require("./routes")
const db = require("./config/db")
//using passport to login with google
const passport = require("passport")
const cookieSession = require('cookie-session')
require("./config/passport")
//import middleware

const sortMiddleware = require("./app/middlewares/sortMiddleware")

//using dotenv
require("dotenv").config()

//connect db
db.connect()

//express
const app = express()
const host = "0.0.0.0"
const port = 3000

app.use(morgan("combined"))
//add middleware CUSTOM sort
app.use(sortMiddleware)

// add middleware to get body params
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//override method
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
// override with different headers; last one takes precedence
app.use(methodOverride('X-HTTP-Method')) //          Microsoft
app.use(methodOverride('X-HTTP-Method-Override')) // Google/GData
app.use(methodOverride('X-Method-Override')) //      IBM
//custom override
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    let method = req.body._method
    delete req.body._method
    return method
  }
}))

// setting statics files access
app.use("/statics", express.static(path.resolve(__dirname, "public")))
//use cookie session
app.use(cookieSession({
    name: 'google-auth-session',
    keys: ['key1', 'key2']
}))

app.use(passport.initialize())
app.use(passport.session())
//template engine
app.engine(".hbs", handlebars.engine({extname: ".hbs"}))
app.set("view engine", ".hbs")
// app.enable('view cache')
app.set("views", path.resolve(__dirname, "resources", "views"))
// app.set("views", path.join(__dirname, "./resources/views"))

// Routes init
route(app)

app.listen(port,host, () => {
  console.log(`Example app listening on port ${port}, view"s dir: ${path.resolve(__dirname, "./resources/views")}`)
})
