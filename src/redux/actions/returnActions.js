import createActions from './helpers/createActions'

export const {
  constants,
  actions,
} = createActions('return', {
  setOpenTransactions: 'SET_OPEN_TRANSACTIONS',
})