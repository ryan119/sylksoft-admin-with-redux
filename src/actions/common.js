import { ENQUIRY_PARAM_MAP, PARAM_MAP } from 'components/common/param-map'
import { isEmpty } from 'lodash'
import { DEFAULT_LANG, WEB_HOST } from 'src/conf'
import * as actions from './actionTypes'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useErrorLogger } from '../libs/hooks'

const AlertMessage = withReactContent(Swal)

export const commonAlertError =
  (err, message = '系統繁忙，請重新操作', cb = null) =>
    async (dispatch, getState, axios) => {
      useErrorLogger(err?.response?.data.message ?? message)
      let displayMsg = err?.response?.data.message ?? message
      if (err?.response?.data.constructor.name === 'Blob') {
        displayMsg = await convertBlobMessage(err)
      }

      useErrorLogger(displayMsg)
      AlertMessage.fire({
        icon: 'warning',
        confirmButtonColor: '#d33',
        text: displayMsg,
        allowOutsideClick: false
      }).then((res) => {
        //console.log('common alert error: ', res, 'cb: ', typeof cb)
        //console.log('cb: ', cb)
        if (typeof cb === 'function') {
          cb()
        }
      })

    }


function convertBlobMessage(err) {
  return new Promise((resolve, reject) => {
    const blb = new Blob([err.response.data], { type: 'application/json' })
    const reader = new FileReader()
    reader.readAsText(blb)
    reader.onload = () => {
      const message = JSON.parse(reader.result)?.message
      resolve(message)
    }
    reader.onerror = () => reject(error)
  })
}

export const commonAlertSuccess = (message = '操作完成', cb = null) => (dispatch, getState, axios) => {
  AlertMessage.fire({
    icon: 'success',
    text: message,
    confirmButtonColor: '#009999',
    //text: '',
    allowOutsideClick: false
  }).then(() => {
    if (typeof cb === 'function') {
      cb()
    }
  })
}

export const commonAPIError = (err, message = '發生錯誤，請重新操作') => (dispatch, getState, axios) => {
  console.log('err: ', err)
  dispatch({ type: actions.API_ERROR, payload: err?.response?.data.message ?? message })
}

export const commonAPISuccess = (message = '操作完成') => (dispatch, getState, axios) => {
  dispatch({ type: actions.API_SUCCESS, payload: message })
}

export const setLoading = (loading) => (dispatch, getState, axios) => {
  dispatch({ type: actions.SET_LOADING, payload: loading })
}

export const uploadImage = (file) => async (dispatch, getState, axios) => {
  const base64 = await toBase64(file)
  const postData = [{
    fileName: file.name,
    image: base64
  }]
  console.log('postData: ', postData)
  return axios.post('/common/image/upload', postData)
    .then(res => {
      return res.data
    })
}

export const uploadFile = (file) => async (dispatch, getState, axios) => {
  const base64 = await toBase64(file)
  const postData = {
    files: [{
      content: base64,
      fileName: file.name,
      contentType: file.type
    }]
  }
  console.log('postData: ', postData)
  return axios.post('/common/files/upload', postData)
    .then(res => {
      return res.data
    })
}

export const alive = () => (dispatch, getState, axios) => {
  //dispatch(setLoading(true))
  // axios.get('/common/ls/ms')
  //   .then(res => {
  //     console.log('test alive: ', res.data)
  //   })
  //   .catch((err) =>{
  //     console.log(JSON.stringify(err))
  //     console.log('commone err: ', err instanceof TypeError)
  //     dispatch(commonAlertError(err))
  //   })
  //   .finally(() => dispatch(setLoading(false)))
}


export const getEnquiryParamTypes = () => (dispatch, getState, axios) => {
  if (isDataNotExist('enquiryParamTypes', getState())) {
    axios.get('/common/enquiry/param/types')
      .then(res => {
        dispatch({ type: actions.GET_ENQUIRY_PARAM_TYPES, payload: res.data })
      })
      .catch(err => dispatch(commonAlertError(err)))
  }
}

export const getEnquiryParamById = (typeId) => (dispatch, getState, axios) => {
  if (isDataNotExist(ENQUIRY_PARAM_MAP[typeId], getState())) {
    axios.get(`/common/enquiry/param/${typeId}`)
      .then(res => {
        dispatch({ type: actions.GET_ENQUIRY_PARAM, payload: { data: res.data, typeId } })
      })
      .catch(err => dispatch(commonAlertError(err)))
  }
}

export const getParamTypes = () => (dispatch, getState, axios) => {
  if (isDataNotExist('paramTypes', getState())) {
    axios.get('/common/param/types')
      .then(res => {
        dispatch({ type: actions.GET_PARAM_TYPES, payload: res.data })
      })
      .catch(err => dispatch(commonAlertError(err)))
  }
}

export const getParamById = (typeId) => (dispatch, getState, axios) => {
  if (isDataNotExist(PARAM_MAP[typeId], getState())) {
    axios.get(`/common/param/${typeId}`)
      .then(res => {
        dispatch({ type: actions.GET_COMMON_PARAM, payload: { data: res.data, typeId } })
      })
      .catch(err => dispatch(commonAlertError(err)))
  }
}

//取得所有電文配對狀態
export const getEmsgMatchStatuses = () => (dispatch, getState, axios) => {
  if (isDataNotExist('matchStatuses', getState())) {
    axios.get('/common/emsg/matchstatuses')
      .then(res => {
        dispatch({ type: actions.GET_EMSG_MATCH_STATUSES, payload: res.data })
      })
      .catch(err => dispatch(commonAlertError(err)))
  }
}

export const getRtpFrequencies = () => (dispatch, getState, axios) => {
  if (isDataNotExist('rtpFrequencies', getState())) {
    dispatch(setLoading(true))
    axios.get('/common/rpt/frequencies')
      .then(res => {
        dispatch({ type: actions.GET_RTP_FREQUENCIES, payload: res.data })
      })
      .catch(err => dispatch(commonAlertError(err)))
      .finally(() => dispatch(setLoading(false)))
  }
}


export const getRoles = () => (dispatch, getState, axios) => {
  if (isDataNotExist('roles', getState()))
    axios.get(`/common/roles/${DEFAULT_LANG}`)
      .then(res => {
        dispatch({ type: actions.GET_SYSTEM_ROLES, payload: res.data })
      })
      .catch(err => dispatch(commonAlertError(err, null)))
      .finally(() => dispatch(setLoading(false)))
}

export const getMgUser = () => (dispatch, getState, axios) => {
    if(isDataNotExist('mgUsers', getState())) {
      axios.get('/common/mg/users')
        .then(res => {
          dispatch({ type: actions.GET_MG_USERS, payload: res.data})
        })
        .catch(err => dispatch(commonAlertError(err)))
        .finally(() => dispatch(setLoading(false)))
    }
}


export const removeData = (target) => (dispatch, getState, axios) => {
  dispatch({ type: target, payload: undefined })
}

export const convertBase64 = async (file) => {
  return await toBase64(file)
}

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => resolve(reader.result.split(',')[1])
  reader.onerror = error => reject(error)
})

const isDataNotExist = (persist, state) => {
  const data = state.common.get(persist)?.toJS()
  return isEmpty(data)
}
