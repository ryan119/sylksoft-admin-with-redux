import { isEmpty, map } from 'lodash'
import { commonAlertError, commonAlertSuccess, setLoading } from 'src/actions/common'
import { COMMON_MSG_MAP } from 'src/actions/common-message'
import { DEFAULT_LANG } from 'src/conf'
import * as actions from './actionTypes'


export const setAuthData = user => (dispatch, getState, axios) => {
  dispatch({ type: actions.SET_AUTH_DATA, payload: user })
}

export const getMenu = (roleIds) => (dispatch, getState, axios) => {
  if (isDataNotExist('menu', getState())) {
    //console.log('getMenu')
    const postData = {
      langCode: 'zh_TW',
      roleIds: roleIds
    }

    axios.post('/menu/list', postData)
      .then(res => {
        dispatch({ type: actions.GET_MENU, payload: res.data })
      })
      .catch((err) => {
        dispatch(commonAlertError(err))
      })
  }
}

export const forgotPassword = (values, callback) => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  const postData = { ...values, langCode: DEFAULT_LANG}
  axios.post('/password/forget', postData)
    .then(res => {
      dispatch(commonAlertSuccess('感謝您提供的訊息，重設密碼連結將寄至您的Email信箱', callback))
    })
    .catch(err => dispatch(commonAlertError(err)))
    .finally(() => dispatch(setLoading(false)))
}

export const resetPassword = (values, callback) => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  const postData = { ...values, langCode: DEFAULT_LANG }
  axios.post('/password/reset', postData)
    .then(res => {
      dispatch(commonAlertSuccess('重設密碼完成，請重新登入', callback))
    })
    .catch(err => dispatch(commonAlertError(err)))
    .finally(() => dispatch(setLoading(false)))
}

export const searchUser = () => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  const criteria = getState().member.get('criteria')?.toJS()
  const postData = {
    ...criteria,
    page: criteria.page +1
  }
  axios.post('/user/search', postData)
    .then(res => {
      dispatch({ type: actions.SEARCH_USER, payload: res.data})
    })
    .catch(err => dispatch(commonAlertError(err, null)))
    .finally(() => dispatch(setLoading(false)))
}
export const setUserCriteria = (key, value) => (dispatch, getState, axios) => {
 dispatch({type: actions.SET_USER_CRITERIA, payload: {key, value}}) 
}
export const resetUserCriteria = (key, value) => (dispatch, getState, axios) => {
  dispatch({type: actions.RESET_USER_CRITERIA})
}
export const getUserInfo = (id) => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  axios.get(`/user/${id}`)
    .then(res => {
      dispatch({ type: actions.GET_USER_INFO, payload: res.data})
    })
    .catch(err => dispatch(commonAlertError(err, null)))
    .finally(() => dispatch(setLoading(false)))
}

export const createUser = (values, cb) => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  const postData = {
    ...values,
    roleIds: map(values.roleIds, r => r.id)
  }

  axios.post('/user/create', postData)
    .then(res => {
      dispatch(commonAlertSuccess(COMMON_MSG_MAP['createSuccess'], cb))
    })
    .catch(err => dispatch(commonAlertError(err, null)))
    .finally(() => dispatch(setLoading(false)))
}

export const updateUser = (values) => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  const postData = {
    ...values,
    roleIds: map(values.roleIds, r => r.id)
  }
  axios.post('/user/update', postData)
    .then(res => {
      dispatch(commonAlertSuccess(COMMON_MSG_MAP['updateSuccess']))
    })
    .catch(err => dispatch(commonAlertError(err, null)))
    .finally(() => dispatch(setLoading(false)))
}

export const updatePasswordBySelf = (values, cb) => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  const postData = { ...values }
  axios.post('/user/change/self/password', postData)
    .then(res => {
      dispatch(commonAlertSuccess(COMMON_MSG_MAP['changePasswordSuccess'], cb))
    })
    .catch(err => dispatch(commonAlertError(err, null)))
    .finally(() => dispatch(setLoading(false)))
}
export const updatePassword = (values, cb) => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  const postData = { ...values }
  axios.post('/user/change/password', postData)
    .then(res => {
      dispatch(commonAlertSuccess(COMMON_MSG_MAP['resetPassword'], cb))
    })
    .catch(err => dispatch(commonAlertError(err, null)))
    .finally(() => dispatch(setLoading(false)))
}

export const removeUserData = () => (dispatch, getState, axios) => {
  dispatch({ type: actions.GET_USER_INFO, payload: undefined})
}

const isDataNotExist = (persist, state) => {
  const data = state.member.get(persist)?.toJS()
  return isEmpty(data)
}
