import { filter, find } from 'lodash'
import Link from 'next/link'
import React, { Children, cloneElement, useMemo } from 'react'
import {
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
  FiChevronUp,
  FiEdit
} from 'react-icons/fi'
import { useTable, usePagination, useSortBy, useRowSelect } from 'react-table'
import { setLoading } from 'src/actions/common'
import Spinner from 'src/base-components/spinner'

export const Paginated = ({
                            columns,
                            data,
                            hiddenColumns = [],
                            setRowSelect = undefined,
                            fixed = false,
                            disableFunc = false,
                            actionsOfList,
                            indexId,
                            children,
                            isLoading=false
                          }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        pageSize: 25,
        hiddenColumns: hiddenColumns,
        sortBy: []
      }
    },
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      !disableFunc && hooks.visibleColumns.push((columns) => [
        {
          id: 'actions',
          Header: () => (<div>功能</div>),
          Cell: ({ row }) => {
            const mapChildren = (item) => {
              return Children.map(children, (child, idx) => {
                const action = find(actionsOfList, (a) => a.index === child.props.id)
                return cloneElement(child, {
                  onClick: () => action.func(item)
                })
              })
            }

            return (
              <> {children ? (
                <div className='flex'>{mapChildren(row.values)}</div>
              ) : (
                <div className='flex items-left justify-start'>
                  {actions?.map((item, i) => {
                    //console.log('item: ', item)
                    if (item.url.indexOf('update') !== -1) {
                      return (
                        <Link key={i} href={`${item.url}/${row.values[indexId]}`}>
                          <a>
                            <div className='w-4 mr-2 transform hover:text-purple-500 hover:scale-110'>
                              <FiEdit size={18} />
                            </div>
                          </a>
                        </Link>
                      )
                    }
                    /*if (item.url.indexOf('delete') !== -1) {
                      return (
                        <div key={i} className='w-4 mr-2 transform hover:text-purple-500 hover:scale-110'>
                          <FiTrash2 size={16} onClick={() => {
                            const action = find(actionsOfList, (a) => a.index === 'delete')
                            action.func(row.values[indexId])
                          }} />
                        </div>
                      )
                    }*/
                  })}
                </div>
              )}
              </>
            )
          }
        },
        ...columns
      ])

      //如有定義setRowSelect
      if (typeof setRowSelect === 'function') {
        hooks.visibleColumns.push((columns) => [
          {
            id: 'selection',
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <>
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
              </>
            ),
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }) => (
              <>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </>
            )
          },
          ...columns
        ])
      }
      fixed && hooks.getCellProps.push((props, { cell }) => [
        props,
        {
          style: {
            whiteSpace: 'normal'
          }
        }
      ])
      fixed && hooks.getHeaderProps.push((props, { column }) => {
        if (column.fixed) {
          return [
            props,
            {
              style: {
                width: `${column.totalWidth}px`
              }
            }
          ]
        } else {
          return [props]
        }
      })
    }
  )

  const { pageIndex, pageSize } = state

  return (
    <>
      <Spinner isLoading={isLoading} loadingClassName=''>
      <table {...getTableProps()} className='table striped'>
        <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())} nowrap='nowrap'>
                <div className='flex flex-row items-center justify-self-start'>
                  <span>{column.render('Header')}</span>
                  <span className='ml-auto'>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <FiChevronDown className='stroke-current text-2xs' />
                        ) : (
                          <FiChevronUp className='stroke-current text-2xs' />
                        )
                      ) : (
                        ''
                      )}
                    </span>
                </div>
              </th>
            ))}
          </tr>
        ))}
        </thead>
        <tbody {...getTableBodyProps()}>
        {page.map((row) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()} title={row.values[indexId]}>
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                )
              })}
            </tr>
          )
        })}
        </tbody>
      </table>
      {pageOptions.length > 0 ?
        (
          <div className='lg:flex flex-row items-center lg:justify-between my-4'>
            <div className='flex lg:flex-wrap items-center lg:justify-start justify-center space-x-2 pagination'>
              {/*{pageIndex !== 0 && (*/}
                <button
                  className='btn btn-default btn-rounded btn-icon bg-transparent hover:bg-blue-50 text-blue-500 hover:text-blue-600 btn-raised'
                  onClick={() => {
                    gotoPage(0)
                  }}
                  disabled={!canPreviousPage}
                >
                  <FiChevronsLeft className='stroke-current text-xl' />
                  {/*{'<<'}*/}
                </button>
              {/*)}*/}

              {/*{canPreviousPage && (*/}
                <button
                  className='btn btn-default btn-rounded btn-icon bg-transparent hover:bg-blue-50 text-blue-500 hover:text-blue-600 btn-raised'
                  onClick={() => previousPage()} disabled={!canPreviousPage}>
                  <FiChevronLeft className='stroke-current text-xl' />
                  {/*{'<'}*/}
                </button>

              {/*)}*/}

              {/*{canNextPage && (*/}
                <button
                  className='btn btn-default btn-rounded btn-icon bg-transparent hover:bg-blue-50 text-blue-500 hover:text-blue-600 btn-raised'
                  onClick={() => {
                    nextPage()
                  }} disabled={!canNextPage}>
                  <FiChevronRight className='stroke-current text-xl' />
                  {/*{'>'}*/}
                </button>
              {/*)}*/}

              {/*{pageIndex !== pageCount - 1 && (*/}
                <button
                  className='btn btn-default btn-rounded btn-icon bg-transparent hover:bg-blue-50 text-blue-500 hover:text-blue-600 btn-raised'
                  onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                  <FiChevronsRight className='stroke-current text-xl' />
                  {/*{'>>'}*/}
                </button>
              {/*)}*/}
            </div>
            <div className='flex lg:flex-wrap items-center lg:justify-start justify-center space-x-2 pagination'>
              <span className='py-4 lg:py-0'>
                Page{' '}
                <b>
                  {pageIndex + 1} of {pageOptions.length}
                </b>{' '}
              </span>
            </div>

            {/*<div
                className='h-0 flex lg:flex-wrap lg:h-8 items-center lg:justify-start justify-center space-x-2 pagination'>
                <span className='invisible lg:visible py-4 lg:py-0'>
                | Go to page : {' '}
                  <select
                    style={{
                      maxHeight: '300px !important',
                      overflowY: 'auto !important'
                    }}
                    className='form-select text-sm bg-white dark:bg-gray-800 dark:border-gray-800 outline-none shadow-none focus:shadow-none'
                    value={pageIndex + 1}
                    onChange={(e) => {
                      gotoPage(Number(e.target.value - 1))
                    }}>

                  {selectPages.map((page, idx) => (
                    <option key={idx} value={page.value}>
                      {page.label}
                    </option>
                  ))}
                </select>
              </span>{' '}
              </div>*/}

            <div className='flex lg:flex-wrap items-center lg:justify-start justify-center space-x-2 pagination'>
              <select
                className='form-select text-sm bg-white dark:bg-gray-800 dark:border-gray-800 outline-none shadow-none focus:shadow-none'
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value))
                }}>
                {[10, 25, 50, 100].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </div>


          </div>
        ) : undefined}
      </Spinner>
    </>
  )
}


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