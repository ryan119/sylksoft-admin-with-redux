import { fromJS } from 'immutable';
import * as actions from 'src/actions/actionTypes';
import { createReducer } from 'src/reducers';

const types = actions

const state = fromJS({
  criteria: {
    page: 1,
    size: 25,
    sidx: ['createTime'],
    sord: ['desc']
  }
})

const SEARCH_ROLE_RESULT = (state, {payload}) => {
  return state.update('searchResult', value => fromJS(payload))
}

const GET_ROLE = (state, {payload}) => {
  return state.update('roleData', value => fromJS(payload))
}

const GET_ALL_FUNCTIONS = (state, {payload}) => {
  return state.update('allFunctions', value => fromJS(payload))
}

const handlers = {
  [types.SEARCH_ROLE_RESULT]: SEARCH_ROLE_RESULT,
  [types.GET_ROLE]: GET_ROLE,
  [types.GET_ALL_FUNCTIONS]: GET_ALL_FUNCTIONS,
}

export default createReducer(state, handlers)
