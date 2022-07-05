const mongoose = require("mongoose")

module.exports = {
    multipleMongooseToObject: function (mongooses) {
        return mongooses.map(mongooses => mongooses.toObject())
    },
    mongooseToObject: function (mongooseObj) {
        return mongooseObj ? mongooseObj.toObject() : mongooseObj
    },
    addPropertiesToObject: function (objects, properties){
        return objects.map(obj=> ({ ...obj, ...properties}))
    },
    parseOrCreateObjectId: function (objectId){
        return objectId ? objectId : mongoose.Types.ObjectId()
    }
}
