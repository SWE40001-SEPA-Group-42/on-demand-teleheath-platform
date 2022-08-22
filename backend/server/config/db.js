const mongoose = require('mongoose')
const Mockgoose = require('mockgoose').Mockgoose

const connectDB = async () => {
    try {
        // Please use .env file to store db connections

        if (process.env.NODE_ENV == 'test') {

            const mockgoose = new Mockgoose(mongoose)
            
            const conn = mockgoose.prepareStorage().then(()=> {
                mongoose.connect(process.env.TEST_MONGO_URI, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                })
            })
            console.log(`MongoDB Connected on MOCK DB`)
            
        } else {
            const conn = await mongoose.connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })

            console.log(`MongoDB Connected on: ${conn.connection.host}`)
        }

    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

const closeDB = async() => {
    return mongoose.disconnect()
}

module.exports = { connectDB, closeDB }