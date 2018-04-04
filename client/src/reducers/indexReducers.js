import {combineReducers} from 'redux'
import getAndSave from './getCryptoAndSave'
import exchange from './Exchange'

export default combineReducers({
  getAndSave,
  exchange
})

