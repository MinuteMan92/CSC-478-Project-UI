import { constants as appConstants } from '../actions/appActions'
import { combineReducers } from 'redux'
import { constants as returnActions } from '../actions/returnActions'


const openTransactions = (state = [], action = {}) => {
  switch (action.type) {
    case returnActions.SET_OPEN_TRANSACTIONS: return action.payload
    case appConstants.PURGE: return []
    default: return state
  }
}

const reducer = combineReducers({
  openTransactions,
})

export default reducer