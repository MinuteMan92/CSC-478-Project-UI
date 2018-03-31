import {
  call,
  put as dispatch,
  select,
  takeLatest,
} from 'redux-saga/effects'
import { getPassword, getSecAnswer, getUsername } from '../selectors'
import { actions as appActions } from '../actions/appActions'
import { actions as customerLookupActions } from '../actions/customerLookupActions'
import { actions as errorMessageActions } from '../actions/errorMessageActions'
import { actions as loginActions } from '../actions/loginActions'
import { post } from './helpers/makeFetchCall'


export function* loginSaga() {
  const url = 'http://csc478team301.uisad.uis.edu:8080/login'

  const id = yield select(getUsername)
  const pin = yield select(getPassword)
  const answer = yield select(getSecAnswer)

  const body = {
    id,
    pin,
    answer,
  }

  const response = yield call(post, {
    url,
    body: JSON.stringify(body),
  })


  if (response.error && !response.statusText.includes('Unauthorized') && !response.statusText.includes('unknown')) {
    yield dispatch(errorMessageActions.displayError(response.statusText))

    return
  }

  if (response.payload.error) {
    if (answer !== '') {
      yield dispatch(loginActions.setAnswerError(true))
    } else {
      yield dispatch(loginActions.setLoginError(true))
    }
  } else {
    yield dispatch(loginActions.setLoginError(false))
    yield dispatch(appActions.setToken(response.payload.token))
    yield dispatch(appActions.setFirstName(response.payload.f_name))
    yield dispatch(appActions.setLastName(response.payload.l_name))
    yield dispatch(appActions.setRole(response.payload.role))

    yield dispatch(customerLookupActions.getAllCustomers())
  }
}

export default function* () {
  yield takeLatest(
    [
      loginActions.login().type,
    ],
    loginSaga
  )
}
