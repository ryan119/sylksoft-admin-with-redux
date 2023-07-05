import { filter, forEach, union } from 'lodash'
import isArray from 'lodash/isArray'
import isUndefined from 'lodash/isUndefined'
import { useRouter } from 'next/router'
import { defaultLangCodes } from 'pages/system/role/create'
import React, { useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { FiChevronRight } from 'react-icons/fi'
import { TextInput } from 'src/base-components/form/text-input'
import Widget from 'src/components/widget'


const RoleForm = ({ inline = true, functions, mode='add' }) => {
  const router = useRouter()
  const { register, control, setValue, getValues, formState: { errors } } = useFormContext()
  const { fields, remove, append } = useFieldArray({
    control,
    name: 'names'
  })


  const getCurrentValues = () => {
    const { input } = this.props

    const { value, initialValue } = input

    let previousValues = []

    if (!isUndefined(value) && value !== '') {
      previousValues = value
    } else if (!isUndefined(initialValue) && initialValue !== '') {
      previousValues = initialValue
    }

    const currentValues = isArray(previousValues) ? [...previousValues] : [previousValues]

    return currentValues
  }

  const getAncestors = (tree, id) => {
    //const {options} = this.props;
    //console.log('tree :' , tree, id);
    let found = false
    let ancestors = []
    let layer = -1

    const recursive = (funcs, layer) => {
      if (found) {
        return
      }

      if (funcs.id === id) {
        found = true
        ancestors[++layer] = funcs.id
      } else if (!found && funcs.subFunctions.length > 0) {
        ancestors[++layer] = funcs.id
        funcs.subFunctions.map(e => {
          recursive(e, layer)
        })
      } else {
        layer--
      }
    }

    recursive(tree, layer)

    return { found: found, ancestors: ancestors }
  }

  const handleChange = (event, id) => {
    console.log('event: ', event, id)
    //const values = getCurrentValues();
    const values = getValues('functionIds') || []
    const targetValue = event.target.value
    if (event.target.checked) {
      const cur = getActions(functions, targetValue)
      cur.map(c => {
        values.push(c)
      })

      functions.map(func => {
        const result = getAncestors(func, id)
        console.log('result: ', result)
        if (result.found) {
          result.ancestors.map((v) => {
            values.push(v)
          })
        }
      })
    } else {

      const prefix = targetValue.substring(0, event.target.value.lastIndexOf('_') + 1)
      const tmp = filter(values, (val) => val.indexOf(prefix) > -1)

      const cur = getActions(functions, targetValue)
      if(cur.length > 0 ) {
        cur.map(c => {
          if (values.indexOf(c) > -1) {
            values.splice(values.indexOf(c), 1)
          }
        })
      }else {
        if (values.indexOf(targetValue) > -1) {
          values.splice(values.indexOf(targetValue), 1)
        }
      }
    }
    setValue('functionIds', values)
    //return onChange(values);
  }

  const renderFunctions = (tree) => {

    return tree?.map((item, idx) => {

      if (item?.subFunctions.length > 0 || item.parentId === null) {

        const [toggle, setToggle] = useState(false)

        return (
          <div key={`${item.id}_${idx}`}>
            <div className='flex items-center justify-between pb-4'>
              <div className='flex items-center'>
                { item?.subFunctions.length > 0 ? (
                  <FiChevronRight
                    role='button'
                    tabIndex='0'
                    size={14}
                    className='focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 rounded-md'
                    onClick={() => setToggle((prev) => {
                      return !prev
                    })}
                  />
                ): (
                  <div className="w-3.5"></div>
                )}
                <div className='pl-2 flex items-center'>
                  <div
                    className='bg-gray-100 dark:bg-gray-800 border rounded-sm border-gray-200 dark:border-gray-700 w-3 h-3 flex flex-shrink-0 justify-center items-center relative'>
                    <input
                      type='checkbox'
                      value={item.id}
                      {...register('functionIds')}
                      onChange={(e) => handleChange(e, item?.id)}
                    />
                  </div>
                  <p className='text-base focus:outline-none text-sm leading-normal ml-2 text-gray-800'>{item.name}</p>
                </div>
              </div>
            </div>
            <div id='sublist1' className={`pl-4 pb-2 ${toggle ? '' : 'hidden'}`}>
              {renderFunctions(item?.subFunctions)}
            </div>
          </div>
        )
      }

      return (
        <div key={`${item.id}_${idx}`} className='flex inline-flex items-center pb-4'>
          <div style={{width:'22px'}}></div>
          <div
            className='bg-gray-100 dark:bg-gray-800 border rounded-sm border-gray-200 dark:border-gray-700 w-3 h-3 flex flex-shrink-0 justify-center items-center relative'>
            <input
              type='checkbox'
              value={item.id}
              {...register('functionIds')}
              onChange={(e) => handleChange(e, item?.id)}
            />
          </div>
          <p className='text-base focus:outline-none text-sm leading-normal ml-2 text-gray-800'>{item.name}</p>
        </div>
      )
    })
  }

  const [openTab, setOpenTab] = useState(0)
  console.log('functions: ', functions)
  return (
    <>
      <TextInput name='id' label='角色ID(限後台使用)' placeholder='系統產生' disabled={true} />
      {fields.length > 1 ? (
        <div className='w-32+w-5/6'>
          <Widget title='語系設定' description=''>
            <div className='flex items-center justify-between pb-4'>
              <div className='flex flex-wrap flex-col w-full tabs'>
                <div className='flex lg:flex-wrap flex-row lg:space-x-2'>
                  {defaultLangCodes.map((item, key) => {
                    return (
                      <div key={key} className='flex-none'>
                        <button onClick={() => {
                          setOpenTab(key)
                        }}
                                className={`tab ${openTab === key ? 'tab-active' : ''}`}
                                type='button'>
                          {item?.name}
                        </button>
                      </div>
                    )
                  })}
                </div>
                {fields.map((item, idx) => {
                  return (
                    <div className={`tab-i18n ${openTab !== idx ? 'hidden' : 'block'}`}>
                      <TextInput name={`names.${idx}.name`} label='角色名稱' placeholder='總管理員' />
                    </div>
                  )
                })}
              </div>
            </div>
          </Widget>
        </div>

      ) : (
        <>
          {fields.map((item, idx) => {
            return (
              <div className={`tab-i18n ${openTab !== idx ? 'hidden' : 'block'}`}>
                <TextInput name={`names.${idx}.name`} label='角色名稱' placeholder='總管理員' />
              </div>
            )
          })}
        </>
      )}


      <div className='flex'>
        <div className='w-32 h-4'>
          <div className='w-full mb-4'>
            <div className={`form-element ${inline ? 'form-element-inline' : ''}`}>
              <div className='form-label'>權限設定</div>
            </div>
          </div>
        </div>

        <div className='w-5/6'>
          <div className='w-full mt-2 p-4 bg-white shadow rounded' id='dropdown'>
            {functions && renderFunctions(functions)}

            {/*<div>
              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <FiChevronRight
                    role='button'
                    tabIndex='0'
                    size={14}
                    className='focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 rounded-md'
                  />

                  <div className='pl-4 flex items-center'>
                    <div
                      className='bg-gray-100 dark:bg-gray-800 border rounded-sm border-gray-200 dark:border-gray-700 w-3 h-3 flex flex-shrink-0 justify-center items-center relative'>
                      <input aria-labelledby='fb1' type='checkbox'
                             className='focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full' />
                      <div className='check-icon hidden bg-indigo-700 text-white rounded-sm'>
                        <svg className='icon icon-tabler icon-tabler-check' xmlns='http://www.w3.org/2000/svg'
                             width='12' height='12' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor'
                             fill='none' strokeLinecap='round' strokeLinejoin='round'>
                          <path stroke='none' d='M0 0h24v24H0z' />
                          <path d='M5 12l5 5l10 -10' />
                        </svg>
                      </div>
                    </div>
                    <p id='fb1' tabIndex='0'
                       className='focus:outline-none text-sm leading-normal ml-2 text-gray-800'>權限角色管理</p>
                  </div>
                </div>

              </div>
              <div id='sublist1' className='pl-8 pt-5 hidden'>
                <div className='flex items-center justify-between'>

                  <div className='pl-4 flex items-center'>
                    <div
                      className='bg-gray-100 dark:bg-gray-800 border rounded-sm border-gray-200 dark:border-gray-700 w-3 h-3 flex flex-shrink-0 justify-center items-center relative'>
                      <input aria-labelledby='usa1' type='checkbox'
                             className='focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full' />
                      <div className='check-icon hidden bg-indigo-700 text-white rounded-sm'>
                        <svg className='icon icon-tabler icon-tabler-check' xmlns='http://www.w3.org/2000/svg'
                             width='12' height='12' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor'
                             fill='none' strokeLinecap='round' strokeLinejoin='round'>
                          <path stroke='none' d='M0 0h24v24H0z' />
                          <path d='M5 12l5 5l10 -10' />
                        </svg>
                      </div>
                    </div>
                    <p id='usa1' tabIndex='0'
                       className='focus:outline-none text-sm leading-normal ml-2 text-gray-800'>USA</p>
                  </div>
                  <p tabIndex='0'
                     className='focus:outline-none w-8 text-xs leading-3 text-right text-indigo-700'>2,381</p>
                </div>
                <div className='flex pt-4 items-center justify-between'>
                  <div className='pl-4 flex items-center'>
                    <div
                      className='bg-gray-100 dark:bg-gray-800 border rounded-sm border-gray-200 dark:border-gray-700 w-3 h-3 flex flex-shrink-0 justify-center items-center relative'>
                      <input aria-labelledby='ger1' type='checkbox'
                             className='focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full' />
                      <div className='check-icon hidden bg-indigo-700 text-white rounded-sm'>
                        <svg className='icon icon-tabler icon-tabler-check' xmlns='http://www.w3.org/2000/svg'
                             width='12' height='12' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor'
                             fill='none' strokeLinecap='round' strokeLinejoin='round'>
                          <path stroke='none' d='M0 0h24v24H0z' />
                          <path d='M5 12l5 5l10 -10' />
                        </svg>
                      </div>
                    </div>
                    <p id='ger1' tabIndex='0'
                       className='focus:outline-none text-sm leading-normal ml-2 text-gray-800'>Germany</p>
                  </div>
                  <p tabIndex='0'
                     className='focus:outline-none w-8 text-xs leading-3 text-right text-indigo-700'>2,381</p>
                </div>
                <div className='flex pt-4 items-center justify-between'>
                  <div className='pl-4 flex items-center'>
                    <div
                      className='bg-gray-100 dark:bg-gray-800 border rounded-sm border-gray-200 dark:border-gray-700 w-3 h-3 flex flex-shrink-0 justify-center items-center relative'>
                      <input aria-labelledby='italy1' type='checkbox'
                             className='focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full' />
                      <div className='check-icon hidden bg-indigo-700 text-white rounded-sm'>
                        <svg className='icon icon-tabler icon-tabler-check' xmlns='http://www.w3.org/2000/svg'
                             width='12' height='12' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor'
                             fill='none' strokeLinecap='round' strokeLinejoin='round'>
                          <path stroke='none' d='M0 0h24v24H0z' />
                          <path d='M5 12l5 5l10 -10' />
                        </svg>
                      </div>
                    </div>
                    <p id='italy1' tabIndex='0'
                       className='focus:outline-none text-sm leading-normal ml-2 text-gray-800'>Italy</p>
                  </div>
                  <p tabIndex='0'
                     className='focus:outline-none w-8 text-xs leading-3 text-right text-indigo-700'>2,381</p>
                </div>
              </div>
            </div>

            <div>
              <div className='flex items-center justify-between mt-4'>
                <div className='flex items-center'>
                  <FiChevronRight
                    role='button'
                    tabIndex='0'
                    size={14}
                    className='focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 rounded-md'
                  />

                  <div className='pl-4 flex items-center'>
                    <div
                      className='bg-gray-100 dark:bg-gray-800 border rounded-sm border-gray-200 dark:border-gray-700 w-3 h-3 flex flex-shrink-0 justify-center items-center relative'>
                      <input aria-labelledby='twitter2' type='checkbox'
                             className='focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full' />
                      <div className='check-icon hidden bg-indigo-700 text-white rounded-sm'>
                        <svg className='icon icon-tabler icon-tabler-check' xmlns='http://www.w3.org/2000/svg'
                             width='12' height='12' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor'
                             fill='none' strokeLinecap='round' strokeLinejoin='round'>
                          <path stroke='none' d='M0 0h24v24H0z' />
                          <path d='M5 12l5 5l10 -10' />
                        </svg>
                      </div>
                    </div>
                    <p id='twitter2' tabIndex='0'
                       className='focus:outline-none text-sm leading-normal ml-2 text-gray-800'>Twitter</p>
                  </div>
                </div>
              </div>
              <div id='sublist2' className='pl-8 pt-5 hidden'>
                <div className='flex items-center justify-between'>
                  <div className='pl-4 flex items-center'>
                    <div
                      className='bg-gray-100 dark:bg-gray-800 border rounded-sm border-gray-200 dark:border-gray-700 w-3 h-3 flex flex-shrink-0 justify-center items-center relative'>
                      <input aria-labelledby='usa2' type='checkbox'
                             className='focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full' />
                      <div className='check-icon hidden bg-indigo-700 text-white rounded-sm'>
                        <svg className='icon icon-tabler icon-tabler-check' xmlns='http://www.w3.org/2000/svg'
                             width='12' height='12' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor'
                             fill='none' strokeLinecap='round' strokeLinejoin='round'>
                          <path stroke='none' d='M0 0h24v24H0z' />
                          <path d='M5 12l5 5l10 -10' />
                        </svg>
                      </div>
                    </div>
                    <p id='usa2' tabIndex='0'
                       className='focus:outline-none text-sm leading-normal ml-2 text-gray-800'>USA</p>
                  </div>
                  <p tabIndex='0'
                     className='focus:outline-none w-8 text-xs leading-3 text-right text-indigo-700'>2,381</p>
                </div>
                <div className='flex pt-4 items-center justify-between'>
                  <div className='pl-4 flex items-center'>
                    <div
                      className='bg-gray-100 dark:bg-gray-800 border rounded-sm border-gray-200 dark:border-gray-700 w-3 h-3 flex flex-shrink-0 justify-center items-center relative'>
                      <input aria-labelledby='ger2' type='checkbox'
                             className='focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full' />
                      <div className='check-icon hidden bg-indigo-700 text-white rounded-sm'>
                        <svg className='icon icon-tabler icon-tabler-check' xmlns='http://www.w3.org/2000/svg'
                             width='12' height='12' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor'
                             fill='none' strokeLinecap='round' strokeLinejoin='round'>
                          <path stroke='none' d='M0 0h24v24H0z' />
                          <path d='M5 12l5 5l10 -10' />
                        </svg>
                      </div>
                    </div>
                    <p id='ger2' tabIndex='0'
                       className='focus:outline-none text-sm leading-normal ml-2 text-gray-800'>Germany</p>
                  </div>
                  <p tabIndex='0'
                     className='focus:outline-none w-8 text-xs leading-3 text-right text-indigo-700'>2,381</p>
                </div>
                <div className='flex pt-4 items-center justify-between'>
                  <div className='pl-4 flex items-center'>
                    <div
                      className='bg-gray-100 dark:bg-gray-800 border rounded-sm border-gray-200 dark:border-gray-700 w-3 h-3 flex flex-shrink-0 justify-center items-center relative'>
                      <input aria-labelledby='italy2' type='checkbox'
                             className='focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full' />
                      <div className='check-icon hidden bg-indigo-700 text-white rounded-sm'>
                        <svg className='icon icon-tabler icon-tabler-check' xmlns='http://www.w3.org/2000/svg'
                             width='12' height='12' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor'
                             fill='none' strokeLinecap='round' strokeLinejoin='round'>
                          <path stroke='none' d='M0 0h24v24H0z' />
                          <path d='M5 12l5 5l10 -10' />
                        </svg>
                      </div>
                    </div>
                    <p id='italy2' tabIndex='0'
                       className='focus:outline-none text-sm leading-normal ml-2 text-gray-800'>Italy</p>
                  </div>
                  <p tabIndex='0'
                     className='focus:outline-none w-8 text-xs leading-3 text-right text-indigo-700'>2,381</p>
                </div>
              </div>
            </div>

            <div>
              <div className='flex items-center justify-between mt-4'>
                <div className='flex items-center'>
                  <FiChevronRight
                    role='button'
                    tabIndex='0'
                    size={14}
                    className='focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 rounded-md'
                  />

                  <div className='pl-4 flex items-center'>
                    <div
                      className='bg-gray-100 dark:bg-gray-800 border rounded-sm border-gray-200 dark:border-gray-700 w-3 h-3 flex flex-shrink-0 justify-center items-center relative'>
                      <input aria-labelledby='insta3' type='checkbox'
                             className='focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full' />
                      <div className='check-icon hidden bg-indigo-700 text-white rounded-sm'>
                        <svg className='icon icon-tabler icon-tabler-check' xmlns='http://www.w3.org/2000/svg'
                             width='12' height='12' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor'
                             fill='none' strokeLinecap='round' strokeLinejoin='round'>
                          <path stroke='none' d='M0 0h24v24H0z' />
                          <path d='M5 12l5 5l10 -10' />
                        </svg>
                      </div>
                    </div>
                    <p id='insta3' tabIndex='0'
                       className='focus:outline-none text-sm leading-normal ml-2 text-gray-800'>Instagram</p>
                  </div>
                </div>
              </div>
              <div id='sublist3' className='pl-8 pt-5'>
                <div className='flex items-center justify-between'>
                  <div className='pl-4 flex items-center'>
                    <div
                      className='bg-gray-100 dark:bg-gray-800 border rounded-sm border-gray-200 dark:border-gray-700 w-3 h-3 flex flex-shrink-0 justify-center items-center relative'>
                      <input aria-labelledby='usa3' type='checkbox'
                             className='focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full' />
                      <div className='check-icon hidden bg-indigo-700 text-white rounded-sm'>
                        <svg className='icon icon-tabler icon-tabler-check' xmlns='http://www.w3.org/2000/svg'
                             width='12' height='12' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor'
                             fill='none' strokeLinecap='round' strokeLinejoin='round'>
                          <path stroke='none' d='M0 0h24v24H0z' />
                          <path d='M5 12l5 5l10 -10' />
                        </svg>
                      </div>
                    </div>
                    <p id='usa3' tabIndex='0'
                       className='focus:outline-none text-sm leading-normal ml-2 text-gray-800'>USA</p>
                  </div>
                </div>
                <div className='flex pt-4 items-center justify-between'>
                  <div className='pl-4 flex items-center'>
                    <div
                      className='bg-gray-100 dark:bg-gray-800 border rounded-sm border-gray-200 dark:border-gray-700 w-3 h-3 flex flex-shrink-0 justify-center items-center relative'>
                      <input aria-labelledby='germany3' type='checkbox'
                             className='focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full' />
                      <div className='check-icon hidden bg-indigo-700 text-white rounded-sm'>
                        <svg className='icon icon-tabler icon-tabler-check' xmlns='http://www.w3.org/2000/svg'
                             width='12' height='12' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor'
                             fill='none' strokeLinecap='round' strokeLinejoin='round'>
                          <path stroke='none' d='M0 0h24v24H0z' />
                          <path d='M5 12l5 5l10 -10' />
                        </svg>
                      </div>
                    </div>
                    <p id='germany3' tabIndex='0'
                       className='focus:outline-none text-sm leading-normal ml-2 text-gray-800'>Germany</p>
                  </div>
                </div>
                <div className='flex pt-4 items-center justify-between'>
                  <div className='pl-4 flex items-center'>
                    <div
                      className='bg-gray-100 dark:bg-gray-800 border rounded-sm border-gray-200 dark:border-gray-700 w-3 h-3 flex flex-shrink-0 justify-center items-center relative'>
                      <input aria-labelledby='italy3' type='checkbox'
                             className='focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full' />
                      <div className='check-icon hidden bg-indigo-700 text-white rounded-sm'>
                        <svg className='icon icon-tabler icon-tabler-check' xmlns='http://www.w3.org/2000/svg'
                             width='12' height='12' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor'
                             fill='none' strokeLinecap='round' strokeLinejoin='round'>
                          <path stroke='none' d='M0 0h24v24H0z' />
                          <path d='M5 12l5 5l10 -10' />
                        </svg>
                      </div>
                    </div>
                    <p id='italy3' tabIndex='0'
                       className='focus:outline-none text-sm leading-normal ml-2 text-gray-800'>Italy</p>
                  </div>

                </div>
              </div>
            </div>*/}
          </div>
        </div>
      </div>

    </>
  )
}
export default RoleForm


function getActions(tree, current) {

  let targetFunction
  let layer = -1
  let found = false

  const findCurrentFunctions = (func, layer) => {
    if (func.id === current) {
      targetFunction = func
    }

    if (func.subFunctions?.length > 0) {
      func.subFunctions.map(e => {
        if (e.subFunctions?.length > 0) {
          findCurrentFunctions(e, layer)
        }
      })
    }
  }

  forEach(tree, t => {
    findCurrentFunctions(t, layer)
  })

  let functions = []
  if (targetFunction) {

    const getActions = (children) => {
      functions.push(children.id)
      if (children.subFunctions.length > 0) {
        children.subFunctions.map((s) => {
          getActions(s)
        })
      }
    }
    getActions(targetFunction)
  }

  return functions
}
