import { isEmpty } from 'lodash'
import { toast } from 'react-toastify'
import { commonAlertError, commonAlertSuccess, setLoading } from 'src/actions/common'
import * as actions from 'src/actions/actionTypes'
import { COMMON_MSG_MAP } from 'src/actions/common-message'
import { DEFAULT_LANG } from 'src/conf'

export const searchRole = () => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  const postData = getState().role.get('criteria')?.toJS()

  axios.post('/system/role/search', postData)
    .then(res => {
      dispatch({type: actions.SEARCH_ROLE_RESULT, payload: res.data})
    })
    .catch(err => dispatch(commonAlertError(err)))
    .finally(() => dispatch(setLoading(false)))
}

export const createRole = (values, callback) => (dispatch, getState, axios) => {
    dispatch(setLoading(true))
    const postData = { ...values, enabled: true }
    axios.post('/system/role/create', postData)
      .then(res => {
        dispatch(commonAlertSuccess('新增成功', callback))
      })
      .catch(err => dispatch(commonAlertError(err)))
      .finally(() => dispatch(setLoading(false)))
}

export const updateRole = (values) => (dispatch, getState, axios) => {
    dispatch(setLoading(true))
    const postData = { ...values }
    axios.post('/system/role/update', postData)
      .then(res => {
        dispatch(commonAlertSuccess('更新成功'))
      })
      .catch(err => dispatch(commonAlertError(err)))
      .finally(() => dispatch(setLoading(false)))
}

export const deleteRole = (ids, cb) => (dispatch, getState, axios) => {
    dispatch(setLoading(true))
    axios.post(`/system/role/delete`, { ids })
      .then(res => {
        dispatch(commonAlertSuccess('刪除成功', cb))
        dispatch(searchRole())

      })
      .catch(err => dispatch(commonAlertError(err)))
      .finally(() => dispatch(setLoading(false)))
}

export const getRole = (id, callback) => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  axios.get(`/system/role/${id}`)
    .then(res => {
      dispatch({type: actions.GET_ROLE, payload: res.data})
    })
    .catch(err => dispatch(commonAlertError(err, null, callback)))
    .finally(() => dispatch(setLoading(false)))
}

export const getAllFunctions = () => (dispatch, getState, axios) => {
    if(isDataNotExist('allFunctions', getState())) {
      axios.get(`/system/role/functions/all/${DEFAULT_LANG}`)
        .then(res => {
          dispatch({type: actions.GET_ALL_FUNCTIONS, payload: res.data})
        })
        .catch(err => dispatch(commonAlertError(err)))
    }
}

const isDataNotExist = (persist, state) => {
  const data = state.role.get(persist)?.toJS()
  return isEmpty(data)
}


