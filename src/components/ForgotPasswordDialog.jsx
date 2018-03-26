import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import Checkbox from 'material-ui/Checkbox'
import { FormControlLabel } from 'material-ui/Form'
import Paper from 'material-ui/Paper'
import PropTypes from 'prop-types'
import React from 'react'
import TextField from 'material-ui/TextField'
import { connect } from 'react-redux'
import { actions as loginActions } from '../redux/actions/loginActions'


const ForgotPasswordDialog = ({
  open,
  username,
  step,
  setForgotPassword,
  setUsername,
  nextFPStep,
  resetFP,
}) => {
  const getUsernameContent = () => {
    return (
      <div>
        <TextField
          autoFocus
          fullWidth
          label='Username'
          margin='dense'
          onChange={event => setUsername(event.target.value)}
          value={username}
        />
      </div>
    )
  }


  const contentByStep = () => {
    switch (step) {
      case 0: return {
        content: getUsernameContent(),
        button: 'Next',
      }
      default: return {
        content: '',
        button: '',
      }
    }
  }
  const content = contentByStep()


  const primaryButtonClicked = () => {
    nextFPStep()
  }

  const cancelButtonClicked = () => {
    setForgotPassword(false)
    setTimeout(resetFP, 1000)
  }


  return (
    <Dialog
      aria-labelledby='form-dialog-title'
      open={open}
    >
      <DialogTitle id='form-dialog-title'>Reset Password</DialogTitle>
      <DialogContent>
        {content.content}
      </DialogContent>
      <DialogActions>
        <Button
          color='primary'
          onClick={cancelButtonClicked}
        >
          Cancel
        </Button>
        <Button
          color='primary'
          onClick={primaryButtonClicked}
        >
          {content.button}
        </Button>
      </DialogActions>
    </Dialog>
  )
}


ForgotPasswordDialog.propTypes = {
  nextFPStep: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  resetFP: PropTypes.func.isRequired,
  setForgotPassword: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  open: state.login.forgotPassword,
  username: state.login.username,
  step: state.login.forgotPasswordStep,
})

const actions = {
  ...loginActions,
}

export default connect(mapStateToProps, actions)(ForgotPasswordDialog)
