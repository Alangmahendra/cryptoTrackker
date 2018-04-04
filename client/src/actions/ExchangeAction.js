import axios from 'axios'

export function ExchangeAction (coinQuantity,cryptoCoin,currency){
  return dispatch => {
    dispatch(loading())
    axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${cryptoCoin}&tsyms=${currency}`)
    .then(({data})=>{
      const result = data.USD * coinQuantity
      console.log('data',data.USD)
      console.log('rresult',result)
      dispatch(success(result))
    })
    .catch(err => dispatch(error()))
  }
}

function loading(){
  return {
    type:'LOADING'
  }
}

function error(){
  return {
    type:'ERROR'
  }
}

function success(payload){
  return {
    type:'SUCCESS',
    payload
  }
}