import * as actions from 'src/actions/actionTypes'
import { commonAlertError, commonAlertSuccess, setLoading } from 'src/actions/common'
import { COMMON_MSG_MAP } from 'src/actions/common-message'


export const searchEnquiry = () => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  const criteria = getState().settingMgmt.get('eqyCriteria')?.toJS()
  const postData = {
    ...criteria,
    page: criteria.page + 1
  }
  axios.post('/enquiry/param/search', postData)
    .then(res => {
      dispatch({ type: actions.SEARCH_ENQUIRY, payload: res.data })
    })
    .catch(err => dispatch(commonAlertError(err)))
    .finally(() => dispatch(setLoading(false)))
}

export const setEnquiryCriteria = (key, value) => (dispatch, getState, axios) => {
  dispatch({ type: actions.SET_ENQUIRY_CRITERIA, payload: { key, value } })
}

export const resetEnquiryCriteria = (key, value) => (dispatch, getState, axios) => {
  dispatch({ type: actions.RESET_ENQUIRY_CRITERIA })
}


export const createEnquiry = (values, cb) => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  const postData = { ...values }
  axios.post('/enquiry/param/create', postData)
    .then(res => {
      dispatch(commonAlertSuccess(COMMON_MSG_MAP['createSuccess'], cb))
    })
    .catch(err => dispatch(commonAlertError(err)))
    .finally(() => dispatch(setLoading(false)))
}

export const updateEnquiry = (values, cb) => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  const postData = { ...values }
  axios.post('/enquiry/param/update', postData)
    .then(res => {
      dispatch(commonAlertSuccess(COMMON_MSG_MAP['updateSuccess'], cb))
    })
    .catch(err => dispatch(commonAlertError(err)))
    .finally(() => dispatch(setLoading(false)))
}

export const deleteEnquiry = (values, cb) => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  const postData = { ...values }
  axios.post('/enquiry/param/delete', postData)
    .then(res => {
      dispatch(commonAlertSuccess(COMMON_MSG_MAP['deleteSuccess'], cb))
      dispatch(searchEnquiry())
    })
    .catch(err => dispatch(commonAlertError(err)))
    .finally(() => dispatch(setLoading(false)))
}

export const getEnquiryInfo = (id) => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  axios.get(`/enquiry/param/info/${id}`)
    .then(res => {
      dispatch({ type: actions.GET_ENQUIRY_PARAM_INFO, payload: res.data })
    })
    .catch(err => dispatch(commonAlertError(err)))
    .finally(() => dispatch(setLoading(false)))
}

export const removeInquiryData = () => (dispatch, getState, axios) => {
  dispatch({ type: actions.GET_ENQUIRY_INFO, payload: undefined })
}

export const searchMailGroup = () => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  const criteria = getState().settingMgmt.get('grpCriteria')?.toJS()
  const postData = {
    ...criteria,
    page: criteria.page + 1
  }

  axios.post('/mg/search', postData)
    .then(res => {
      dispatch({ type: actions.SEARCH_MAIL_GROUP, payload: res.data })
    })
    .catch(err => dispatch(commonAlertError(err)))
    .finally(() => dispatch(setLoading(false)))
}

export const setGrpCriteria = (key, value) => (dispatch, getState, axios) => {
  dispatch({ type: actions.SET_MAIL_GROUP_CRITERIA, payload: { key, value } })
}

export const resetGrpCriteria = (key, value) => (dispatch, getState, axios) => {
  dispatch({ type: actions.RESET_MAIL_GROUP_CRITERIA })
}

export const getMailGroupInfo = (id) => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  axios.get(`/mg/info/${id}`)
    .then(res => {
      dispatch({ type: actions.GET_MAIL_GROUP_INFO, payload: res.data})
    })
    .catch(err => dispatch(commonAlertError(err)))
    .finally(() => dispatch(setLoading(false)))
}

export const createMailGroup = (values, cb) => (dispatch, getState, axios) => {
    dispatch(setLoading(true))
    const postData = { ...values }
    axios.post('/mg/create', postData)
      .then(res => {
        dispatch(commonAlertSuccess(COMMON_MSG_MAP['createSuccess'], cb))
      })
      .catch(err => dispatch(commonAlertError(err)))
      .finally(() => dispatch(setLoading(false)))
}

export const updateMailGroup = (values, cb) => (dispatch, getState, axios) => {
    dispatch(setLoading(true))
    const postData = { ...values }
    axios.post('/mg/update', postData)
      .then(res => {
        dispatch(commonAlertSuccess(COMMON_MSG_MAP['updateSuccess'], cb))
      })
      .catch(err => dispatch(commonAlertError(err)))
      .finally(() => dispatch(setLoading(false)))
}

export const deleteMailGroup = (values, cb) => (dispatch, getState, axios) => {
    dispatch(setLoading(true))
    const postData = { ...values }
    axios.post('/mg/delete', postData)
      .then(res => {
        dispatch(commonAlertSuccess(COMMON_MSG_MAP['deleteSuccess'], cb))
        dispatch(searchMailGroup())
      })
      .catch(err => dispatch(commonAlertError(err)))
      .finally(() => dispatch(setLoading(false)))
}

//取得個人信件群組
export const getMineMailGroup = () => (dispatch, getState, axios) => {
    axios.get('/mg/mine')
      .then(res => {
        dispatch({ type: actions.GET_MINE_MAIL_GROUP, payload: res.data})
      })
      .catch(err => dispatch(commonAlertError(err)))
}

export const removeMailGroupData = () => (dispatch, getState, axios) => {
  dispatch({ type: actions.GET_MAIL_GROUP_INFO, payload: undefined })
}
