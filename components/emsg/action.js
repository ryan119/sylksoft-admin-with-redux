import { omit, map } from 'lodash'
import * as actions from 'src/actions/actionTypes'
import { commonAlertError, commonAlertSuccess, setLoading } from 'src/actions/common'
import { COMMON_MSG_MAP } from 'src/actions/common-message'
import { mxmtAPI } from 'src/store/axios'

export const searchEmsg = () => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  const criteria = getState().emsgMgmt.get('criteria')?.toJS()
  const postData = {
    ...criteria,
    hasAttachment: criteria.hasAttachment === true ? criteria.hasAttachment : undefined ,
    page: criteria.page + 1
  }
  axios.post('/emsg/search', postData)
    .then(res => {
      dispatch({ type: actions.SEARCH_EMSG, payload: res.data})
    })
    .catch(err => dispatch(commonAlertError(err)))
    .finally(() => dispatch(setLoading(false)))
}

export const setEmsgCriteria = (key, value) =>  (dispatch, getState, axios) => {
  dispatch({type: actions.SET_EMSG_CRITERIA, payload: {key, value}})
}

export const resetEmsgCriteria = (key, value) =>  (dispatch, getState, axios) => {
  dispatch({ type: actions.RESET_EMSG_CRITERIA })
}

export const getEmsgInfo = (id, cb) => (dispatch, getState, axios) => {
    dispatch(setLoading(true))
    axios.get(`/emsg/info/${id}`)
      .then(res => {
        dispatch({ type: actions.GET_EMSG_INFO, payload: res.data })
      })
      .catch(err => dispatch(commonAlertError(err, null, cb)))
      .finally(() => dispatch(setLoading(false)))
}

export const deleteEmsg = (values, cb) => (dispatch, getState, axios) => {
    dispatch(setLoading(true))
    const postData = { ...values }
    axios.post('/emsg/delete', postData)
      .then(res => {
        dispatch(commonAlertSuccess(COMMON_MSG_MAP['deleteSuccess'], cb))
      })
      .catch(err => dispatch(commonAlertError(err)))
      .finally(() => dispatch(setLoading(false)))
}

//批次媒合船舶與電文
export const addEmsgMatch = (values, cb) => (dispatch, getState, axios) => {
    dispatch(setLoading(true))
    const postData = { ...values }
    axios.post('/emsg/match', postData)
      .then(res => {
        dispatch(commonAlertSuccess(COMMON_MSG_MAP['createSuccess'], cb))
      })
      .catch(err => dispatch(commonAlertError(err)))
      .finally(() => dispatch(setLoading(false)))
}

//更新電文媒合狀態
export const updateEmsgStatus = (values) => (dispatch, getState, axios) => {
    dispatch(setLoading(true))
    const postData = { ...values }
    axios.post('/emsg/update/matchstatus', postData)
      .then(res => {
        dispatch(commonAlertSuccess(COMMON_MSG_MAP['updateSuccess']))
        dispatch(getEmsgInfo(values.id))
      })
      .catch(err => dispatch(commonAlertError(err)))
      .finally(() => dispatch(setLoading(false)))
}

export const sendEmail = (values, cb) => (dispatch, getState, axios) => {
    dispatch(setLoading(true))
    const attaches = {
      files: map(values.attaches, (f) => {
        return {
          ...omit(f, ['size', 'url'])
        }
      })
    }

    const postData = {
      ...values,
      receivers: values.choose === '1' ? values.receivers: [],
      mailGroupId: values.choose === '2' ? values.mailGroupId: '',
      attaches,
    }

    axios.post('/emsg/send/email', postData)
      .then(res => {
        dispatch(commonAlertSuccess(COMMON_MSG_MAP['sendEmailSuccess'], cb))
      })
      .catch(err => dispatch(commonAlertError(err)))
      .finally(() => dispatch(setLoading(false)))
}

export const downloadAttach = (link, cb) => (dispatch, getState, axios) => {
    dispatch(setLoading(true))
    const postData = { filePath: link }
    axios.post('/emsg/attach', postData, { responseType: 'blob'})
      .then(res => {
        if(res.data.size !== 0) {
          cb(res.data)
        }
      })
      .catch(err => dispatch(commonAlertError(err)))
      .finally(() => dispatch(setLoading(false)))
}


export const removeEmsgInfo = () =>  (dispatch, getState, axios) => {
  dispatch({ type: actions.GET_EMSG_INFO, payload: undefined})
}
