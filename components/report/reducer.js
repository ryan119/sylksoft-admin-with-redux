import { fromJS } from 'immutable'
import * as actions from 'src/actions/actionTypes'
import { formatDatePatternDash, getNumOfPastYearsFormat } from 'src/functions/date-format'
import { createReducer } from 'src/reducers'

export const defaultCriteria = {
  dateStart: getNumOfPastYearsFormat(10),
  dateEnd: formatDatePatternDash(new Date())
}

const types = actions

const state = fromJS({
  spCrit: {
    ...defaultCriteria
  },
  spDataset: [],
  evCrit: {
    ...defaultCriteria
  },
  evDataset: [],
  demolitionCrit: {
    ...defaultCriteria
  },
  demolitionDataset: [],
  estCrit: {
    ...defaultCriteria
  },
  estDataset: []
})


const SET_RPT_SP_CRITERIA = (state, { payload }) => {
  return state.updateIn(['spCrit', payload.key], () => fromJS(payload.value))
}
const RESET_PRT_SP_CRITERIA = (state, { payload }) => {
  return state.update('spCrit', () => fromJS(payload))
}

const SET_SP_DATASET = (state, { payload }) => {
  return state.update('spDataset', () => fromJS(payload))
}

//RPT EV
const SET_RPT_EV_CRITERIA = (state, { payload }) => {
  return state.updateIn(['evCrit', payload.key], () => fromJS(payload.value))
}

const RESET_RPT_EV_CRITERIA = (state, { payload }) => {
  return state.update('evCrit', () => fromJS(payload))
}

const SET_EV_DATASET = (state, { payload }) => {
  return state.update('evDataset', () => fromJS(payload))
}

//RPT Demolition
const SET_RPT_DEMOLITION_CRIT = (state, { payload }) => {
  return state.updateIn(['demolitionCrit', payload.key], () => fromJS(payload.value))
}

const RESET_RPT_DEMOLITION_CRIT = (state, { payload }) => {
  return state.update('demolitionCrit', () => fromJS(payload))
}

const SET_DEMOLITION_DATASET = (state, { payload }) => {
  return state.update('demolitionDataset', () => fromJS(payload))
}

//RPT Est
const SET_RPT_EST_CRITERIA = (state, { payload }) => {
  return state.updateIn(['estCrit', payload.key], () => fromJS(payload.value))
}

const RESET_RPT_EST_CRITERIA = (state, { payload }) => {
  return state.update('estCrit', () => fromJS(payload))
}

const SET_EST_DATASET = (state, { payload }) => {
  return state.update('estDataset', () => fromJS(payload))
}


const handlers = {
  [types.SET_RPT_SP_CRITERIA]: SET_RPT_SP_CRITERIA,
  [types.RESET_PRT_SP_CRITERIA]: RESET_PRT_SP_CRITERIA,
  [types.SET_SP_DATASET]: SET_SP_DATASET,

  [types.SET_RPT_EV_CRITERIA]: SET_RPT_EV_CRITERIA,
  [types.RESET_RPT_EV_CRITERIA]: RESET_RPT_EV_CRITERIA,
  [types.SET_EV_DATASET]: SET_EV_DATASET,

  [types.SET_RPT_DEMOLITION_CRIT]: SET_RPT_DEMOLITION_CRIT,
  [types.RESET_RPT_DEMOLITION_CRIT]: RESET_RPT_DEMOLITION_CRIT,
  [types.SET_DEMOLITION_DATASET]: SET_DEMOLITION_DATASET,

  [types.SET_RPT_EST_CRITERIA]: SET_RPT_EST_CRITERIA,
  [types.RESET_RPT_EST_CRITERIA]: RESET_RPT_EST_CRITERIA,
  [types.SET_EST_DATASET]: SET_EST_DATASET
}



export default createReducer(state, handlers)
