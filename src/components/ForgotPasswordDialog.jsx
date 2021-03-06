import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import PropTypes from 'prop-types'
import React from 'react'
import TextField from 'material-ui/TextField'
import { connect } from 'react-redux'
import { actions as loginActions } from '../redux/actions/loginActions'


const ForgotPasswordDialog = ({
  login,
  answerError,
  open,
  username,
  step,
  securityQuestion,
  securityAnswer,
  usernameError,
  setForgotPassword,
  setUsername,
  setSecurityAnswer,
  getSecurityQuestion,
  resetFP,
}) => {
  const getUsernameContent = () => (
    <div>
      <TextField
        autoFocus
        error={usernameError !== ''}
        fullWidth
        label={usernameError === '' ? 'Username' : usernameError}
        margin='dense'
        onChange={event => setUsername(event.target.value)}
        value={username}
      />
    </div>
  )

  const securityQuestionContent = () => (
    <div>
      <DialogContent>
        {securityQuestion}
      </DialogContent>
      <TextField
        autoFocus
        error={answerError}
        fullWidth
        label={answerError ? 'Incorrect Answer' : 'Answer'}
        margin='dense'
        onChange={event => setSecurityAnswer(event.target.value)}
        value={securityAnswer}
      />
    </div>
  )


  const contentByStep = () => {
    switch (step) {
      case 0: return {
        content: getUsernameContent(),
        button: 'Next',
      }
      case 1: return {
        content: securityQuestionContent(),
        button: 'Login',
      }
      default: return {
        content: '',
        button: '',
      }
    }
  }
  const content = contentByStep()


  const primaryButtonEnabled = () => {
    switch (step) {
      case 0: return username !== ''
      case 1: return securityAnswer !== ''
      default: return true
    }
  }
  const primaryButtonClicked = () => {
    if (step === 0) {
      getSecurityQuestion()
    } else if (step === 1) {
      login()
    }
  }
  const cancelButtonClicked = () => {
    setForgotPassword(false)
    setTimeout(resetFP, 500)
  }

  return (
    <Dialog
      aria-labelledby='form-dialog-title'
      open={open}
    >
      <DialogTitle id='form-dialog-title'>Forgot Password</DialogTitle>
      <DialogContent>
        <div style={{ fontSize: '20px', width: '300px' }}>
          {content.content}
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          color='secondary'
          onClick={cancelButtonClicked}
        >
          Cancel
        </Button>
        <Button
          color='primary'
          disabled={!primaryButtonEnabled()}
          onClick={primaryButtonClicked}
          variant='raised'
        >
          {content.button}
        </Button>
      </DialogActions>
    </Dialog>
  )
}


ForgotPasswordDialog.propTypes = {
  answerError: PropTypes.bool.isRequired,
  getSecurityQuestion: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  resetFP: PropTypes.func.isRequired,
  securityAnswer: PropTypes.string.isRequired,
  securityQuestion: PropTypes.string.isRequired,
  setForgotPassword: PropTypes.func.isRequired,
  setSecurityAnswer: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  usernameError: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  open: state.login.forgotPassword,
  username: state.login.username,
  step: state.login.forgotPasswordStep,
  securityQuestion: state.login.securityQuestion,
  securityAnswer: state.login.securityAnswer,
  usernameError: state.login.usernameError,
  answerError: state.login.answerError,
})

const actions = {
  ...loginActions,
}

export default connect(mapStateToProps, actions)(ForgotPasswordDialog)
