import { fromJS } from 'immutable';
import * as actions from '../actions/actionTypes';
import { createReducer } from './index';

const types = actions

const state = fromJS({
  userData: {
    identity: null,
    password: null,
    applicationId: null,
    expireTime: null,
    token: null,
    properties: {}
  }
})

const ADMIN_USER_LOGIN = (state, {payload}) => {
  return state.update('userData', value => fromJS(payload))
}

const handlers = {
  [types.ADMIN_USER_LOGIN]: ADMIN_USER_LOGIN
}

export default createReducer(state, handlers)