import { CUSTOMER_MSG_MAP } from 'components/customer/messages'
import { commonAlertError, commonAlertSuccess, setLoading } from 'src/actions/common'
import * as actions from 'src/actions/actionTypes'

export const createCustomer = (values, callback) => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  const postData = { ...values }
  axios.post('/customer/create', postData)
    .then(res => {
      dispatch(commonAlertSuccess(CUSTOMER_MSG_MAP['createSuccess'], callback))
    })
    .catch(err => dispatch(commonAlertError(err)))
    .finally(() => dispatch(setLoading(false)))
}

export const updateCustomer = (values) => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  const postData = { ...values }
  axios.post('/customer/update', postData)
    .then(res => {
      dispatch(commonAlertSuccess(CUSTOMER_MSG_MAP['updateSuccess']))
    })
    .catch(err => dispatch(commonAlertError(err)))
    .finally(() => dispatch(setLoading(false)))
}

export const deleteCustomer = (values, cb) => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  const postData = { ...values }
  axios.post('/customer/delete', postData)
    .then(res => {
      dispatch(commonAlertSuccess(CUSTOMER_MSG_MAP['deleteSuccess'], cb))
      dispatch(searchCustomer())
    })
    .catch(err => dispatch(commonAlertError(err)))
    .finally(() => dispatch(setLoading(false)))
}

export const getCustomer = (id, callback) => (dispatch, getState, axios) => {
    dispatch(setLoading(true))
    axios.get(`/customer/info/${id}`)
      .then(res => {
        dispatch({ type: actions.GET_CUSTOMER, payload: res.data})
      })
      .catch(err => dispatch(commonAlertError(err)))
      .finally(() => dispatch(setLoading(false)))
}

export const searchCustomer = () => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  const criteria = getState().customer.get('criteria')?.toJS()
  const postData = {
    ...criteria,
    page: criteria.page +1
  }

  axios.post('/customer/search', postData)
    .then(res => {
      dispatch({ type: actions.SEARCH_CUSTOMER, payload: res.data})
    })
    .catch(err => dispatch(commonAlertError(err)))
    .finally(() => dispatch(setLoading(false)))
}

export const setCustomerCriteria = (key, value) => (dispatch, getState, axios) => {
    dispatch({ type: actions.SET_CUSTOMER_CRITERIA, payload: { key, value }})
}

export const resetCustomerCriteria = (key, value) => (dispatch, getState, axios) => {
  dispatch({ type: actions.RESET_CUSTOMER_CRITERIA, payload: {}})
}

export const removeCustomerData = () => (dispatch, getState, axios) => {
  dispatch({ type: actions.GET_CUSTOMER, payload: undefined})
}



