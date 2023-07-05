import { fromJS } from 'immutable'
import * as actions from 'src/actions/actionTypes'
import { defaultPage, defaultPageSize, defCrit } from 'src/base-components/react-table/constant'
import { createReducer } from 'src/reducers'

const types = actions

const state = fromJS({
  eqyCriteria: {
    ...defCrit,
    sidx: ['sortOrder'],
    sord: ['asc']
  },

  grpCriteria: {
    ...defCrit,
  }
})

const SEARCH_ENQUIRY = (state, { payload }) => {
  return state.update('eqyResult', value => fromJS(payload))
}

const SET_ENQUIRY_CRITERIA = (state, { payload }) => {
  return state.updateIn(['eqyCriteria', payload.key], value => fromJS(payload.value))
}

const RESET_ENQUIRY_CRITERIA = (state, { payload }) => {
  return state.update('eqyCriteria', value => fromJS(defaultCriteria))
}

const GET_ENQUIRY_PARAM_INFO = (state, { payload }) => {
  return state.update('enquiryInfo', value => fromJS(payload))
}

const SEARCH_MAIL_GROUP = (state, { payload }) => {
  return state.update('grpResult', value => fromJS(payload))
}

const SET_MAIL_GROUP_CRITERIA = (state, { payload }) => {
  return state.updateIn(['grpCriteria', payload.key], value => fromJS(payload.value))
}

const RESET_MAIL_GROUP_CRITERIA = (state, { payload }) => {
  return state.update('grpCriteria', value => fromJS(defaultGrpCriteria))
}

const GET_MAIL_GROUP_INFO = (state, { payload }) => {
  return state.update('mailGroupInfo', value => fromJS(payload))
}

const GET_MINE_MAIL_GROUP = (state, { payload }) => {
  return state.update('mineMailGroup', value => fromJS(payload))
}

const handlers = {
  [types.SEARCH_ENQUIRY]: SEARCH_ENQUIRY,
  [types.SET_ENQUIRY_CRITERIA]: SET_ENQUIRY_CRITERIA,
  [types.RESET_ENQUIRY_CRITERIA]: RESET_ENQUIRY_CRITERIA,
  [types.GET_ENQUIRY_PARAM_INFO]: GET_ENQUIRY_PARAM_INFO,
  [types.SEARCH_MAIL_GROUP]: SEARCH_MAIL_GROUP,
  [types.SET_MAIL_GROUP_CRITERIA]: SET_MAIL_GROUP_CRITERIA,
  [types.RESET_MAIL_GROUP_CRITERIA]: RESET_MAIL_GROUP_CRITERIA,
  [types.GET_MAIL_GROUP_INFO]: GET_MAIL_GROUP_INFO,
  [types.GET_MINE_MAIL_GROUP]: GET_MINE_MAIL_GROUP,
}

const defaultGrpCriteria = {
  ...defCrit,
}

const defaultCriteria = {
  ...defCrit,
  sidx: ['sortOrder'],
  sord: ['asc']
}

export default createReducer(state, handlers)
