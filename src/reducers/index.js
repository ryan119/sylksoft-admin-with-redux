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
import shipReducer from '/components/ship/reducer'
import customerReducer from '/components/customer/reducer'
import tradeMgmtReducer from '/components/tradeMgmt/reducer'
import settingMgmtReducer from '/components/setting/reducer'
import emsgMgmtReducer from '/components/emsg/reducer'
import enquiryMgmtReducer from '/components/enquiry/reducer'
import reportMgmtReducer from '/components/report/reducer'

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
  role: roleReducer,
  ship: shipReducer,
  customer: customerReducer,
  tradeMgmt: tradeMgmtReducer,
  settingMgmt: settingMgmtReducer,
  emsgMgmt: emsgMgmtReducer,
  enquiryMgmt: enquiryMgmtReducer,
  reportMgmt: reportMgmtReducer,
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
