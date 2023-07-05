

import { Record } from 'components/report/table-record'
import { remove } from 'lodash'
import React, { memo } from 'react'

const MemoRecord = memo(function({data, totalSize}) {
  const copyValues = [...data]
  const removeData = remove(copyValues, (d) => d.price === 0)
  return <Record data={copyValues} />
},(prevProps, nextProps) => {
  return prevProps.totalSize === nextProps.totalSize
})

export default MemoRecord