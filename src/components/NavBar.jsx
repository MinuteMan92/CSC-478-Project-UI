import Menu, { MenuItem } from 'material-ui/Menu'
import AppBar from 'material-ui/AppBar'
import Button from 'material-ui/Button'
import PropTypes from 'prop-types'
import React from 'react'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import { actions as appActions } from '../redux/actions/appActions'
import { connect } from 'react-redux'
import { actions as loginActions } from '../redux/actions/loginActions'
import { actions as navBarActions } from '../redux/actions/navBarActions'


const NavBar = ({
  openReportsPage,
  openEmployeePage,
  openSettingsPage,
  openTransactionPage,
  openReturnPage,
  enabled,
  userRole,
  firstName,
  lastName,
  accountMenuOpen,
  setMenuOpen,
  logout,
}) => {
  const navigate = pageFunc => {
    pageFunc()
    setMenuOpen(false)
  }

  const logoutAction = () => {
    logout()
    setMenuOpen(false)
  }

  const accountMenu = () => (
    <Menu
      anchorEl={document.getElementById('accountButton')}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id='menu-appbar'
      onClose={() => setMenuOpen(false)}
      open={accountMenuOpen}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <MenuItem
        onClick={() => navigate(openSettingsPage)}
      >
        Settings
      </MenuItem>
      <MenuItem
        onClick={logoutAction}
      >
        Logout
      </MenuItem>
    </Menu>
  )

  const accountTypeColor = () => {
    switch (userRole) {
      case 'admin': return '#EBE337'
      case 'manager': return '#ED4444'
      case 'employee': return '#00AAFF'
      default: return ''
    }
  }


  const adminButtons = () =>
    userRole === 'admin' || userRole === 'manager' ?
      (
        <div>
          <Button color='inherit' disabled={!enabled} onClick={() => navigate(openEmployeePage)}>Employees</Button>
          <Button color='inherit' disabled={!enabled} onClick={() => navigate(openReportsPage)}>Reports</Button>
        </div>
      ) : null


  const employeeButtons = () =>
    userRole === 'admin' || userRole === 'manager' || userRole === 'employee' ?
      (
        <div>
          <Button color='inherit' disabled={!enabled} onClick={() => navigate(openTransactionPage)}>Transaction</Button>
          <Button color='inherit' disabled={!enabled} onClick={() => navigate(openReturnPage)}>Returns</Button>
          <Button
            color='inherit'
            disabled={!enabled}
            id='accountButton'
            onClick={() => setMenuOpen(!accountMenuOpen)}
          >
            Account
          </Button>
        </div>
      ) : null


  const userNameAndRole = () => {
    const name = `${firstName} ${lastName}`
    const role = userRole === '' ? '' :
      ` - ${userRole.charAt(0).toUpperCase()}${userRole.slice(1)}`

    return `${name}${role}`
  }


  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <Typography color='inherit' style={{ flex: '1' }} variant='title'>
            LackLuster Video
          </Typography>

          <Typography color='inherit' style={{ flex: '1' }} variant='title'>
            {userNameAndRole()}
          </Typography>

          {adminButtons()}
          {employeeButtons()}
          {accountMenu()}

        </Toolbar>
      </AppBar>
      <div style={{ width: '100%', height: '10px', backgroundColor: accountTypeColor() }} />
    </div>
  )
}


NavBar.propTypes = {
  accountMenuOpen: PropTypes.bool.isRequired,
  enabled: PropTypes.bool.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  openEmployeePage: PropTypes.func.isRequired,
  openReportsPage: PropTypes.func.isRequired,
  openReturnPage: PropTypes.func.isRequired,
  openSettingsPage: PropTypes.func.isRequired,
  openTransactionPage: PropTypes.func.isRequired,
  setMenuOpen: PropTypes.func.isRequired,
  userRole: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  accountMenuOpen: state.navBar.menuOpen,
  userRole: state.app.role,
  enabled: state.navBar.enabled,
  firstName: state.app.firstName,
  lastName: state.app.lastName,
})

const actions = {
  ...appActions,
  ...navBarActions,
  ...loginActions,
}

export default connect(mapStateToProps, actions)(NavBar)
