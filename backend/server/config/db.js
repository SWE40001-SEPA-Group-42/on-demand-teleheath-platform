const mongoose = require('mongoose')

const dbUrl =  "mongodb+srv://sepagroup42:sepagroup42@cluster0.t4qslyt.mongodb.net/SEPA_Group_42?retryWrites=true&w=majority"
const connectDB = async () => {
    try {
        //const conn = await mongoose.connect(process.env.MONGO_URI)
        
        const conn = await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log(`MongoDB Connected on: ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB