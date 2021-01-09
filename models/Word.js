const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  word: {type: String, required: true},
  translate: {type: String, required: false},
  code: {type: String, required: true, unique: true},
  updateDate: {type: Date, default: Date.now},
  trainDate: {type: Date, default: new Date('1970-01-01T00:00:00Z')},
  sound: {type: String, required: false},
  train1:{type:Boolean,default:false},
 /* code: {type: Number, default: 0},*/
  owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Word', schema)