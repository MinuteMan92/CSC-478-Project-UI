import Button from 'material-ui/Button'
//import Checkbox from 'material-ui/Checkbox'
//import { FormControlLabel } from 'material-ui/Form'
import EditEmployeeDialog from '../components/EditEmployeeDialog'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import PropTypes from 'prop-types'
import React from 'react'
//import TextField from 'material-ui/TextField'
import { connect } from 'react-redux'
import { actions as editEmployeeActions } from '../redux/actions/editEmployeeActions'


const testEmployees = [
  {
    id: 'mawein',
    f_name: 'Mike',
    l_name: 'Weinberg',
    role: 'admin',
    active: true,
    phone: '8675309',
    address: '',
    timestamp: '2018-04-02T18:30:45.669-05:00',
  },
  {
    id: 'superuser',
    f_name: 'Michael',
    l_name: 'Weinberg',
    role: 'admin',
    active: true,
    phone: null,
    address: null,
    timestamp: '2018-03-25T23:49:17.912-05:00',
  },
  {
    id: 'someGuy',
    f_name: 'Jack',
    l_name: 'Bower',
    role: 'employee',
    active: true,
    phone: '8675309',
    address: '',
    timestamp: '',
  },
  {
    id: 'jas',
    f_name: 'L. Ron',
    l_name: 'Hubbard',
    role: 'admin',
    active: true,
    phone: '8675309',
    address: '',
    timestamp: '',
  },
  {
    id: 'bgrimshaw',
    f_name: 'L. Ron',
    l_name: 'Hubbard',
    role: 'admin',
    active: true,
    phone: '8675309',
    address: '',
    timestamp: '',
  },
  {
    id: 'rayk',
    f_name: 'L. Ron',
    l_name: 'Hubbard',
    role: 'admin',
    active: true,
    phone: '8675309',
    address: '',
    timestamp: '',
  },
  {
    id: 'rayk',
    f_name: 'L. Ron',
    l_name: 'Hubbard',
    role: 'admin',
    active: true,
    phone: '8675309',
    address: '',
    timestamp: '',
  },
  {
    id: 'rayk',
    f_name: 'L. Ron',
    l_name: 'Hubbard',
    role: 'admin',
    active: true,
    phone: '8675309',
    address: '',
    timestamp: '',
  },
  {
    id: 'rayk',
    f_name: 'L. Ron',
    l_name: 'Hubbard',
    role: 'admin',
    active: true,
    phone: '8675309',
    address: '',
    timestamp: '',
  },
  {
    id: 'rayk',
    f_name: 'L. Ron',
    l_name: 'Hubbard',
    role: 'admin',
    active: true,
    phone: '8675309',
    address: '',
    timestamp: '',
  },
  {
    id: 'rayk',
    f_name: 'L. Ron',
    l_name: 'Hubbard',
    role: 'admin',
    active: true,
    phone: '8675309',
    address: '',
    timestamp: '',
  },
  {
    id: 'rayk',
    f_name: 'L. Ron',
    l_name: 'Hubbard',
    role: 'admin',
    active: true,
    phone: '8675309',
    address: '',
    timestamp: '',
  },
  {
    id: 'rayk',
    f_name: 'L. Ron',
    l_name: 'Hubbard',
    role: 'admin',
    active: true,
    phone: '8675309',
    address: '',
    timestamp: '',
  },
  {
    id: 'rayk',
    f_name: 'L. Ron',
    l_name: 'Hubbard',
    role: 'admin',
    active: true,
    phone: '8675309',
    address: '',
    timestamp: '',
  },
  {
    id: 'rayk',
    f_name: 'L. Ron',
    l_name: 'Hubbard',
    role: 'admin',
    active: true,
    phone: '8675309',
    address: '',
    timestamp: '',
  },
  {
    id: 'rayk',
    f_name: 'L. Ron',
    l_name: 'Hubbard',
    role: 'admin',
    active: true,
    phone: '8675309',
    address: '',
    timestamp: '',
  },
  {
    id: 'rayk',
    f_name: 'L. Ron',
    l_name: 'Hubbard',
    role: 'admin',
    active: true,
    phone: '8675309',
    address: '',
    timestamp: '',
  },
  {
    id: 'rayk',
    f_name: 'L. Ron',
    l_name: 'Hubbard',
    role: 'admin',
    active: true,
    phone: '8675309',
    address: '',
    timestamp: '',
  },
  {
    id: 'rayk',
    f_name: 'L. Ron',
    l_name: 'Hubbard',
    role: 'admin',
    active: true,
    phone: '8675309',
    address: '',
    timestamp: '',
  },
  {
    id: 'rayk',
    f_name: 'L. Ron',
    l_name: 'Hubbard',
    role: 'admin',
    active: true,
    phone: '8675309',
    address: '',
    timestamp: '',
  },
]


const EmployeesContainer = ({
  thisAccountId,
  openEmployeeEditor,
}) => {
  const employeeGrid = () =>
    testEmployees.filter(employee => employee.id !== thisAccountId)
      .sort((a, b) => {
        if (a.l_name === b.l_name) {
          return 0
        }

        return a.l_name > b.l_name ? 1 : -1
      })
      .map(employee => (
        <Grid item key={employee.id} xs={3}>
          <Paper style={{ padding: '20px' }}>
            <Grid container>
              <Grid item xs={7}>

                <div style={{ fontSize: '20px' }}>
                  {employee.l_name}, {employee.f_name}
                </div>

              </Grid>

              <Grid item xs={5}>
                <div style={{ textAlign: 'right' }}>
                  {
                    employee.id === 'superuser' ? 'Superuser' :
                    `${employee.role.charAt(0).toUpperCase()}${employee.role.slice(1)}`
                  }
                </div>
              </Grid>
            </Grid>


            <div>{employee.active ? 'Active' : 'Inactive'}</div>
            <div>Phone: {employee.phone}</div>


            <div style={{ textAlign: 'right' }}>
              <Button
                color='primary'
                onClick={() => openEmployeeEditor(employee.id)}
                variant='raised'
              >
                Edit
              </Button>

            </div>
          </Paper>
        </Grid>
      ))


  return (
    <div style={{ flex: '1', justifyContent: 'center', padding: '30px' }}>

      <EditEmployeeDialog />

      <Grid container>
        <Grid item xs={7}>
          <div style={{ fontSize: '25px' }}>
            Employees
          </div>
        </Grid>

        {/* <Grid item xs={3}>
          <Grid container>
            <Grid item xs={7}>
              <TextField label='Search' />
            </Grid>
            <Grid item xs={5}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked
                  />
                }
                label='Active Only'
              />
            </Grid>
          </Grid>
        </Grid> */}

        <Grid item xs={5}>
          <div style={{ textAlign: 'right' }}>
            <Button
              color='primary'
              onClick={() => openEmployeeEditor('')}
              variant='raised'
            >
              Add New Employee
            </Button>
          </div>
        </Grid>

        {employeeGrid()}
      </Grid>

    </div>
  )
}


EmployeesContainer.propTypes = {
  openEmployeeEditor: PropTypes.func.isRequired,
  thisAccountId: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  thisAccountId: 'mawein',
})

const actions = {
  ...editEmployeeActions,
}

export default connect(mapStateToProps, actions)(EmployeesContainer)
