import axios from 'axios'

export function getAndSaveAction (){
  return dispatch => {
    dispatch(Loading())
    axios.get('http://localhost:4000/crypto')
    .then(({data})=>{
      dispatch(Success(data.data))
    })
    .catch(err => dispatch(Error()))
  }
}

function Loading(){
  return {
    type:'LOADING'
  }
}

function Error(){
  return {
    type : 'ERROR'
  }
}

function Success(payload){
  return {
    type:'SUCCESS',
    payload
  }
}