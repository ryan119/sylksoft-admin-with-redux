import { fromJS } from 'immutable';
import React from 'react';
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
import { createReducer } from './index';

const initialState = fromJS([
  //權限管理
  {
    id: 'system_mgmt',
    name: '權限管理',
    url: '',
    isMenu: true,
    isListAction: false,
    icon: 'FiGrid',//<FiActivity size={20}/>,
    children:[
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
                children: [],
              },
              {
                id: 'role_mgmt_create',
                name: '新增',
                url: '/system/role/create',
                isMenu: false,
                isListAction: false,
                children: [],
              },
              {
                id: 'role_mgmt_delete',
                name: '刪除',
                url: '/system/role/delete',
                isMenu: false,
                isListAction: true,
                children: [],
              },
            ],
          },
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
                children: [],
              },
              {
                id: 'admin_mgmt_create',
                name: '使用者新增',
                url: '/member/create',
                isMenu: false,
                isListAction: false,
                children: [],
              },
              {
                id: 'admin_mgmt_delete',
                name: '使用者修改',
                url: '/member/delete',
                isMenu: false,
                isListAction: true,
                children: [],
              },
            ],
          },
        ],
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
  },
  //客戶資料管理
  {
    id: 'customer_mgmt',
    name: '客戶資料管理',
    url: '',
    isMenu: true,
    isListAction: false,
    icon: 'FiUsers',//<FiActivity size={20}/>,
    defaultSubFunctionId: 'customer_mgmt_list',
    children:[
      //客戶管理
      {
        id: 'customer_mgmt_list',
        name: '客戶資料列表',
        url: '/customer/list',
        isMenu: false,
        isListAction: false,
        children: [
          {
            id: 'customer_mgmt_update',
            name: '客戶資料修改',
            url: '/customer/update',
            isMenu: false,
            isListAction: true,
            children: [],
          },
          {
            id: 'customer_mgmt_create',
            name: '客戶資料新增',
            url: '/customer/create',
            isMenu: false,
            isListAction: false,
            children: [],
          },
        ],
      }
    ]
  },

  //船舶管理
  {
    id: 'ship_mgmt',
    name: '船舶管理',
    url: '',
    isMenu: true,
    isListAction: false,
    icon: 'FiCompass',//<FiActivity size={20}/>,
    children:[
      //船舶資料管理
      {
        id: 'ship_mgmt',
        name: '船舶資料管理',
        url: '',
        isMenu: true,
        isListAction: false,
        defaultSubFunctionId: 'ship_mgmt_list',
        children: [
          {
            id: 'ship_mgmt_list',
            name: '船舶資料列表',
            url: '/ship/list',
            isMenu: false,
            isListAction: false,
            children: [
              {
                id: 'ship_mgmt_update',
                name: '船舶資料修改',
                url: '/ship/update',
                isMenu: false,
                isListAction: true,
                children: [],
              },
              {
                id: 'ship_mgmt_create',
                name: '船舶資料新增',
                url: '/ship/create',
                isMenu: false,
                isListAction: false,
                children: [],
              },
            ],
          }
        ]
      },
      {
        id: 'ship_setting_mgmt',
        name: '船舶參數設定',
        url: '/ship/settings',
        isMenu: true,
        isListAction: false,
        defaultSubFunctionId: 'ship_setting_mgmt_list',
        children: [
          {
            id: 'ship_setting_mgmt_list',
            name: '船舶參數設定列表',
            url: '/ship/setting/list',
            isMenu: false,
            isListAction: false,
            children: [
              {
                id: 'ship_setting_mgmt_update',
                name: '參數設定修改',
                url: '/ship/setting/update',
                isMenu: false,
                isListAction: true,
                children: [],
              },
              {
                id: 'ship_setting_mgmt_create',
                name: '參數設定新增',
                url: '/ship/setting/create',
                isMenu: false,
                isListAction: false,
                children: [],
              },
            ],
          }
        ]
      },
    ]
  },

  //電文管理
  {
    id: 'emsg_mgmt',
    name: '電文管理',
    url: '',
    isMenu: true,
    isListAction: false,
    icon: 'FiActivity',//<FiActivity size={20}/>,
    children:[
      //船舶資料管理
      {
        id: 'emsg_mgmt_record',
        name: '電文記錄',
        url: '',
        isMenu: true,
        isListAction: false,
        defaultSubFunctionId: 'emsg_mgmt_list',
        children: []
      },
      {
        id: 'emsg_mgmt_pending',
        name: '待處理電文記錄',
        url: '',
        isMenu: true,
        isListAction: false,
        defaultSubFunctionId: 'email_mgmt_list',
        children: []
      },
      {
        id: 'emsg_mgmt_specify',
        name: '指定船舶業務電文',
        url: '',
        isMenu: true,
        isListAction: false,
        defaultSubFunctionId: 'email_mgmt_list',
        children: []
      },
      {
        id: 'emsg_mgmt_range',
        name: '指定範圍業務電文',
        url: '',
        isMenu: true,
        isListAction: false,
        defaultSubFunctionId: 'email_mgmt_list',
        children: []
      },
    ]
  },

  //業務機會管理
  {
    id: 'oppo_mgmt',
    name: '業務機會管理',
    url: '',
    isMenu: true,
    isListAction: false,
    icon: 'FiSend',
    defaultSubFunctionId: 'oppo_mgmt_list',
    children:[
      {
        id: 'oppo_mgmt_list',
        name: '業務機會列表',
        url: '',
        isMenu: false,
        isListAction: false,
        children: [],
      }
    ]
  },

  //成交行情管理
  {
    id: 'trade_mgmt',
    name: '成交行情管理',
    url: '',
    isMenu: true,
    isListAction: false,
    icon: 'FiRadio',
    defaultSubFunctionId: 'trade_mgmt_list',
    children:[
      {
        id: 'trade_mgmt_list',
        name: '成交行情',
        url: '',
        isMenu: false,
        isListAction: false,
        children: [],
      }
    ]
  },

  //報表管理
  {
    id: 'report_mgmt',
    name: '報表管理',
    url: '',
    isMenu: true,
    isListAction: false,
    icon: 'FiDatabase',//<FiActivity size={20}/>,
    children:[
      //船舶資料管理
      {
        id: 'report_mgmt_1',
        name: '船舶估價金額走勢圖',
        url: '',
        isMenu: true,
        isListAction: false,
        children: []
      },
      {
        id: 'report_mgmt_2',
        name: '船舶成交價格走勢圖',
        url: '',
        isMenu: true,
        isListAction: false,
        children: []
      },
      {
        id: 'report_mgmt_3',
        name: '船舶範圍估價金額走勢圖',
        url: '',
        isMenu: true,
        isListAction: false,
        children: []
      },
    ]
  },

  //參數設定
  {
    id: 'system_setting_mgmt',
    name: '參數設定',
    url: '',
    isMenu: true,
    isListAction: false,
    icon: 'FiSettings',
    children:[
      //客戶管理
      {
        id: 'system_setting_mgmt_list',
        name: '系統參數設定',
        url: '',
        isMenu: true,
        isListAction: false,
        children: [],
      },
      {
        id: 'system_setting_mgmt_other',
        name: '其他功能',
        url: '',
        isMenu: true,
        isListAction: false,
        children: [],
      }
    ]
  },
])



const handlers = {

}

export default createReducer(initialState, handlers)
