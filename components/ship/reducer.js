import { fromJS } from 'immutable'
import * as actions from 'src/actions/actionTypes'
import { defaultPage, defaultPageSize, defCrit } from 'src/base-components/react-table/constant'
import { createReducer } from 'src/reducers'

const types = actions

const state = fromJS({
  criteria: {
    keyword: '',
    page: defaultPage,
    sidx: ['matchDate'],
    size: defaultPageSize,
    sord: ['desc']
  },
  paramCriteria: {
    page: defaultPage,
    sidx: ['sortOrder'],
    size: defaultPageSize,
    sord: ['asc']
  }
})

const SEARCH_VESSEL = (state, { payload }) => {
  return state.update('searchResult', value => fromJS(payload))
}

const GET_VESSEL = (state, { payload }) => {
  return state.update('vessel', value => fromJS(payload))
}

const SET_VESSEL_CRITERIA = (state, { payload }) => {
  return state.updateIn(['criteria', payload.key], value => fromJS(payload.value))
}


const RESET_VESSEL_CRITERIA = (state, { payload }) => {
  return state.update('criteria', value => fromJS(defaultCriteria))
}

const NEW_VESSEL = (state, { payload }) => {
  return state.update('newVessel', value => fromJS(payload))
}

const SEARCH_PARAMS = (state, { payload }) => {
  return state.update('paramsResult', value => fromJS(payload))
}

const SET_PARAM_CRITERIA = (state, { payload }) => {
  return state.updateIn(['paramCriteria', payload.key], value => fromJS(payload.value))
}

const RESET_PARAM_CRITERIA = (state, { payload }) => {
  return state.update('paramCriteria', value => fromJS(defaultParamCriteria))
}

const GET_PARAM = (state, { payload }) => {
  return state.update('paramInfo', value => fromJS(payload))
}

const GET_VESSEL_SP_INFO = (state, { payload }) => {
  return state.update('spInfo', value => fromJS(payload))
}

const GET_VESSEL_SP_RECORDS = (state, { payload }) => {
  return state.update('spRecords', value => fromJS(payload))
}

const GET_VESSEL_EV_INFO = (state, { payload }) => {
  return state.update('evInfo', value => fromJS(payload))
}

const GET_VESSEL_EV_RECORDS = (state, { payload }) => {
  return state.update('evRecords', value => fromJS(payload))
}

const SEARCH_VESSEL_BY_NAME = (state, { payload }) => {
  return state.update('vessels', value => fromJS(payload))
}

const GET_VESSEL_EMSGS = (state, { payload }) => {
  return state.update('emsgInfo', value => fromJS(payload))
}

const GET_VESSEL_ATTACHES = (state, { payload }) => {
  return state.update('attachInfo', value => fromJS(payload))
}

const GET_VESSEL_TYPES = (state, { payload }) => {
  return state.update('vesselTypes', () => fromJS(payload))
}

const handlers = {
  [types.SEARCH_VESSEL]: SEARCH_VESSEL,
  [types.GET_VESSEL]: GET_VESSEL,
  [types.SET_VESSEL_CRITERIA]: SET_VESSEL_CRITERIA,
  [types.RESET_VESSEL_CRITERIA]: RESET_VESSEL_CRITERIA,
  [types.NEW_VESSEL]: NEW_VESSEL,
  [types.SEARCH_PARAMS]: SEARCH_PARAMS,
  [types.SET_PARAM_CRITERIA]: SET_PARAM_CRITERIA,
  [types.RESET_PARAM_CRITERIA]: RESET_PARAM_CRITERIA,
  [types.GET_PARAM]: GET_PARAM,
  [types.GET_VESSEL_SP_INFO]: GET_VESSEL_SP_INFO,
  [types.GET_VESSEL_SP_RECORDS]: GET_VESSEL_SP_RECORDS,
  [types.GET_VESSEL_EV_INFO]: GET_VESSEL_EV_INFO,
  [types.GET_VESSEL_EV_RECORDS]: GET_VESSEL_EV_RECORDS,
  [types.SEARCH_VESSEL_BY_NAME]: SEARCH_VESSEL_BY_NAME,
  [types.GET_VESSEL_EMSGS]: GET_VESSEL_EMSGS,
  [types.GET_VESSEL_ATTACHES]:GET_VESSEL_ATTACHES,
  [types.GET_VESSEL_TYPES]:GET_VESSEL_TYPES,
}

const defaultCriteria = {
  keyword: '',
  page: defaultPage,
  sidx: ['matchDate'],
  size: defaultPageSize,
  sord: ['desc']
}
const defaultParamCriteria = {
  ...defCrit,
  sidx: ['sortOrder'],
  sord: ['asc']
}

export default createReducer(state, handlers)
