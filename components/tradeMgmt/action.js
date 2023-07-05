import { getVesselEstValuationRecords, getVesselSpRecords } from 'components/ship/action'
import * as actions from 'src/actions/actionTypes'
import { commonAlertError, commonAlertSuccess, setLoading } from 'src/actions/common'
import { COMMON_MSG_MAP } from 'src/actions/common-message'
import { isEmpty, map } from 'lodash'

//搜尋船價估價列表
export const searchVesselEst = () => (dispatch, getState, axios) => {
    dispatch(setLoading(true))
  const criteria = getState().tradeMgmt.get('vesselEstCriteria')?.toJS()
    const postData = {
      ...criteria,
      page: criteria.page+1
    }
    axios.post('/est/search', postData)
      .then(res => {
        dispatch({type: actions.SEARCH_VESSEL_EST, payload: res.data})
      })
      .catch(err => dispatch(commonAlertError(err)))
      .finally(() => dispatch(setLoading(false)))
}

export const setVesselEstCriteria = (key, value) => (dispatch, getState, axios) => {
  dispatch({ type: actions.SET_VESSEL_EST_CRITERIA, payload: { key, value } })
}

export const resetVesselEstCriteria = (key, value) => (dispatch, getState, axios) => {
  dispatch({ type: actions.RESET_VESSEL_EST_CRITERIA, payload: undefined})
}

export const getVesselEstInfo = (id) => (dispatch, getState, axios) => {
    dispatch(setLoading(true))
    axios.get(`/est/info/${id}`)
      .then(res => {
        dispatch({ type: actions.GET_VESSEL_EST, payload: res.data})
      })
      .catch(err => dispatch(commonAlertError(err)))
      .finally(() => dispatch(setLoading(false)))
}

export const removeVesselEstInfo = () => (dispatch, getState, axios) => {
  dispatch({ type: actions.GET_VESSEL_EST, payload: undefined})
}

export const createVesselEst = (values, cb) => (dispatch, getState, axios) => {
    dispatch(setLoading(true))
    const newPriceList = []
    for (let item of values.agePriceList) {
      if(item.price) {
        newPriceList.push(item)
      }
    }
    const postData = {
      ...values,
      agePriceList: newPriceList,
    }
    axios.post('/est/create', postData)
      .then(res => {
        dispatch(commonAlertSuccess(COMMON_MSG_MAP['createSuccess'], cb))
      })
      .catch(err => dispatch(commonAlertError(err)))
      .finally(() => dispatch(setLoading(false)))
}

export const updateVesselEst = (values, cb) => (dispatch, getState, axios) => {
    dispatch(setLoading(true))
    const postData = { ...values }
    axios.post('/est/update', postData)
      .then(res => {
        dispatch(commonAlertSuccess(COMMON_MSG_MAP['updateSuccess'], cb))
      })
      .catch(err => dispatch(commonAlertError(err)))
      .finally(() => dispatch(setLoading(false)))
}

export const deleteVesselEst = (values, cb) => (dispatch, getState, axios) => {
    dispatch(setLoading(true))
    const postData = { ...values }
    axios.post('/est/delete', postData)
      .then(res => {
        dispatch(commonAlertSuccess(COMMON_MSG_MAP['deleteSuccess'], cb))
        dispatch(searchVesselEst())
      })
      .catch(err => dispatch(commonAlertError(err)))
      .finally(() => dispatch(setLoading(false)))
}

export const searchEstimate = () => (dispatch, getState, axios) => {
    dispatch(setLoading(true))
    const criteria = getState().tradeMgmt.get('estCriteria')?.toJS()
    const postData = {
      ...criteria,
      page: criteria.page+1
    }
    axios.post('/estimate/search', postData)
      .then(res => {
        dispatch({ type: actions.SEARCH_ESTIMATE, payload: res.data})
      })
      .catch(err => dispatch(commonAlertError(err)))
      .finally(() => dispatch(setLoading(false)))
}
//刪除預估價
export const deleteEV = (values, cb) => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  const postData = { ...values }
  axios.post('/vessel/ev/delete', postData)
    .then(res => {
      dispatch(commonAlertSuccess(COMMON_MSG_MAP['deleteSuccess'], cb))
      dispatch(searchEstimate())
    })
    .catch(err => dispatch(commonAlertError(err)))
    .finally(() => dispatch(setLoading(false)))
}

export const exportEV = (cb) => (dispatch, getState, axios) => {
    dispatch(setLoading(true))
  const criteria = getState().tradeMgmt.get('estCriteria')?.toJS()
  const postData = {
    ...criteria,
    page: criteria.page+1
  }
    axios.post('/estimate/export', postData, { responseType: 'blob'})
      .then(res => {
        if(res.data.size !== 0){
          cb(res.data)
        }
      })
      .catch(err => dispatch(commonAlertError(err)))
      .finally(() => dispatch(setLoading(false)))
}

export const setEstimateCriteria = (key, value) => (dispatch, getState, axios) => {
  dispatch({ type: actions.SET_ESTIMATE_CRITERIA, payload: { key, value } })
}

export const resetEstimateCriteria = (key, value) => (dispatch, getState, axios) => {
  dispatch({ type: actions.RESET_ESTIMATE_CRITERIA, payload: undefined})
}

export const searchTrade = () => (dispatch, getState, axios) => {
    dispatch(setLoading(true))
    const criteria = getState().tradeMgmt.get('traCriteria')?.toJS()
    const postData = {
      ...criteria,
      page: criteria.page+1
    }
    axios.post('/trade/search', postData)
      .then(res => {
        dispatch({ type: actions.SEARCH_TRADE, payload: res.data})
      })
      .catch(err => dispatch(commonAlertError(err)))
      .finally(() => dispatch(setLoading(false)))
}

export const exportSP = (cb) => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  const criteria = getState().tradeMgmt.get('traCriteria')?.toJS()
  const postData = {
    ...criteria,
    page: criteria.page+1
  }
  axios.post('/trade/export', postData, { responseType: 'blob'})
    .then(res => {
      if(res.data.size !== 0){
        cb(res.data)
      }
    })
    .catch(err => dispatch(commonAlertError(err)))
    .finally(() => dispatch(setLoading(false)))
}

//刪除成交價
export const deleteSP = (values, cb) => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  const postData = { ...values }
  axios.post('/vessel/sp/delete', postData)
    .then(res => {
      dispatch(commonAlertSuccess(COMMON_MSG_MAP['deleteSuccess'], cb))
      dispatch(searchTrade())
    })
    .catch(err => dispatch(commonAlertError(err)))
    .finally(() => dispatch(setLoading(false)))
}

export const setTradeCriteria = (key, value) => (dispatch, getState, axios) => {
  dispatch({ type: actions.SET_TRADE_CRITERIA, payload: { key, value } })
}

export const resetTradeCriteria = (key, value) => (dispatch, getState, axios) => {
  dispatch({ type: actions.RESET_TRADE_CRITERIA, payload: undefined})
}
//拆船價列表
export const searchDemolition = () => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  const criteria = getState().tradeMgmt.get('demoCrit')?.toJS()
  const postData = {
    ...criteria,
    page: criteria.page+1
  }
  axios.post('/demolition/search', postData)
    .then(res => {
      console.log('res: ', res)
      dispatch({ type: actions.SEARCH_DEMOLITION, payload: res.data})
    })
    .catch(err => dispatch(commonAlertError(err)))
    .finally(() => dispatch(setLoading(false)))
}

export const exportDemolition = (cb) => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  const criteria = getState().tradeMgmt.get('demoCrit')?.toJS()
  const postData = {
    ...criteria,
    page: criteria.page+1
  }
  axios.post('/demolition/export', postData, { responseType: 'blob'})
    .then(res => {
      if(res.data.size !== 0){
        cb(res.data)
      }
    })
    .catch(err => dispatch(commonAlertError(err)))
    .finally(() => dispatch(setLoading(false)))
}

export const deleteDemolition = (values, cb) => (dispatch, getState, axios) => {
    dispatch(setLoading(true))
    const postData = { ...values }
    axios.post('/demolition/delete', postData)
      .then(res => {
        dispatch(commonAlertSuccess(COMMON_MSG_MAP['deleteSuccess'], cb))
        dispatch(searchDemolition())
      })
      .catch(err => dispatch(commonAlertError(err)))
      .finally(() => dispatch(setLoading(false)))
}


export const setDemoCriteria = (key, value) => (dispatch, getState, axios) => {
  dispatch({ type: actions.SET_DEMO_CRIT, payload: { key, value } })
}

export const resetDemoCriteria = (key, value) => (dispatch, getState, axios) => {
  dispatch({ type: actions.RESET_DEMO_CRIT, payload: undefined})
}

