const router = require('express').Router()
const crypto = require('../controllers/crypto')

  router.get('/',crypto.getCryptoAndSave)

module.exports = router