import { fromJS } from 'immutable'
import * as actions from '../actions/actionTypes'
import { createReducer } from './index'

const types = actions

const state = fromJS({
  background: 'light',
  leftSidebar: 'gray',
  navbar: 'light',
  rightSidebar: 'light',
})

const SET_PALETTE = (state, action) => {
  //return fromJS({...state.toJS(), ...action.palette})
  return state
}

const RESET_PALETTES = (state, action) => {
  return state.update(action.key, (value) => fromJS(action.value))
}

const handlers = {
  [types.SET_PALETTE]: SET_PALETTE,
  [types.RESET_PALETTES]: RESET_PALETTES,
}

export default createReducer(state, handlers)

/*
export default function palettes(
  state = fromJS({
    background: 'light',
    leftSidebar: 'light',
    navbar: 'light',
    rightSidebar: 'light'
  }),
  action
) {
  switch (action.type) {
    case 'SET_PALETTE':
      return {
        ...state,
        ...action.palette
      }
    case 'RESET_PALETTES':
      return {
        background: 'light',
        leftSidebar: 'light',
        navbar: 'light',
        rightSidebar: 'light'
      }
    default:
      return state
  }
}
*/
