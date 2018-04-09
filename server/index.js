const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const axios = require('axios')
const mongoose = require('mongoose')
const Model = require('./models/crypto')
const bodyParser = require('body-parser')
const CronJob = require('cron').CronJob
const cors = require('cors')


mongoose.connect('mongodb://localhost/crypto')

const index = require('./routes/index')
const crypto = require('./routes/crypto')
const app = express()

app.use(cors())
app.use(index)
app.use('/crypto', crypto)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port = process.env.PORT || 4000
const server = http.createServer(app)
const io = socketIo(server)

const getPrice = async socket => {
  try {
    const res = await Model.find({})
    // console.log('ini res',res[res.length-1].createdAt) 
     socket.emit('BTCFromAPI',res)
  }
  catch(error){
    console.log(`ERROR : ${error.code}`)
  }
}


io.on('connection', socket => {
  console.log('connected io'), setInterval(() => getPrice(socket), 6000)
  socket.on('disconnect', () => {
    console.log('disconnected io');
  })
})



server.listen(port, () => console.log(`listening on port ${port}`))