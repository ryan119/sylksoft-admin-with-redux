import {combineReducers} from 'redux'
import dashboard from './dashboard'
import colors from './colors'
import config from './config'
import leftSidebar from './left-sidebar'
import palettes from './palettes'
import navigation from './navigation'
import member from './member'
import common from './common'
import user from './user'
import roleReducer from '/src/base-components/role/reducer'

export default combineReducers({
  dashboard,
  navigation,
  colors,
  config,
  leftSidebar,
  palettes,
  member,
  common,
  user,
  role: roleReducer
})

export function createReducer(initialState, actionHandler) {
  return (state = initialState, action) => {
    const reduceFn = actionHandler[action.type]
    if (reduceFn) {
      return reduceFn(state, action)
    } else {
      return state
    }
  }
}
