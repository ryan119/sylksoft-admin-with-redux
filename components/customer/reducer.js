import { fromJS } from 'immutable';
import * as actions from 'src/actions/actionTypes';
import { defaultPage, defaultPageSize, defCrit } from 'src/base-components/react-table/constant'
import { createReducer } from 'src/reducers';

const types = actions

const state = fromJS({
  criteria: {
   ...defCrit,
    sidx: ['name'],
    sord: ['asc']
  }
})

const SEARCH_CUSTOMER = (state, { payload }) => {
  return state.update('searchResult', value => fromJS(payload))
}

const GET_CUSTOMER = (state, { payload }) => {
  console.log('payload: ', payload, fromJS(payload))
  return state.update('customerInfo', value => fromJS(payload))
}
const SET_CUSTOMER_CRITERIA = (state, { payload }) => {
  return state.updateIn(['criteria', payload.key], value => fromJS(payload.value))
}
const RESET_CUSTOMER_CRITERIA = (state, { payload }) => {
  return state.update('criteria', value => fromJS(defaultCriteria))
}


const handlers = {
  [types.SEARCH_CUSTOMER]: SEARCH_CUSTOMER,
  [types.GET_CUSTOMER]: GET_CUSTOMER,
  [types.SET_CUSTOMER_CRITERIA]: SET_CUSTOMER_CRITERIA,
  [types.RESET_CUSTOMER_CRITERIA]: RESET_CUSTOMER_CRITERIA
}

const defaultCriteria = {
  ...defCrit,
  sidx: ['name'],
  sord: ['asc']
}

export default  createReducer(state, handlers)
