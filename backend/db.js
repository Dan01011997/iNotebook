const mongoose  = require('mongoose')
const mongoURI="mongodb://0.0.0.0:27017/inotebook"
const connecttoMongo = async () => {
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(mongoURI) 
        console.log('Connected to mongo')
    }
    catch(error) {
        console.log(error)
        process.exit()
    }
    }

module.exports=connecttoMongo; 