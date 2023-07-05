import * as actions from 'src/actions/actionTypes'
import { commonAlertError, commonAlertSuccess, setLoading } from 'src/actions/common'
import { COMMON_MSG_MAP } from 'src/actions/common-message'
import { map } from 'lodash'

export const searchEnquiryList = () => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  const criteria = getState().enquiryMgmt.get('criteria')?.toJS()
  const postData = {
    ...transformPostData(criteria),
    page: criteria.page + 1
  }
  axios.post('/enquiry/search', postData)
    .then(res => {
      dispatch({ type: actions.SEARCH_ENQUIRY_LIST, payload: res.data })
    })
    .catch(err => dispatch(commonAlertError(err)))
    .finally(() => dispatch(setLoading(false)))
}

export const setEnquiryListCriteria = (key, value) => (dispatch, getState, axios) => {
  dispatch({ type: actions.SET_ENQUIRY_LIST_CRITERIA, payload: { key, value } })
}

export const resetEnquiryListCriteria = (key, value) => (dispatch, getState, axios) => {
  dispatch({ type: actions.RESET_ENQUIRY_LIST_CRITERIA })
}

export const createEnquiry = (values, cb) => (dispatch, getState, axios) => {
    dispatch(setLoading(true))
    const postData = transformPostData(values)
    axios.post('/enquiry/create', postData)
      .then(res => {
        dispatch(commonAlertSuccess(COMMON_MSG_MAP['createSuccess'], cb))
      })
      .catch(err => dispatch(commonAlertError(err)))
      .finally(() => dispatch(setLoading(false)))
}

export const updateEnquiry = (values, cb) => (dispatch, getState, axios) => {
    dispatch(setLoading(true))
    const postData = transformPostData(values)

    axios.post('/enquiry/update', postData)
      .then(res => {
        dispatch(commonAlertSuccess(COMMON_MSG_MAP['updateSuccess'], cb))
      })
      .catch(err => dispatch(commonAlertError(err)))
      .finally(() => dispatch(setLoading(false)))
}

const transformPostData = (values) => {
  return {
    ...values,
    typeIds: map(values.typeIds, (v) => v.id).filter((v) => v !== 'all'),
    yearIds: map(values.yearIds, (v) => v.id).filter((v) => v !== 'all'),
    dwtIds: map(values.dwtIds, (v) => v.id).filter((v) => v !== 'all'),
    teuIds: map(values.teuIds, (v) => v.id).filter((v) => v !== 'all'),
    cbmIds: map(values.cbmIds, (v) => v.id).filter((v) => v !== 'all'),
    builtCountryIds: map(values.builtCountryIds, (v) => v.id).filter((v) => v !== 'all')
  }
}

export const deleteEnquiry = (values, cb) => (dispatch, getState, axios) => {
    dispatch(setLoading(true))
    const postData = { ...values }
    axios.post('/enquiry/delete', postData)
      .then(res => {
        dispatch(commonAlertSuccess(COMMON_MSG_MAP['deleteSuccess'], cb))
      })
      .catch(err => dispatch(commonAlertError(err)))
      .finally(() => dispatch(setLoading(false)))
}

export const getEnquiryInfo = (enquiryId, cb) => (dispatch, getState, axios) => {
    dispatch(setLoading(true))
    axios.get(`/enquiry/info/${enquiryId}`)
      .then(res => {
        dispatch({ type: actions.GET_ENQUIRY_INFO, payload: res.data } )
      })
      .catch(err => dispatch(commonAlertError(err)))
      .finally(() => dispatch(setLoading(false)))
}

export const removeEnquiryData = () => (dispatch, getState, axios) => {
  dispatch({type: actions.GET_ENQUIRY_INFO, payload: undefined})
}
