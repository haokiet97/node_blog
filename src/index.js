const express = require("express")
const handlebars = require("express-handlebars")
const path = require("path")
const morgan = require("morgan")
const birds = require("./birds")
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
app.set("views", path.resolve(__dirname, "./resources/views"))
// app.set("views", path.join(__dirname, "./resources/views"))

app.get("/", (req, res) => {
  res.render("home")
})

app.get("/search", (req, res) => {
  res.render("search")
})

app.post("/search", (req, res) => {
  let body = req.body
  res.render("search", {"result": `this is result of "${body.q}" `})
})

app.route("/book")
  .get((req, res) => {
    res.send("Get a random book")
  })
  .post((req, res) => {
    res.send("Add a book")
  })
  .put((req, res) => {
    res.send("Update the book${}")
  })

// import bird
app.use("/birds", birds)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}, view"s dir: ${path.resolve(__dirname, "./resources/views")}`)
})
