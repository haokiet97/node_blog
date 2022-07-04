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

const Tag = new Schema({
    name: {type: String, maxLength: 255, trim: true},
    isActive: {type: Boolean, default: true},
    userId: {type: String, maxLength: 255}
}, { timestamps: true})

//Custom query helper

Tag.query.sortable = function (req) {
    if (req.hasOwnProperty('_sort')) {
        const isValidTye = ["asc", "desc"].includes(req.query.type)
        return this.sort({
            [req.query.type]: isValidTye ? req.query.type : "desc"
        })
    }
    return this
}

//ADD plugin
//set plugin softdelete for TagModel
Tag.plugin(mongoose_delete, { deletedAt : true, indexFields: true, overrideMethods: 'all' })
//use plugin slug for mongoose
mongoose.plugin(slugGenerator, slugOptions)

module.exports = mongoose.model("Tag", Tag)
