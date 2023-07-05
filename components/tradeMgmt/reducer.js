import { fromJS } from 'immutable'
import * as actions from 'src/actions/actionTypes'
import { formatDatePatternDash, getLastMonthFormat } from 'src/functions/date-format'
import { createReducer } from 'src/reducers'
import { defaultPage, defaultPageSize, defCrit } from 'src/base-components/react-table/constant'

const types = actions

const state = fromJS({
  estCriteria: {
    ...defCrit,
    estDateStart: getLastMonthFormat(),
    estDateEnd:formatDatePatternDash(new Date()),
    sidx: ['estDate']
  },

  traCriteria: {
    ...defCrit,
    soldDateStart: getLastMonthFormat(),
    soldDateEnd:formatDatePatternDash(new Date()),
    sidx: ['soldDate']
  },

  vesselEstCriteria: {
    ...defCrit,
    sidx: ['estDate']
  },

  demoCrit: {
    ...defCrit,
    soldDateStart: getLastMonthFormat(),
    soldDateEnd:formatDatePatternDash(new Date()),
    sidx: ['soldDate']
  }
})

const SEARCH_TRADE = (state, { payload }) => {
  return state.update('searchResult', value => fromJS(payload))
}

const SET_TRADE_CRITERIA = (state, { payload }) => {
  return state.updateIn(['traCriteria', payload.key], value => fromJS(payload.value))
}

const RESET_TRADE_CRITERIA = (state, { payload }) => {
  return state.update('traCriteria', value => fromJS(defaultCriteria))
}

const SEARCH_ESTIMATE = (state, { payload }) => {
  return state.update('searchResult', value => fromJS(payload))
}

const SET_ESTIMATE_CRITERIA = (state, { payload }) => {
  return state.updateIn(['estCriteria', payload.key], value => fromJS(payload.value))
}

const RESET_ESTIMATE_CRITERIA = (state, { payload }) => {
  return state.update('estCriteria', value => fromJS({ ...defCrit,estDateStart: getLastMonthFormat(),
    estDateEnd:formatDatePatternDash(new Date()),sidx: ['estDate'] }))
}

const SEARCH_VESSEL_EST = (state, { payload }) => {
  return state.update('searchResult', value => fromJS(payload))
}

const SET_VESSEL_EST_CRITERIA = (state, { payload }) => {
  return state.updateIn(['vesselEstCriteria', payload.key], value => fromJS(payload.value))
}

const RESET_VESSEL_EST_CRITERIA = (state, { payload }) => {
  return state.update('vesselEstCriteria', value => fromJS({ ...defCrit, sidx: ['estDate'] }))
}
const GET_VESSEL_EST = (state, { payload }) => {
  return state.update('vesselEstInfo', value => fromJS(payload))
}

const SEARCH_DEMOLITION = (state, { payload }) => {
  return state.update('searchResult', () => fromJS(payload))
}
const SET_DEMO_CRIT = (state, { payload }) => {
  return state.updateIn(['demoCrit', payload.key], () => fromJS(payload.value))
}
const RESET_DEMO_CRIT = (state, { payload }) => {
  return state.update('demoCrit', () => fromJS(defaultCriteria))
}

const handlers = {
  [types.SEARCH_TRADE]: SEARCH_TRADE,
  [types.SET_TRADE_CRITERIA]: SET_TRADE_CRITERIA,
  [types.RESET_TRADE_CRITERIA]: RESET_TRADE_CRITERIA,
  [types.SEARCH_ESTIMATE]: SEARCH_ESTIMATE,
  [types.SET_ESTIMATE_CRITERIA]: SET_ESTIMATE_CRITERIA,
  [types.RESET_ESTIMATE_CRITERIA]: RESET_ESTIMATE_CRITERIA,
  [types.SEARCH_VESSEL_EST]: SEARCH_VESSEL_EST,
  [types.SET_VESSEL_EST_CRITERIA]: SET_VESSEL_EST_CRITERIA,
  [types.RESET_VESSEL_EST_CRITERIA]: RESET_VESSEL_EST_CRITERIA,
  [types.GET_VESSEL_EST]: GET_VESSEL_EST,
  [types.SEARCH_DEMOLITION]: SEARCH_DEMOLITION,
  [types.SET_DEMO_CRIT]: SET_DEMO_CRIT,
  [types.RESET_DEMO_CRIT]: RESET_DEMO_CRIT
}


const defaultCriteria = {
  ...defCrit,
  soldDateStart: getLastMonthFormat(),
  soldDateEnd:formatDatePatternDash(new Date()),
  sidx: ['soldDate']
}

export default createReducer(state, handlers)
