import { fromJS } from 'immutable'
import * as actions from '../actions/actionTypes';
import { createReducer } from './index';

const types = actions

const state = fromJS({
  value: 0,
  conversions: {}
})

const SET_DASHBOARD = (state, {action , payload}) => {
  state.update(action.key, value => fromJS(action.value) )
}

const handlers = {
  [types.SET_DASHBOARD]: SET_DASHBOARD
}

export default createReducer(state, handlers)

