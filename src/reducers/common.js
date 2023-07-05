import { ENQUIRY_PARAM_MAP, PARAM_MAP } from 'components/common/param-map'
import { fromJS } from 'immutable'
import * as actions from '../actions/actionTypes'
import { createReducer } from './index'

const types = actions

const state = fromJS({
  errorMessage: '',
  successMessage: '',
  loading: false
})

const API_ERROR = (state, { payload }) => {
  return state.update('errorMessage', value => fromJS(payload))
}

const API_SUCCESS = (state, { payload }) => {
  return state.update('successMessage', value => fromJS(payload))
}

const SET_LOADING = (state, { payload }) => {
  return state.update('loading', value => fromJS(payload))
}

const GET_COMMON_PARAM = (state, { payload }) => {
  return state.update(PARAM_MAP[payload.typeId], value => fromJS(payload.data))
}

const GET_PARAM_TYPES = (state, { payload }) => {
  return state.update('paramTypes', value => fromJS(payload))
}

const GET_ENQUIRY_PARAM_TYPES = (state, { payload }) => {
  return state.update('enquiryParamTypes', value => fromJS(payload))
}

const GET_ENQUIRY_PARAM = (state, { payload }) => {
  return state.update(ENQUIRY_PARAM_MAP[payload.typeId], value => fromJS(payload.data))
}
const GET_EMSG_MATCH_STATUSES = (state, { payload }) => {
  return state.update('matchStatuses', value => fromJS(payload))
}
const GET_RTP_FREQUENCIES = (state, { payload }) => {
  return state.update('rtpFrequencies', value => fromJS(payload))
}
const GET_SYSTEM_ROLES = (state, { payload }) => {
  return state.update('roles', () => fromJS(payload))
}

const GET_MG_USERS = (state, { payload }) => {
  return state.update('mgUsers', () => fromJS(payload))
}

const handlers = {
  [types.API_ERROR]: API_ERROR,
  [types.API_SUCCESS]: API_SUCCESS,
  [types.SET_LOADING]: SET_LOADING,
  [types.GET_COMMON_PARAM]: GET_COMMON_PARAM,
  [types.GET_PARAM_TYPES]: GET_PARAM_TYPES,
  [types.GET_ENQUIRY_PARAM_TYPES]: GET_ENQUIRY_PARAM_TYPES,
  [types.GET_ENQUIRY_PARAM]: GET_ENQUIRY_PARAM,
  [types.GET_EMSG_MATCH_STATUSES]: GET_EMSG_MATCH_STATUSES,
  [types.GET_RTP_FREQUENCIES]: GET_RTP_FREQUENCIES,
  [types.GET_SYSTEM_ROLES]: GET_SYSTEM_ROLES,
  [types.GET_MG_USERS]: GET_MG_USERS,
}

export default createReducer(state, handlers)



