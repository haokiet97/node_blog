const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId
//slug generator

// const slug_generator = require("mongoose-slug-generator")
const slugGenerator = require("mongoose-slug-updater")
const slugOptions = {
    separator: "-",
    lang: "en",
    truncate: 120
}
//use plugin for mongoose
mongoose.plugin(slugGenerator, slugOptions)

const Course = new Schema({
    name: { type: String, maxLength: 255 },
    description: { type: String, maxLength: 500 },
    slug: { type: String, slug: ["name"], unique: true },
    image: { type: String, maxLength: 500 },
}, { timestamps: true})

module.exports = mongoose.model("Course", Course)
