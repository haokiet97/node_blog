const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/gtap_db')
        console.log("Connect to DB successfully!")
    }
    catch (e) {
        console.log("Connect to DB FAILED!")
        throw e
    }
}

module.exports = { connect }
