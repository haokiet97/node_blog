const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const Course = new Schema({
    name: { type: String, maxLength: 255 },
    description: { type: String, maxLength: 500 },
    image: { type: String, maxLength: 500 },
    updated_at: { type: Date, default: Date.now},
    created_at: { type: Date, default: Date.now},
})

module.exports = mongoose.model("Course", Course)