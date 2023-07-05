import { dropRight, find } from 'lodash'
import { useRouter } from 'next/router'
import React, { Children, cloneElement } from 'react'

const StaticTable = ({ actionsOfList, children, columns, data }) => {
  const router = useRouter()
  const renderData = children ? dropRight(columns) : columns

  const mapChildren = (item) => {
    return Children.map(children, (child, idx) => {
      const action = find(actionsOfList, (a) => a.index === child.props.id)
      //console.log('action: ', action)
      const disabled = action.checkDisable && action?.checkDisable(item)
      //console.log('mapChildren: ', item , disabled)
      return cloneElement(child, {
        disabled: disabled,
        onClick: () => action.func(item)
      })
    })
  }

  return (
    <div className='w-full overflow-x-scroll '>

      <div className='bg-white shadow-md rounded mb-3 mt-3 '>
        <table className='table striped' data-background='light'>
          <thead>
          <tr className='bg-gray-300 text-gray-600 uppercase text-base leading-normal'>
            {columns.map((colum, idx) => {
              return (
                <th key={idx} className='py-2 px-6 text-left'>{colum.Header}</th>
              )
            })}
          </tr>
          </thead>
          <tbody className='text-gray-600 text-base font-light'>
          { data?.length > 0 ? data?.map((item, idx) => (
            <tr key={idx} className='border-b border-gray-200'>
              { renderData?.map((column, j) => {
                return (
                  <td key={j} className='py-3 px-6 text-left'>
                    <span className='font-medium'>{item[column.accessor]}</span>
                  </td>
                )
              })}

              {children ? (
                <td className='py-3 px-6 text-center'>
                  <div className='flex items-right justify-center'>
                    {children && mapChildren(item)}
                  </div>
                </td>
              ) : undefined}
            </tr>
          )) : (<tr><td className='py-3 px-6 text-left' colSpan={columns.length}>無資料</td></tr>)}

          </tbody>
        </table>
      </div>

    </div>
  )
}

export default StaticTable
