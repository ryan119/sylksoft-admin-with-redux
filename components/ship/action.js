import { addEmsgMatch } from 'components/emsg/action'
import { VESSEL_MSG_MAP } from 'components/ship/messages'
import * as actions from 'src/actions/actionTypes'
import { commonAlertError, commonAlertSuccess, setLoading } from 'src/actions/common'
import { COMMON_MSG_MAP } from 'src/actions/common-message'


export const getVesselTypes = () => (dispatch, getState, axios) => {
    dispatch(setLoading(true))
    axios.get('/vessel/types')
      .then(res => {
        dispatch({type: actions.GET_VESSEL_TYPES, payload: res.data})
      })
      .catch(err => dispatch(commonAlertError(err)))
      .finally(() => dispatch(setLoading(false)))
}


export const createVessel = (values, callback) => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  const postData = { ...values }
  axios.post('/vessel/create', postData)
    .then(res => {
      dispatch(commonAlertSuccess(VESSEL_MSG_MAP['createSuccess'], callback))
    })
    .catch(err => dispatch(commonAlertError(err)))
    .finally(() => dispatch(setLoading(false)))
}

export const updateVessel = (values, callback) => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  const postData = { ...values }
  axios.post('/vessel/update', postData)
    .then(res => {
      dispatch(commonAlertSuccess(VESSEL_MSG_MAP['updateSuccess'], callback))
      dispatch(getVessel(values?.vesselId))
    })
    .catch(err => dispatch(commonAlertError(err)))
    .finally(() => dispatch(setLoading(false)))
}

export const deleteVessel = (values, cb) => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  const postData = { ...values }
  axios.post('/vessel/delete', postData)
    .then(res => {
      dispatch(commonAlertSuccess(VESSEL_MSG_MAP['deleteSuccess'], cb))
      dispatch(searchVessel())
    })
    .catch(err => dispatch(commonAlertError(err)))
    .finally(() => dispatch(setLoading(false)))
}

export const getVessel = (id, callback) => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  axios.get(`/vessel/info/${id}`)
    .then(res => {
      dispatch({ type: actions.GET_VESSEL, payload: res.data })
    })
    .catch(err => dispatch(commonAlertError(err)))
    .finally(() => dispatch(setLoading(false)))
}

export const searchVessel = () => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  const criteria = getState().ship.get('criteria')?.toJS()
  const postData = {
    ...criteria,
    page: criteria.page + 1
  }
  axios.post('/vessel/search', postData)
    .then(res => {
      dispatch({ type: actions.SEARCH_VESSEL, payload: res.data })
    })
    .catch(err => dispatch(commonAlertError(err)))
    .finally(() => dispatch(setLoading(false)))
}

export const exportVessel = (cb) => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  const criteria = getState().ship.get('criteria')?.toJS()
  const postData = {
    ...criteria,
    page: criteria.page + 1
  }
  axios.post('/vessel/export', postData, { responseType: 'blob' })
    .then(res => {
      if (res.data.size !== 0) {
        cb(res.data)
      }
    })
    .catch(err => dispatch(commonAlertError(err)))
    .finally(() => dispatch(setLoading(false)))
}

export const setVesselCriteria = (key, value) => (dispatch, getState, axios) => {
  dispatch({ type: actions.SET_VESSEL_CRITERIA, payload: { key, value } })
}

export const resetVesselCriteria = (key, value) => (dispatch, getState, axios) => {
  dispatch({ type: actions.RESET_VESSEL_CRITERIA })
}

export const copyVesselForNew = (values, callback) => (dispatch, getState, axios) => {
  dispatch({ type: actions.NEW_VESSEL, payload: values })
  if (typeof callback === 'function') {
    callback()
  }
}

//搜尋船舶參數
export const searchParams = () => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  const criteria = getState().ship.get('paramCriteria')?.toJS()
  //console.log('criteria: ', criteria)
  const postData = {
    ...criteria,
    page: criteria.page + 1
  }
  axios.post('/param/search', postData)
    .then(res => {
      dispatch({ type: actions.SEARCH_PARAMS, payload: res.data })
    })
    .catch(err => dispatch(commonAlertError(err)))
    .finally(() => dispatch(setLoading(false)))
}
//新增船舶參數
export const createParam = (values, cb) => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  const postData = { ...values }
  axios.post('/param/create', postData)
    .then(res => {
      dispatch(commonAlertSuccess(VESSEL_MSG_MAP['createParamSuccess'], cb))
    })
    .catch(err => dispatch(commonAlertError(Sguo)))
    .finally(() => dispatch(setLoading(false)))
}
//更新船舶參數
export const updateParam = (values) => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  const postData = { ...values }
  axios.post('/param/update', postData)
    .then(res => {
      dispatch(commonAlertSuccess(VESSEL_MSG_MAP['updateParamSuccess']))
    })
    .catch(err => dispatch(commonAlertError(err)))
    .finally(() => dispatch(setLoading(false)))
}
//刪除船舶參數
export const deleteParams = (values) => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  const postData = { ...values }
  axios.post('/param/delete', postData)
    .then(res => {
      dispatch(commonAlertSuccess(VESSEL_MSG_MAP['deleteParamSuccess']))
    })
    .catch(err => dispatch(commonAlertError(err)))
    .finally(() => dispatch(setLoading(false)))
}
//取得船舶參數資料
export const getParamInfo = (id) => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  axios.get(`/param/info/${id}`)
    .then(res => {
      dispatch({ type: actions.GET_PARAM, payload: res.data })
    })
    .catch(err => dispatch(commonAlertError(err)))
    .finally(() => dispatch(setLoading(false)))
}

export const setParamCriteria = (key, value) => (dispatch, getState, axios) => {
  dispatch({ type: actions.SET_PARAM_CRITERIA, payload: { key, value } })
}

export const resetParamCriteria = () => (dispatch, getState, axios) => {
  dispatch({ type: actions.RESET_PARAM_CRITERIA, payload: undefined })
}


//刪除預估價
export const deleteEstValuation = (values, vesselId) => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  const postData = { ...values }
  axios.post('/vessel/ev/delete', postData)
    .then(res => {
      dispatch(commonAlertSuccess(COMMON_MSG_MAP['deleteSuccess']))
      dispatch(getVesselEstValuationRecords(vesselId))
    })
    .catch(err => dispatch(commonAlertError(err)))
    .finally(() => dispatch(setLoading(false)))
}

//更新預估價
export const updateEstValuation = (values, cb) => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  const postData = { ...values }
  axios.post('/vessel/ev/update', postData)
    .then(res => {
      if (typeof cb === 'function') cb()
      dispatch(getVesselEstValuationRecords(values?.vesselId))
    })
    .catch(err => dispatch(commonAlertError(err)))
    .finally(() => dispatch(setLoading(false)))
}

//新增預估價
export const createEstValuation = (values, cb) => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  const postData = { ...values }
  axios.post('/vessel/ev/create', postData)
    .then(res => {
      if (typeof cb === 'function') cb()
      dispatch(getVesselEstValuationRecords(values?.vesselId))
    })
    .catch(err => dispatch(commonAlertError(err)))
    .finally(() => dispatch(setLoading(false)))
}
//取得船舶預估價列表
export const getVesselEstValuationRecords = (id) => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  axios.get(`/vessel/ev/records/${id}`)
    .then(res => {
      dispatch({ type: actions.GET_VESSEL_EV_RECORDS, payload: res.data })
    })
    .catch(err => dispatch(commonAlertError(err)))
    .finally(() => dispatch(setLoading(false)))
}
//取得船舶預估價詳細資料
export const getVesselEstValuationInfo = (id) => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  axios.get(`/vessel/ev/info/${id}`)
    .then(res => {
      dispatch({ type: actions.GET_VESSEL_EV_INFO, payload: res.data })
    })
    .catch(err => dispatch(commonAlertError(err)))
    .finally(() => dispatch(setLoading(false)))
}

//刪除成交價
export const deleteSoldPrice = (values, vesselId) => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  const postData = { ...values }
  axios.post('/vessel/sp/delete', postData)
    .then(res => {
      dispatch(commonAlertSuccess(COMMON_MSG_MAP['deleteSuccess']))
      dispatch(getVesselSpRecords(vesselId))
    })
    .catch(err => dispatch(commonAlertError(err)))
    .finally(() => dispatch(setLoading(false)))
}

//更新成交價
export const updateSoldPrice = (values, cb) => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  const postData = { ...values }
  axios.post('/vessel/sp/update', postData)
    .then(res => {
      if (values.vesselId) {
        dispatch(getVesselSpRecords(values.vesselId))
      }
      if (typeof cb === 'function') cb()
      //dispatch(commonAlertSuccess(COMMON_MSG_MAP['updateSuccess]']))
    })
    .catch(err => dispatch(commonAlertError(err)))
    .finally(() => dispatch(setLoading(false)))
}

//新增成交價
export const createSoldPrice = (values, cb) => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  const postData = { ...values }
  axios.post('/vessel/sp/create', postData)
    .then(res => {
      if (values.vesselId) {
        dispatch(getVesselSpRecords(values.vesselId))
      }
      if (typeof cb === 'function') cb()
    })
    .catch(err => dispatch(commonAlertError(err)))
    .finally(() => dispatch(setLoading(false)))
}
//取得船舶交成價列表
export const getVesselSpRecords = (id) => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  axios.get(`/vessel/sp/records/${id}`)
    .then(res => {
      dispatch({ type: actions.GET_VESSEL_SP_RECORDS, payload: res.data })
    })
    .catch(err => dispatch(commonAlertError(err)))
    .finally(() => dispatch(setLoading(false)))
}
//取得船舶成交價詳細資料
export const getVesselSpInfo = (id) => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  axios.get(`/vessel/sp/info/${id}`)
    .then(res => {
      dispatch({ type: actions.GET_VESSEL_SP_INFO, payload: res.data })
    })
    .catch(err => dispatch(commonAlertError(err)))
    .finally(() => dispatch(setLoading(false)))
}

//取得電文記錄
export const getVesselEmsgs = (id) => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  axios.get(`/vessel/emsgs/${id}`)
    .then(res => {
      dispatch({ type: actions.GET_VESSEL_EMSGS, payload: res.data })
    })
    .catch(err => dispatch(commonAlertError(err)))
    .finally(() => dispatch(setLoading(false)))
}

//修改電文與船舶關聯
export const updateVesselEmsg = (values, removeData, cb) => (dispatch, getState, axios) => {
    dispatch(setLoading(true))
    const postData = { ...values }
    axios.post('/vessel/emsg/remove', removeData)
      .then(() => {
        dispatch(addEmsgMatch(values, cb))
      })
      .catch(err => dispatch(commonAlertError(err)))
      .finally(() => dispatch(setLoading(false)))
}

//移除船舶與電文的關聯
export const removeVesselEmsg = (values, cb) => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  const postData = { ...values }
  axios.post('/vessel/emsg/remove', postData)
    .then(res => {
      dispatch(commonAlertSuccess(VESSEL_MSG_MAP['removeEmsgVessel'], cb))
    })
    .catch(err => dispatch(commonAlertError(err)))
    .finally(() => dispatch(setLoading(false)))
}

//取得該船舶的所有電文附件
export const getVesselAttaches = (id) => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  const postData = {}
  axios.get(`/vessel/attaches/${id}`)
    .then(res => {
      dispatch({ type: actions.GET_VESSEL_ATTACHES, payload: res.data })
    })
    .catch(err => dispatch(commonAlertError(err)))
    .finally(() => dispatch(setLoading(false)))
}

//修改電文附件的檔名
export const updateVesselAttach = (values, cb) => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  const postData = { ...values }
  axios.post('/vessel/attach/update', postData)
    .then(res => {
      dispatch(commonAlertSuccess(COMMON_MSG_MAP['updateSuccess'], cb))
    })
    .catch(err => dispatch(commonAlertError(err)))
    .finally(() => dispatch(setLoading(false)))
}


//依船舶名稱搜尋船舶資料
export const searchVesselByName = (values) => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  const postData = { ...values }
  axios.post('/vessel/search/name', postData)
    .then(res => {
      dispatch({type: actions.SEARCH_VESSEL_BY_NAME, payload: res.data})
    })
    .catch(err => dispatch(commonAlertError(err)))
    .finally(() => dispatch(setLoading(false)))
}

export const removeData = (type) => (dispatch, getState, axios) => {
  //console.log('removeData: ', type)
  switch (type) {
    case 'vessel':
      dispatch({ type: actions.GET_VESSEL, payload: undefined })
      break
    case 'paramInfo':
      dispatch({ type: actions.GET_PARAM, payload: undefined })
      break
    case 'newVessel':
      dispatch({ type: actions.NEW_VESSEL, payload: undefined })
    case 'vessels':
      dispatch({ type: actions.SEARCH_VESSEL_BY_NAME, payload: undefined })
  }
}
