const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const Course = new Schema({
    name: { type: String, maxLength: 255 },
    description: { type: String, maxLength: 500 },
    slug: { type: String, maxLength: 500 },
    image: { type: String, maxLength: 500 },
}, { timestamps: true})

module.exports = mongoose.model("Course", Course)
