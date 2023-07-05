import { fromJS } from 'immutable';
import { defCrit } from 'src/base-components/react-table/constant'
import * as actions from '../actions/actionTypes';
import { createReducer } from './index';

const types = actions

const state = fromJS({
  criteria: {
    ...defCrit
  },
})

const _SET_AUTH_DATA = (state, {payload}) => {
  return state.update('authData', value => fromJS(payload))
}
const _GET_MENU = (state, {payload}) => {
  return state.update('menu', value => fromJS(payload))
}
const SEARCH_USER = (state, {payload}) => {
  return state.update('searchResult', value => fromJS(payload))
}
const SET_USER_CRITERIA = (state, {payload}) => {
  return state.updateIn(['criteria', payload.key], () => fromJS(payload.value))
}
const RESET_USER_CRITERIA = (state, { payload }) => {
  return state.update('criteria', () => fromJS(defaultCriteria))
}
const GET_USER_INFO = (state, { payload }) => {
  return state.update('userInfo', () => fromJS(payload))
}

const handlers = {
  [types.SET_AUTH_DATA]: _SET_AUTH_DATA,
  [types.GET_MENU]: _GET_MENU,
  [types.SEARCH_USER]: SEARCH_USER,
  [types.SET_USER_CRITERIA]: SET_USER_CRITERIA,
  [types.RESET_USER_CRITERIA]: RESET_USER_CRITERIA,
  [types.GET_USER_INFO]: GET_USER_INFO
}
export default createReducer(state, handlers)

const defaultCriteria = {
  ...defCrit
}
