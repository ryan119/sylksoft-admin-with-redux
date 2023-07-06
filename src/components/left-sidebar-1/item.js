import { find, forEach } from 'lodash'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import {
  FiActivity, FiAnchor,
  FiChevronRight, FiCompass, FiDatabase, FiDroplet,
  FiFileText, FiGrid,
  FiList, FiRadio, FiSend, FiServer,
  FiSettings,
  FiShoppingBag,
  FiTrendingUp,
  FiUser,
  FiUsers
} from 'react-icons/fi'
import { useSelector } from 'react-redux';

/**
 *
 * @param url
 * @param icon
 * @param name
 * @param badge
 * @param children
 * @param isMenu
 * @param isListAction
 * @param defaultSubFunctionId
 * @param id
 * @returns {JSX.Element}
 * @constructor
 */
const Item = ({ url, icon='FiList', name, badge, children, isMenu, isListAction, defaultSubFuncId, id }) => {
  const fun = find(children, (c) => c.id === defaultSubFuncId)
  const [hidden, setHidden] = useState(true)
  const router = useRouter()
  let { pathname } = { ...router }
  const navigation = useSelector(state => state.member.get('menu')?.toJS())

  let active = pathname === url
  if (pathname === '/' && url === '/dashboard') {
    active = true
  }
  if (pathname === '/' && url !== '/dashboard') {
    active = false
  }

  //console.log('defaultSubFunctionId: ', defaultSubFunctionId)
  /*const dynamicIcon = import('react-icons/fi')
  console.log('dy: ', dynamicIcon)
  const Icondddd = () => { return dynamicIcon.then(d => { return d['FiUsers']}) }*/


  const activeNode = findActiveNode(navigation, pathname)

  active = activeNode.length > 0 ? activeNode.includes(id) : fun && fun.url === pathname ? true : pathname === url
  if (defaultSubFuncId || children.length === 0) {
    return (
      <Link href={fun ? fun.url : url}>
        <a className={`left-sidebar-item ${active ? 'active' : ''}`}>
          {icon && iconMap[icon]}
          <span className="title">{name}</span>
          {badge && <span className={`badge badge-circle badge-sm ${badge.color}`}>{badge.text}</span>}
        </a>
      </Link>
    )
  }

  return (
    <button
      onClick={() => setHidden(!hidden)}
      className={`left-sidebar-item ${active ? 'active' : ''} ${hidden ? 'hidden-sibling' : 'open-sibling'}`}
    >
      {icon && iconMap[icon] }
      <span className="title">{name}</span>
      {badge && <span className={`badge badge-circle badge-sm ${badge.color}`}>{badge.text}</span>}
      <FiChevronRight className="ml-auto arrow"/>
    </button>
  )
}

export default Item

const iconMap = {
  FiUser: <FiUser size={20}/>,
  FiUsers: <FiUsers size={20}/>,
  FiAnchor: <FiAnchor size={20}/>,
  FiActivity: <FiActivity size={20}/>,
  FiShoppingBag: <FiShoppingBag size={20}/>,
  FiTrendingUp: <FiTrendingUp size={20}/>,
  FiSettings: <FiSettings size={20}/>,
  FiFileText: <FiFileText size={20}/>,
  FiGrid: <FiGrid size={20}/>,
  FiCompass: <FiCompass size={20}/>,
  FiRadio: <FiRadio size={20}/>,
  FiSend: <FiSend size={20}/>,
  FiDatabase: <FiDatabase size={20}/>,
  FiList: <FiList size={20}/>,
  FiServer: <FiServer size={20}/>,
  FiDroplet: <FiDroplet size={20}/>
}

const findActiveNode = (tree, current) => {
  const lastNo = current.lastIndexOf('/')
  const cUrl = current.substring(0, lastNo)
  let parentTree = []
  const findListAction = node => {
    let currentItem = undefined
    forEach(node, m => {
      if (m.url === cUrl) {
        currentItem = m
      } else if (m?.children?.length > 0) {
        const target = findListAction(m.children)
        if (target) {
          parentTree.push(m.id)
          currentItem = target
        }
      }
    })
    return currentItem
  }
  const cur = findListAction(tree)
  return parentTree
}
