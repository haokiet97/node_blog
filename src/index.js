const express = require("express")
const handlebars = require("express-handlebars")
const path = require("path")
const morgan = require("morgan")
const route = require("./routes")
const db = require("./config/db")
//connect db
db.connect()

//express
const app = express()
const port = 3000

app.use(morgan("combined"))

// add middleware to get body params
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// setting statics files access
app.use("/statics", express.static(path.resolve(__dirname, "public")))
//template engine

app.engine(".hbs", handlebars.engine({extname: ".hbs"}))
app.set("view engine", ".hbs")
// app.enable('view cache')
app.set("views", path.resolve(__dirname, "resources", "views"))
// app.set("views", path.join(__dirname, "./resources/views"))

// Routes init
route(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}, view"s dir: ${path.resolve(__dirname, "./resources/views")}`)
})
