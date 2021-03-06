import createActions from './helpers/createActions'

export const {
  constants,
  actions,
} = createActions('settings', {
  setRecoveryMode: 'SET_RECOVERY_MODE',
  setOldPassword: 'SET_OLD_PASSWORD',
  setNewPassword: 'SET_NEW_PASSWORD',
  setPasswordChangeSuccess: 'SET_PASSWORD_CHANGE_SUCCESS',

  setSecurityQuestion: 'SET_SECURITY_QUESTION',
  setSecurityAnswer: 'SET_SECURITY_ANSWER',
  setSecurityQuestionChangeSuccess: 'SET_SECURITY_QUESTION_CHANGE_SUCCESS',

  changePassword: 'CHANGE_PASSWORD',
  changeSecurityQuestion: 'CHANGE_SECURITY_QUESTION',
})
