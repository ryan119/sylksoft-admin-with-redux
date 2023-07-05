import { fromJS } from 'immutable'
import * as actions from 'src/actions/actionTypes'
import { defCrit } from 'src/base-components/react-table/constant'
import { formatDatePatternDash, getLastMonthFormat } from 'src/functions/date-format'
import { createReducer } from 'src/reducers'

const types = actions

const state = fromJS({
  criteria: {
    ...defCrit,
    sidx: ['receiveTime'],
    receiveTimeStart: getLastMonthFormat(),
    receiveTimeEnd: formatDatePatternDash(new Date()),
  }
})

const SEARCH_ENQUIRY_LIST = (state, { payload }) => {
  return state.update('searchResult', () => fromJS(payload))
}

const SET_ENQUIRY_LIST_CRITERIA = (state, { payload }) => {
  return state.updateIn(['criteria', payload.key], () => fromJS(payload.value))
}
const RESET_ENQUIRY_LIST_CRITERIA = (state) => {
  return state.update('criteria', () => fromJS(defaultCriteria))
}

const GET_ENQUIRY_INFO = (state, { payload }) => {
  return state.update('enquiryInfo', () => fromJS(payload))
}

const handlers = {
  [types.SEARCH_ENQUIRY_LIST]: SEARCH_ENQUIRY_LIST,
  [types.SET_ENQUIRY_LIST_CRITERIA]: SET_ENQUIRY_LIST_CRITERIA,
  [types.RESET_ENQUIRY_LIST_CRITERIA]: RESET_ENQUIRY_LIST_CRITERIA,
  [types.GET_ENQUIRY_INFO]: GET_ENQUIRY_INFO
}

const defaultCriteria = {
  ...defCrit,
  sidx: ['receiveTime'],
  receiveTimeStart: getLastMonthFormat(),
  receiverTimeEnd: formatDatePatternDash(new Date()),
}

export default createReducer(state, handlers)
