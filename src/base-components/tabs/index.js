import { find, isNumber } from 'lodash'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'

export const UnderlinedTabs = ({tabs=[], activeTab=0 }) => {
  console.log('activeTab: ', activeTab, isNumber(activeTab))
  const [openTab, setOpenTab] = useState(activeTab)

  const tab = find(tabs, (t) => t.index === openTab)

  return (
    <div className="flex flex-wrap flex-col w-full tabs">
      <div className="flex lg:flex-wrap flex-row lg:space-x-2">
        {tabs.map((tab, key) => (
          <div key={key} className="flex-none">
            <button
              onClick={() => {
                setOpenTab(tab.index)
              }}
              className={
                openTab === tab.index
                  ? 'tab tab-underline tab-active'
                  : 'tab tab-underline'
              }
              type="button">
              {tab.title}
            </button>
          </div>
        ))}
      </div>

      { tab && <tab.content setOpenTab={setOpenTab} /> }

    </div>
  )
}

UnderlinedTabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      index: PropTypes.number,
      content: PropTypes.func,
      title: PropTypes.any
    })
  ).isRequired
}

export default UnderlinedTabs

export const DefaultTabs = ({tabs}) => {
  const [openTab, setOpenTab] = useState(0)
  useEffect(() => {
    setOpenTab(tabs.length-1)
  },[tabs.length])
  return (
    <div className="flex flex-col w-full tabs">
      <div className="flex lg:flex-wrap flex-row lg:space-x-2">
        {tabs.map((tab, key) => (
          <div key={key} className="flex-none">
            <button
              style={{padding: '10px'}}
              onClick={() => {
                setOpenTab(tab.index)
              }}
              className={`tab ${openTab === tab.index ? 'tab-active' : ''}`}
              type="button">
              {tab.title}
            </button>
          </div>
        ))}
      </div>
      {tabs.map((tab, key) => (
        <div
          key={key}
          className={`tab-content ${
            openTab !== tab.index ? 'hidden' : 'block'
          }`}>
          {tab.content}
        </div>
      ))}
    </div>
  )
}

DefaultTabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      index: PropTypes.number,
      content: PropTypes.element,
      title: PropTypes.any
    })
  ).isRequired
}



