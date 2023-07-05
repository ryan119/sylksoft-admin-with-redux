import Button from 'components/common/Button'
import SearchInput from 'components/common/search/input'
import SearchRadios from 'components/common/search/radios'
import tof from 'components/common/tof.json'
import React from 'react'

function FormWrapper({ onSearch, reset, gridCols, children }) {
  return (
    <form onSubmit={onSearch}>
      <div className={`lg:grid ${gridCols} gap-x-8 mb-4 text-base`}>
        { children }
        <div className='lg:flex flex-1 text-center items-center'>
          <Button type='submit' label='查詢' color='primary'/>
          <Button label='清除' color='gray' onClick={reset} />
        </div>
      </div>
    </form>
  )
}

export default FormWrapper