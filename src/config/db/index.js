const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect('mongodb://gtap_user:gtap_pass123@localhost:2717/', {dbName: "gtap_db"})
        console.log("Connect to DB successfully!")
    }
    catch (e) {
        console.log("Connect to DB FAILED!")
        throw e
    }
}

module.exports = { connect }
//config authorization for mongo: https://stackoverflow.com/questions/57848302/how-to-solve-command-find-requires-authentication-using-node-js-and-mongoose
// db.createUser({user:"gtap_user", pwd:"gtap_pass123", roles:[{role:"dbOwner", db:"gtap_db"}]});
