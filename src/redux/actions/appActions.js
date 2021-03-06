import createActions from './helpers/createActions'

export const {
  constants,
  actions,
} = createActions('app', {
  logout: 'LOGOUT',
  purge: 'PURGE',

  openReportsPage: 'OPEN_REPORTS_PAGE',
  openSettingsPage: 'OPEN_SETTINGS_PAGE',
  openEmployeePage: 'OPEN_EMPLOYEE_PAGE',
  openTransactionPage: 'OPEN_TRANSACTION_PAGE',
  openReturnPage: 'OPEN_RETURN_PAGE',
  setPage: 'SET_PAGE',

  incLoading: 'INC_LOADING',
  decLoading: 'DEC_LOADING',
  setToken: 'SET_TOKEN',
  setUsername: 'SET_USERNAME',
  setRole: 'SET_ROLE',
  setFirstName: 'SET_FIRST_NAME',
  setLastName: 'SET_LAST_NAME',
  setRequireSecurityQuestion: 'SET_REQUIRE_SECURITY_QUESTION',
})
