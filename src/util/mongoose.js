module.exports = {
    multipleMongooseToObject: function (mongooses) {
        return mongooses.map(mongooses => mongooses.toObject())
    },
    mongooseToObject: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose
    },
    addPropertiesToObject: function (objects, properties){
        return objects.map(obj=> ({ ...obj, ...properties}))
    }
}
