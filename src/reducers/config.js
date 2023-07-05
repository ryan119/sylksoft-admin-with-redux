import { fromJS, Map } from 'immutable'
import * as actions from '../actions/actionTypes';
import { APP_NAME } from '../conf';
import { createReducer } from './index';

const types = actions

const state = fromJS({
  name: APP_NAME,
  description: 'Admin Console',
  url: 'https://wc-admin2.sylksoft.com',
  layout: 'layout-1',
  collapsed: false,
  rightSidebar: false,
  backdrop: false
})

const SET_CONFIG = (state, action) => {
  console.log('state: ', ...state)
  return fromJS({...state.toJS(), ...action.config})
}

const SET_CONFIG_KEY = (state, action) => {
  console.log('action: ', action, 'state: ', state)
  return state.update(action.key, value => fromJS(action.value) )
}

const handlers = {
  [types.SET_CONFIG]: SET_CONFIG,
  [types.SET_CONFIG_KEY]: SET_CONFIG_KEY
}

export default createReducer(state, handlers)
