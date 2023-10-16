const mongoose = require("mongoose");

var mongoURL = 'mongodb+srv://panda:panda0418@cluster0.uq1iqq9.mongodb.net/mern_room'

mongoose.connect(mongoURL,{useUnifiedTopology : true, useNewUrlParser: true})

var connection = mongoose.connection

connection.on('error', ()=>{
    console.log('Mongodb connection failed')
})

connection.on('connected',()=>{
    console.log('successfully connected to mongodb')
})

module.exports = mongoose