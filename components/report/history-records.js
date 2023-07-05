import Button from 'components/common/Button'
import { exportSpData, updateRtpSpDatasets } from 'components/report/action'
import React from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { compact, find, map, remove, filter, slice } from 'lodash'
import { formatDatetimePatternDash } from 'src/functions/date-format'

const HistoryRecord = ({ kind, updateDataset, exportData }) => {
  const dispatch = useDispatch()
  const {
    paramTypeList,
    paramTwOwnerList,
    paramFlagList,
    paramBuildPlaceList,
    rtpFrequencies,
    result
  } = useSelector((state) => {
    return {
      paramTypeList: state.common.get('paramTypeList')?.toJS(),
      paramTwOwnerList: state.common.get('paramTwOwnerList')?.toJS(),
      paramFlagList: state.common.get('paramFlagList')?.toJS(),
      paramBuildPlaceList: state.common.get('paramBuildPlaceList')?.toJS(),
      rtpFrequencies: state.common.get('rtpFrequencies')?.toJS(),
      result: state.reportMgmt.get(kind)?.toJS()
    }
  }, shallowEqual)

  function transformCriteria(criteria) {
    const typeLabel = criteria['type'] && `『${getItemLabel(paramTypeList, criteria['type'])?.label}』`
    const dwtLabel = (criteria['dwtMin'] || criteria['dwtMin']) && `『${criteria['dwtMin'] ?? ''} - ${criteria['dwtMax'] ?? ''}』`
    const ageLabel = `${criteria['age'] ? `『${criteria['age']} years』` : ''}`
    const buildCountryLabel = criteria['builtCountry'] && `『${getItemLabel(paramBuildPlaceList, criteria['builtCountry'])?.label}』`
    const teuLabel = (criteria['teuStart'] || criteria['teuEnd']) && `『${criteria['teuStart'] ?? ''} - ${criteria['teuEnd'] ?? ''}』`
    const dateLabel = (criteria['dateStart'] || criteria['dateEnd']) && `『${criteria['dateStart'] ?? ''} - ${criteria['dateEnd'] ?? ''}』`
    const frequencyLabel = criteria['builtCountry'] && `『${getItemLabel(rtpFrequencies, criteria['frequency'])?.label}』`


    const strArr = [
      typeLabel, dwtLabel, ageLabel, buildCountryLabel, teuLabel, dateLabel, frequencyLabel
    ]
    return compact(strArr).join('/')
  }

  function getItemLabel(collect, key) {
    return find(collect, c => c.id === key)
  }

  const removeResult = (idx) => {
    const tmpData = [...result]
    tmpData.splice(idx, 1)
    dispatch(updateDataset(tmpData))
  }

  return (
    <div>
      <h3 className='text-lg text-apple underline font-bold mb-4'>查詢結果 (支援上限為 5筆結果)</h3>
      {map(result, (r, idx) => {
        return (
          <div key={idx} className='lg:grid grid-cols-3 mb-2 sm:justify-start'>
            <div className='col-span-2'>
              <span className='font-bold mr-4'>查詢結果0{idx + 1}</span>{transformCriteria(r?.criteria)}
            </div>
            <div>
              <Button label='移除' color='red' textSize='lg:text-xs' onClick={() => removeResult(idx)} />
              <Button label='匯出Excel' color='primary' textSize='lg:text-xs' onClick={() => exportData(idx)} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default HistoryRecord



