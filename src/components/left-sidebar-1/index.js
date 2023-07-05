import React from 'react'
import { useSelector } from 'react-redux'
import Item from './item'
import Logo from './logo'

const LeftSidebar = () => {

  const { navigation, menu } = useSelector(state => {
    //console.log('state: ', state.member.toJS().navigation)
    return {
      navigation: state.navigation.toJS(),
      menu: state.member.get('menu')?.toJS(),
    }
  })

  //console.log('navigation: ', navigation)
  const menuTree = [
    {
      name: '',
      children: menu && [...menu] || []
    }
  ]
  //console.log('menuTree: ', menu)
  return (
    <div className='left-sidebar left-sidebar-1'>
      <Logo />
      {menuTree?.map((menuItem, i) => (
        <React.Fragment key={i}>
          {/*<Title>{menuItem.name}</Title>*/}
          <ul>
            {menuItem.children.map((l0, a) => (
              <li key={a} className='l0'>
                { l0.isMenu && <Item {...l0} /> }
                {l0.defaultSubFuncId ? undefined
                  :
                  <ul>
                    {l0.children.map((l1, b) => (
                      <li key={b} className='l1'>
                        { l1.isMenu && <Item {...l1} /> }
                        {l1.defaultSubFuncId ? undefined
                          :
                          <ul>
                            {l1.children.map((l2, c) => (
                              <li key={c} className='l2'>
                                { l2.isMenu && <Item {...l2} /> }
                                {l2.defaultSubFuncId ? undefined
                                  :
                                  <ul>
                                    {l2.children.map((l3, d) => (
                                      <li key={d} className='l3'>
                                        { l3.isMenu && <Item {...l3} /> }
                                        { l3.defaultSubFuncId ? undefined
                                          :
                                          <ul>
                                            {l3.children.map((l4, e) => (
                                              <li key={e} className='l4'>
                                                <Item {...l4} />
                                              </li>
                                            ))}
                                          </ul>
                                        }
                                      </li>
                                    ))}
                                  </ul>
                                }
                              </li>
                            ))}
                          </ul>
                        }
                      </li>
                    ))}
                  </ul>
                }
              </li>
            ))}
          </ul>

        </React.Fragment>
      ))}
    </div>
  )
}

export default LeftSidebar
