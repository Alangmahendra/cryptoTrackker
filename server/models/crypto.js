const mongoose = require('mongoose')
const Schema = mongoose.Schema

  let CryptoSchema = new Schema({
    BTC:String,
    ETH:String,
    LTC:String
  },{timestamps : {}})

  let CryptoModel = mongoose.model('crypto',CryptoSchema)

  module.exports = CryptoModel