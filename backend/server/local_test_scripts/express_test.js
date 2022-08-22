//Making connection to the database 
const mongoose = require('mongoose')

//mongoose url
var uri = process.env.TEST_MONGO_URI

const  options = {
    useNewUrlParser:  true,
    useUnifiedTopology:  true
    };


mongoose.connect(uri, options).then(() => {
    console.log("Database connection established")
}), err => {
    console.log("Error connecting Database instance due to: ", err)
}


//Set up Express
const express = require('express')
const app = express()


 
app.listen(3000, ()=> {
    console.log("listening on port 3000");
})

//create Schema 
const dataSchema = mongoose.Schema({
    clinicaddress: String,
    // age: String
}, {collection: 'clinic'})




//create models
var DataModel = mongoose.model("clinic", dataSchema);

app.get('/', (req,res) => {
    DataModel.find(
        {}, function(err,clinicObj) {
            res.json(clinicObj)
    })
})