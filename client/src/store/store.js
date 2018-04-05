import {createStore,applyMiddleware,combineReducers} from 'redux'
import thunk from 'redux-thunk'
// import rootReducers from '../reducers/indexReducers'
// import {combineReducers} from 'redux'
import getAndSave from '../reducers/getCryptoAndSaveReducers'
import exchange from '../reducers/exchangeReducers'

const rootReducers = combineReducers({
  getAndSave,
  exchange
})

export default createStore(
  rootReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
)