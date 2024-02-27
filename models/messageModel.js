const mongoose = require('mongoose')
const { type } = require('os')
const { text } = require('stream/consumers')
const Schema = mongoose.Schema

const messageSchema = new Schema({
    date:{type:date, required:true},
    author: {type:Schema.Types.ObjectId, ref:'Member', required:true},
    content:{type:text, required:true},
    heading:{type:text, required:true}
})

module.exports = mongoose.model('Message', memberSchema)