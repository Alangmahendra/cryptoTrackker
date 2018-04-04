const Model = require('../models/crypto')
const axios = require('axios')
const CronJob = require('cron').CronJob


class Crypto {
  static getCryptoAndSave(req, res) {
    const job = new CronJob('5 * * * * *', () => {
      console.log('masuk cron');
      axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD')
        .then(response => {
          console.log(response.data)
          let obj = {
            BTC: response.data.BTC.USD,
            ETH: response.data.ETH.USD,
            LTC: response.data.LTC.USD
          }
          Model.create(obj).then(data => {
            console.log('masuk create')
            res.status(200).json({ message: 'data has been save', data: data })
          })
          .catch(err => {
            res.send(err)
          })
        })
        .catch(err => {
          res.send(err)
        })
    },null,true)
  }
}
module.exports = Crypto