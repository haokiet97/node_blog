const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

//slug generator
// import const slug_generator = require("mongoose-slug-generator")
const slugGenerator = require("mongoose-slug-updater")
const slugOptions = {
    separator: "-",
    lang: "en",
    truncate: 120
}
// import soft delete
const mongoose_delete = require('mongoose-delete');

const Course = new Schema({
    name: { type: String, maxLength: 255 },
    description: { type: String, maxLength: 500 },
    slug: { type: String, slug: ["name"], unique: true },
    image: { type: String, maxLength: 500 },
}, { timestamps: true})

//ADD plugin
//set plugin softdelete for CourseModel
Course.plugin(mongoose_delete, { deletedAt : true, indexFields: true, overrideMethods: 'all' })
//use plugin slug for mongoose
mongoose.plugin(slugGenerator, slugOptions)

module.exports = mongoose.model("Course", Course)
