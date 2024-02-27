const { MemoryStore } = require('express-session')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const memberSchema = new Schema({
        firstName: {type:String, required:true},
        lastName: {type:String, required:true},
        username: {type:String, required:true},
        password: {type:String, required:true},
    })


//virtual for Member Schema
 

module.exports = mongoose.model("Member", memberSchema)