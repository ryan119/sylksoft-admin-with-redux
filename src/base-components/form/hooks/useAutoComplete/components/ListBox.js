import React from 'react'
import autoStyles from 'src/styles/scss/use-autocomplete.module.scss'

export default function ListBox({bindOptions, selectedIndex, bindOption, suggestions}) {
  return (
    <ul {...bindOptions} className={autoStyles.listBox}>
      { suggestions?.map((_, index) => (
        <li
          className={`hover:bg-blue-300 ${selectedIndex === index ? 'bg-blue-300' : ''}`}
          key={index}
          {...bindOption}
        >
          <span>{suggestions[index].label}</span>
        </li>
      ))}
    </ul>
  )
}