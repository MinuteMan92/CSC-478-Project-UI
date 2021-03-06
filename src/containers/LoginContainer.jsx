import Button from 'material-ui/Button'
import ForgotPasswordDialog from '../components/ForgotPasswordDialog'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import PropTypes from 'prop-types'
import React from 'react'
import TextField from 'material-ui/TextField'
import { connect } from 'react-redux'
import { actions as loginActions } from '../redux/actions/loginActions'

const LoginContainer = ({
  login,
  username,
  password,
  loginError,
  setUsername,
  setPassword,
  setForgotPassword,
}) => {
  const paperPadding = '30px'
  const style = {
    paper: {
      width: '350px',
      paddingTop: paperPadding,
      paddingBottom: paperPadding,
      paddingLeft: paperPadding,
      paddingRight: paperPadding,
    },
    title: {
      fontSize: 20,
    },
  }

  const loginHeader = () => (
    <div style={loginError ? { ...style.title, color: 'red' } : style.title}>
      Login {loginError ? ' - Invalid Credentials' : ''}
    </div>
  )

  const forgotPasswordAction = () => {
    setForgotPassword(true)
    setPassword('')
  }


  return (
    <div style={{ display: 'flex', justifyContent: 'center', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', position: 'absolute' }}>
      <Paper style={style.paper}>
        <form onSubmit={event => event.preventDefault()}>
          <ForgotPasswordDialog />

          <Grid container>
            <Grid item xs={12}>
              {loginHeader()}
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id='name'
                label='Username'
                onChange={event => setUsername(event.target.value)}
                value={username}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                autoComplete='current-password'
                fullWidth
                id='password-input'
                label='Password'
                onChange={event => setPassword(event.target.value)}
                type='password'
                value={password}
              />
            </Grid>

            <Grid item xs={8}>
              <Button
                color='secondary'
                onClick={forgotPasswordAction}
              >
            Forgot Password
              </Button>
            </Grid>

            <Grid item xs={4}>
              <div style={{ textAlign: 'right' }}>
                <Button
                  color='primary'
                  disabled={username === '' || password === ''}
                  onClick={login}
                  type='submit'
                  variant='raised'
                >
                  Login
                </Button>
              </div>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  )
}


LoginContainer.propTypes = {
  login: PropTypes.func.isRequired,
  loginError: PropTypes.bool.isRequired,
  password: PropTypes.string.isRequired,
  setForgotPassword: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  username: state.login.username,
  password: state.login.password,
  loginError: state.login.loginError,
})

const actions = {
  ...loginActions,
}

export default connect(mapStateToProps, actions)(LoginContainer)
