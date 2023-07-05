import React from 'react'
import { FiBox, FiMenu } from 'react-icons/fi'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import Link from 'next/link'

const Logo = () => {
  const dispatch = useDispatch()
  const { config, leftSidebar } = useSelector(
    (state) => ({
      config: state.config.toJS(),
      leftSidebar: state.leftSidebar.toJS(),
    }),
    shallowEqual
  )
  const { name, collapsed } = { ...config }
  const { showLogo } = { ...leftSidebar }
  const style1 = {
    color: '#0d9488',
  }
  //console.log('showLogo:' , showLogo)
  if (showLogo) {
    return (
      <div className="logo truncate">
        <Link href="/">
          <a className="flex flex-row items-center justify-start space-x-4">
            {/*<img src="/static/d-board-logo.png"/>*/}
            {/*<FiBox size={28} />
            <span>{name}</span>*/}
            <img src="/logos/maxmart-icon-new.png" width={28} height={28} />
            <span style={style1}>{name}</span>
          </a>
        </Link>
        <button
          onClick={() =>
            dispatch({
              type: 'SET_CONFIG_KEY',
              key: 'collapsed',
              value: !collapsed,
            })
          }
          className="ml-auto mr-4 block lg:hidden"
        >
          <FiMenu size={20} />
        </button>
      </div>
    )
  }
  return null
}

export default Logo
