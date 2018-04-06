import axios from 'axios'

export function ExchangeAction (coinQuantity,cryptoCoin,currency){
  return dispatch => {
    dispatch(loading())
    axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${cryptoCoin}&tsyms=${currency}`)
    .then(({data})=>{
      const result = Number(data[currency]) * Number(coinQuantity)
      console.log('data',data)
      console.log('rresult',result)
      dispatch(success(Math.round(result)))
    })
    .catch(err => dispatch(error()))
  }
}

export function loading(){
  return {
    type:'LOADING'
  }
}

export function error(){
  return {
    type:'ERROR'
  }
}

export function success(payload){
  return {
    type:'SUCCESS',
    payload
  }
}