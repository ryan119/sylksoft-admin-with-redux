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
    yearStart: getLastMonthFormat(),
    yearEnd: formatDatePatternDash(new Date())
  }
})

const SEARCH_EMSG = (state, { payload }) => {
  return state.update('searchResult', value => fromJS(payload))
}

const GET_EMSG_INFO = (state, { payload }) => {
  return state.update('emsgInfo', value => fromJS(payload))
}

const SET_EMSG_CRITERIA = (state, { payload }) => {
  return state.updateIn(['criteria', payload.key], value => fromJS(payload.value))
}

const RESET_EMSG_CRITERIA = (state, { payload }) => {
  return state.update('criteria', value => fromJS(defaultCriteria))
}

const handlers = {
  [types.SEARCH_EMSG]: SEARCH_EMSG,
  [types.SET_EMSG_CRITERIA]: SET_EMSG_CRITERIA,
  [types.RESET_EMSG_CRITERIA]: RESET_EMSG_CRITERIA,
  [types.GET_EMSG_INFO]: GET_EMSG_INFO
}

const defaultCriteria = {
  ...defCrit,
  sidx: ['receiveTime'],
  yearStart: getLastMonthFormat(),
  yearEnd: formatDatePatternDash(new Date())
}

export default createReducer(state, handlers)
