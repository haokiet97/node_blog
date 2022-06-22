import express from "express"
import { engine } from "express-handlebars"
import * as path from "path"
import { fileURLToPath } from "url"
import morgan from "morgan"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const port = 3000
app.use(morgan("combined"))
// setting statics files access
app.use("/statics", express.static(path.resolve(__dirname, "public")))
//template engine

app.engine(".hbs", engine({extname: ".hbs"}))
app.set("view engine", ".hbs")
app.set("views", path.resolve(__dirname, "./resources/views"))
// app.set("views", path.join(__dirname, "./resources/views"))

app.get("/", (req, res) => {
  res.render("home")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}, view"s dir: ${path.resolve(__dirname, "./resources/views")}`)
})
