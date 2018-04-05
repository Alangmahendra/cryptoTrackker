let initialState = {
  isLoading : false,
  isError : false,
  getDataSuccess : {}
}

function getAndSave (state=initialState,action){
  switch (action.type) {
    case 'LOADING':
      return ({
        ...state,
        isLoading:true
      })
    case 'ERROR':
      return ({
        ...state,
        isLoading:false,
        isError:true
      })
    case 'SUCCESS':
      return ({
        ...state,
        isLoading:false,
        isError:false,
        getDataSuccess:action.payload
      })
    default:
     return state
  }
}
export default getAndSave