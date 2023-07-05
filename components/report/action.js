

import { RESET_RPT_EST_CRITERIA, SET_RPT_EST_CRITERIA } from 'src/actions/actionTypes'
import * as actions from 'src/actions/actionTypes'
import { commonAlertError, setLoading } from 'src/actions/common'

export const searchRptSp = () => (dispatch, getState, axios) => {
  const dataset = getState().reportMgmt.get('spDataset').toJS()
  if(dataset.length >= 5) {
    dispatch(commonAlertError(null, '查詢結果 (支援上限為5筆結果)'))
  }else {
    dispatch(setLoading(true))
    const criteria = getState().reportMgmt.get('spCrit')?.toJS()
    const postData = { ...criteria }
    axios.post('/rpt/trend/sp', postData)
      .then(res => {
        const data = { criteria, data: res.data }
        dataset.push(data)
        dispatch({type: actions.SET_SP_DATASET, payload: dataset})
      })
      .catch(err => dispatch(commonAlertError(err)))
      .finally(() => dispatch(setLoading(false)))
  }
}

export const updateRptSpDatasets = (data) =>  (dispatch, getState, axios) => {
  dispatch({type: actions.SET_SP_DATASET, payload: data})
}

export const setRptSpCriteria = (key, value) =>  (dispatch, getState, axios) => {
  dispatch({type: actions.SET_RPT_SP_CRITERIA, payload: {key, value}})
}

export const resetRptSPCriteria = (resetCriteria) =>  (dispatch, getState, axios) => {
  dispatch({ type: actions.RESET_PRT_SP_CRITERIA, payload: resetCriteria})
}

export const exportSpData = (values, cb) => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  const postData = { ...values }
  axios.post('/rpt/trend/sp/export', postData, { responseType: 'blob'})
    .then(res => {
      if(res.data.size !== 0) {
        cb(res.data)
      }else {
        dispatch(commonAlertError(null, '沒有任何資料可提供下載！'))
      }
    })
    .catch(err => dispatch(commonAlertError(err, null)))
    .finally(() => dispatch(setLoading(false)))
}

// RTP EV
export const searchRptEv = () => (dispatch, getState, axios) => {
  const dataset = getState().reportMgmt.get('evDataset').toJS()
  if(dataset.length >= 5) {
    dispatch(commonAlertError(null, '查詢結果 (支援上限為5筆結果)'))
  }else {
    dispatch(setLoading(true))
    const criteria = getState().reportMgmt.get('evCrit')?.toJS()
    const postData = { ...criteria }
    axios.post('/rpt/trend/ev', postData)
      .then(res => {
        const data = { criteria, data: res.data }
        dataset.push(data)
        dispatch({type: actions.SET_EV_DATASET, payload: dataset})
      })
      .catch(err => dispatch(commonAlertError(err)))
      .finally(() => dispatch(setLoading(false)))
  }
}

export const updateRptEvDatasets = (data) =>  (dispatch, getState, axios) => {
  dispatch({type: actions.SET_EV_DATASET, payload: data})
}

export const setRptEvCriteria = (key, value) =>  (dispatch, getState, axios) => {
  dispatch({type: actions.SET_RPT_EV_CRITERIA, payload: {key, value}})
}

export const resetRptEvCriteria = (resetCriteria) =>  (dispatch, getState, axios) => {
  dispatch({ type: actions.RESET_RPT_EV_CRITERIA, payload: resetCriteria})
}

export const exportEvData = (values, cb) => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  const postData = { ...values }
  axios.post('/rpt/trend/ev/export', postData, { responseType: 'blob'})
    .then(res => {
      if(res.data.size !== 0) {
        cb(res.data)
      }else {
        dispatch(commonAlertError(null, '沒有任何資料可提供下載！'))
      }
    })
    .catch(err => dispatch(commonAlertError(err, null)))
    .finally(() => dispatch(setLoading(false)))
}

// RPT Demolition
export const searchRptDemolition = () => (dispatch, getState, axios) => {
  const dataset = getState().reportMgmt.get('demolitionDataset').toJS()
  if(dataset.length >= 5) {
    dispatch(commonAlertError(null, '查詢結果 (支援上限為5筆結果)'))
  }else {
    dispatch(setLoading(true))
    const criteria = getState().reportMgmt.get('demolitionCrit')?.toJS()
    const postData = { ...criteria }
    axios.post('/rpt/trend/demolition', postData)
      .then(res => {
        const data = { criteria, data: res.data }
        dataset.push(data)
        dispatch({type: actions.SET_DEMOLITION_DATASET, payload: dataset})
      })
      .catch(err => dispatch(commonAlertError(err)))
      .finally(() => dispatch(setLoading(false)))
  }
}

export const updateRptDemolitionDatasets = (data) =>  (dispatch, getState, axios) => {
  dispatch({type: actions.SET_DEMOLITION_DATASET, payload: data})
}

export const setRptDemolitionCriteria = (key, value) =>  (dispatch, getState, axios) => {
  dispatch({type: actions.SET_RPT_DEMOLITION_CRIT, payload: {key, value}})
}

export const resetRptDemolitionCriteria = (resetCriteria) =>  (dispatch, getState, axios) => {
  dispatch({ type: actions.RESET_RPT_DEMOLITION_CRIT, payload: resetCriteria})
}

export const exportDemolitionData = (values, cb) => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  const postData = { ...values }
  axios.post('/rpt/trend/demolition/export', postData, { responseType: 'blob'})
    .then(res => {
      if(res.data.size !== 0) {
        cb(res.data)
      }else {
        dispatch(commonAlertError(null, '沒有任何資料可提供下載！'))
      }
    })
    .catch(err => dispatch(commonAlertError(err, null)))
    .finally(() => dispatch(setLoading(false)))
}

//RPT EST
export const searchRptEst = () => (dispatch, getState, axios) => {
  const dataset = getState().reportMgmt.get('estDataset').toJS()
  if(dataset.length >= 5) {
    dispatch(commonAlertError(null, '查詢結果 (支援上限為5筆結果)'))
  }else {
    dispatch(setLoading(true))
    const criteria = getState().reportMgmt.get('estCrit')?.toJS()
    const postData = { ...criteria }
    axios.post('/rpt/trend/est', postData)
      .then(res => {
        const data = { criteria, data: res.data }
        dataset.push(data)
        dispatch({type: actions.SET_EST_DATASET, payload: dataset})
      })
      .catch(err => dispatch(commonAlertError(err)))
      .finally(() => dispatch(setLoading(false)))
  }
}

export const updateRptEstDatasets = (data) =>  (dispatch, getState, axios) => {
  dispatch({type: actions.SET_EST_DATASET, payload: data})
}

export const setRptEstCriteria = (key, value) =>  (dispatch, getState, axios) => {
  dispatch({type: actions.SET_RPT_EST_CRITERIA, payload: {key, value}})
}

export const resetRptEstCriteria = (resetCriteria) =>  (dispatch, getState, axios) => {
  dispatch({ type: actions.RESET_RPT_EST_CRITERIA, payload: resetCriteria})
}

export const exportEstData = (values, cb) => (dispatch, getState, axios) => {
  dispatch(setLoading(true))
  const postData = { ...values }
  axios.post('/rpt/trend/est/export', postData, { responseType: 'blob'})
    .then(res => {
      if(res.data.size !== 0) {
        cb(res.data)
      }else {
        dispatch(commonAlertError(null, '沒有任何資料可提供下載！'))
      }
    })
    .catch(err => dispatch(commonAlertError(err, null)))
    .finally(() => dispatch(setLoading(false)))
}