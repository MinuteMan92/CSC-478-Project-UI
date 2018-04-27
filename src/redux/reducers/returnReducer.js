import { constants as appConstants } from '../actions/appActions'
import { combineReducers } from 'redux'
import { constants as returnActions } from '../actions/returnActions'


const setSelection = (state, copyID, newValue) => state.map(transaction => transaction.copyID === copyID ? {
  ...transaction,
  selected: newValue,
} : transaction)


const openTransactions = (state = [], action = {}) => {
  switch (action.type) {
    case returnActions.SET_OPEN_TRANSACTIONS: return action.payload
    case returnActions.SELECT_COPY_ID: return setSelection(state, action.payload, true)
    case returnActions.DESELECT_COPY_ID: return setSelection(state, action.payload, false)
    case appConstants.PURGE: return []
    default: return state
  }
}

const overdueOnly = (state = false, action = {}) => {
  switch (action.type) {
    case returnActions.SET_OVERDUE_ONLY: return action.payload
    case appConstants.PURGE: return []
    default: return state
  }
}


const reducer = combineReducers({
  openTransactions,
  overdueOnly,
})

export default reducer
