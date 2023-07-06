import { fromJS } from 'immutable'
import React from 'react'
/*import {
  FiActivity,
  FiCalendar,
  FiClock,
  FiCompass,
  FiCopy,
  FiDroplet,
  FiGrid,
  FiHelpCircle,
  FiHome,
  FiList,
  FiPieChart,
  FiShoppingCart,
  FiStar,
  FiToggleLeft,
  FiUser,
  FiUsers,
  FiShoppingBag,
  FiTrendingUp,
  FiSettings
} from 'react-icons/fi';*/
import { createReducer } from './index'

const initialState = fromJS([
  //權限管理
  {
    id: 'system_mgmt',
    name: '權限管理',
    url: '',
    isMenu: true,
    isListAction: false,
    icon: 'FiGrid',//<FiActivity size={20}/>,
    children: [
      //角色管理
      {
        id: 'role_mgmt',
        name: '權限角色管理',
        url: '/system/roles',
        isMenu: true,
        isListAction: false,
        defaultSubFunctionId: 'role_mgmt_list',
        children: [
          {
            id: 'role_mgmt_list',
            name: '角色權限列表',
            url: '/system/role/list',
            isMenu: true,
            isListAction: false,
            children: [
              {
                id: 'role_mgmt_update',
                name: '修改',
                url: '/system/role/update',
                isMenu: false,
                isListAction: true,
                children: []
              },
              {
                id: 'role_mgmt_create',
                name: '新增',
                url: '/system/role/create',
                isMenu: false,
                isListAction: false,
                children: []
              },
              {
                id: 'role_mgmt_delete',
                name: '刪除',
                url: '/system/role/delete',
                isMenu: false,
                isListAction: true,
                children: []
              }
            ]
          }
        ]
      },
      //使用者管理
      {
        id: 'admin_mgmt',
        name: '使用者管理',
        url: '/members',
        isMenu: true,
        isListAction: false,
        defaultSubFunctionId: 'admin_mgmt_list',
        children: [
          {
            id: 'admin_mgmt_list',
            name: '使用者列表',
            url: '/member/list',
            isMenu: false,
            isListAction: false,
            children: [
              {
                id: 'admin_mgmt_update',
                name: '使用者修改',
                url: '/member/update',
                isMenu: false,
                isListAction: true,
                children: []
              },
              {
                id: 'admin_mgmt_create',
                name: '使用者新增',
                url: '/member/create',
                isMenu: false,
                isListAction: false,
                children: []
              },
              {
                id: 'admin_mgmt_delete',
                name: '使用者修改',
                url: '/member/delete',
                isMenu: false,
                isListAction: true,
                children: []
              }
            ]
          }
        ]
      },
      //變更密碼
      {
        id: '/system/changePassword',
        name: '變更密碼',
        url: '/system/changePassword',
        isMenu: true,
        isListAction: false,
        //defaultSubFunctionId: 'act_mgmt_list',
        children: []
      }
    ]
  }
])


const handlers = {}

export default createReducer(initialState, handlers)
