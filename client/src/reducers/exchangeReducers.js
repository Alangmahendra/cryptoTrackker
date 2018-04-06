const initialState = {
  isLoading: false,
  isError: false,
  exchangeSuccess: null
}

export default function exchange(state = initialState, action) {
  switch (action.type) {
    case 'LOADING':
      return ({
        ...state,
        isLoading: true
      })
    case 'ERROR':
      return ({
        ...state,
        isLoading: false,
        isError: true
      })
    case 'SUCCESS':
      return ({
        ...state,
        isLoading: false,
        isError: false,
        exchangeSuccess: action.payload
      })
    default:
     return state
  }
}

