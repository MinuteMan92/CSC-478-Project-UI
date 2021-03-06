import EmployeesContainer from './EmployeesContainer'
import ErrorMessageDialog from '../components/ErrorMessageDialog'
import Grid from 'material-ui/Grid'
import LoadingDialog from '../components/LoadingDialog'
import LoginContainer from './LoginContainer'
import NavBar from '../components/NavBar'
import PropTypes from 'prop-types'
import React from 'react'
import ReportsContainer from './ReportsContainer'
import ReturnContainer from './ReturnContainer'
import TransactionContainer from './TransactionContainer'
import UserSettingsContainer from './UserSettingsContainer'
import { connect } from 'react-redux'
import { actions as customerLookupActions } from '../redux/actions/customerLookupActions'


const AppContainer = ({
  page,
  token,
}) => {
  const router = () => {
    if (token === '') {
      return (
        <div>
          <LoginContainer />
        </div>
      )
    }

    switch (page) {
      case 'employees': return (<EmployeesContainer />)
      case 'reports': return (<ReportsContainer />)
      case 'settings': return (<UserSettingsContainer />)
      case 'transaction': return (<TransactionContainer />)
      case 'return': return (<ReturnContainer />)
      default: return null
    }
  }

  return (
    <div>
      <LoadingDialog />
      <ErrorMessageDialog />

      <Grid container>
        <Grid item xs={12}>
          <NavBar />
        </Grid>

        <Grid item xs={12}>
          {router()}
        </Grid>
      </Grid>
    </div>
  )
}

AppContainer.propTypes = {
  page: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  token: state.app.token,
  page: state.app.page,
})

const actions = {
  ...customerLookupActions,
}

export default connect(mapStateToProps, actions)(AppContainer)
