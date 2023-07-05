import { drop, filter, find } from 'lodash'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import { useSelector } from 'react-redux'


const DefaultDataTable = ({ columns = [], data, identity, actionsOfList }) => {
  const router = useRouter()
  const menu = useSelector(state => state.member.get('menu')?.toJS())
  //console.log('navigation', navigation, router.pathname)
  const actions = getActions(menu, router.pathname)
  //console.log('actions: ', actions)
  const renderData = drop(columns)
  //console.log('renderData: ', renderData)
  return (
    <div className='overflow-x-auto'>

      <div className='bg-white shadow-md rounded mb-6 mt-3'>
        <table className='min-w-max w-full table-auto striped'>
          <thead>
          <tr className='bg-gray-200 text-gray-600 uppercase text-sm leading-normal'>
            {columns.map((colum, idx) => (
              <th key={idx} className='py-2 px-6 text-left'>{colum.Header}</th>
            ))}
          </tr>
          </thead>
          <tbody className='text-gray-600 text-sm font-light'>

          {data?.map((item, idx) => (
            <tr key={idx} className='border-b border-gray-200 hover:bg-gray-100'>
              <td className='py-3 px-6 text-center'>
                <div className='flex items-left justify-start'>
                  {actions?.map((act, i) => {
                    if (act.url.indexOf('update') !== -1) {
                      return (
                        <Link key={i} href={`${act.url}/${item[identity]}`}>
                          <a>
                            <div className='w-4 mr-2 transform hover:text-purple-500 hover:scale-110'>
                              <FiEdit size={16} />
                            </div>
                          </a>
                        </Link>
                      )
                    }
                    if (act.url.indexOf('delete') !== -1) {
                      return (
                        <div key={i} className='w-4 mr-2 transform hover:text-purple-500 hover:scale-110'>
                          <FiTrash2 size={16} onClick={() => {
                            const action= find(actionsOfList, (a) => a.index === 'delete')
                            action.func(item[identity])
                          }}/>
                        </div>
                      )
                    }
                  })}
                </div>
              </td>
              {renderData?.map((column, j) => {
                return (
                  <td key={j} className='py-3 px-6 text-left'>
                    <span className='font-medium'>{item[column.accessor]}</span>
                  </td>
                )
              })}
            </tr>
          ))}

          </tbody>
        </table>
      </div>

    </div>
  )
}

export default DefaultDataTable


function getActions(tree, current) {

  let currentItem
  const findListActions = tree => {
    find(tree, m => {

      if (m.url === current) {
        //console.log('m', m)
        currentItem = m
      } else if (m?.children?.length > 0) {
        const target = findListActions(m.children)
        if (target) {
          currentItem = target
        }
      }
    })
  }

  findListActions(tree)

  let subItems = []
  if (currentItem?.children.length > 0) {
    return filter(currentItem.children, item => item.isListAction === true)
  }
}
