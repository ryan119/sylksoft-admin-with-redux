import { fromJS } from 'immutable'
import * as actions from '../actions/actionTypes';
import { createReducer } from './index';

const types = actions

const state = fromJS({
  showButtonText: true,
  showSectionTitle: true,
  showLogo: true,
  showCard: true,
  showAccountLinks: false,
  showProjects: true,
  showTags: true,
  card: 1
})

const SET_LEFT_SIDEBAR_CONFIG = (state, action) => {
  return state.update(action.key, value => fromJS(action.value) )
}

const handlers = {
  [types.SET_LEFT_SIDEBAR_CONFIG]: SET_LEFT_SIDEBAR_CONFIG
}

export default createReducer(state, handlers)

