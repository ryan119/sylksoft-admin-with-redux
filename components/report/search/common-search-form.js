import { PARAM_MAP } from 'components/common/param-map'
import SearchInput from 'components/common/search/input'
import SearchSelect from 'components/common/search/select'
import { mapKeys } from 'lodash'
import React, { useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { getParamById, getRtpFrequencies } from 'src/actions/common'

const CommonSearchForm = ({ criteria, onChange, type, disabledX }) => {
  const dispatch = useDispatch()
  const { paramTeuList, paramDeadWeightList, paramTypeList, paramBuildPlaceList, rtpFrequencies } = useSelector((state) => {
    return {
      paramTypeList: state.common.get('paramTypeList')?.toJS(),
      paramBuildPlaceList: state.common.get('paramBuildPlaceList')?.toJS(),
      paramDeadWeightList:  state.common.get('paramDeadWeightList')?.toJS(),
      rtpFrequencies: state.common.get('rtpFrequencies')?.toJS(),
      paramTeuList: state.common.get('paramTeuList')?.toJS()
    }
  }, shallowEqual)

  useEffect(() => {
    mapKeys(PARAM_MAP, (value, key) => {
      dispatch(getParamById(key))
    })
    dispatch(getRtpFrequencies())
  }, [])

  return (
    <>
      <SearchSelect name='type' label='Type' onChange={onChange} options={paramTypeList} value={criteria?.type} />
      { type === 'EST' ? (
        <SearchSelect name='dwtId' label='Deadweight' onChange={onChange} options={paramDeadWeightList} value={criteria?.dwtId} />
      ): (
        <div className={`form-element`}>
          <div className='form-label'>Deadweight</div>
          <div className={`form-element form-element-inline`}>
            <input
              name='dwtMin'
              type='number'
              className='form-input w-full'
              placeholder=''
              onChange={(e) => onChange(e, 'dwtMin')}
              value={criteria?.dwtMin ?? ''}
              min={0}
            />
            <b>~</b>
            <input
              name='dwtMax'
              type='number'
              className='form-input w-full'
              placeholder=''
              onChange={(e) => onChange(e, 'dwtMax')}
              value={criteria?.dwtMax ?? ''}
              min={0}
            />
          </div>
        </div>
      )}

      <SearchInput type='number' name='age' label='Age' onChange={onChange} value={criteria.age} min={0}/>
      <SearchSelect name='builtCountry' label='Built Country' onChange={onChange} options={paramBuildPlaceList}
                    value={criteria?.builtCountry} />

      { type === 'EST' ? (
        <SearchSelect name='teuId' label='TEU' onChange={onChange} options={paramTeuList}
                      value={criteria?.teuId} />
      ): (
        <div className={`form-element`}>
          <div className='form-label'>TEU</div>
          <div className={`form-element form-element-inline`}>
            <input
              name='teuStart'
              type='number'
              className='form-input w-full'
              placeholder=''
              onChange={(e) => onChange(e, 'teuStart')}
              value={criteria?.teuStart ?? ''}
              min={0}
            />
            <b>~</b>
            <input
              name='teuEnd'
              type='number'
              className='form-input w-full'
              placeholder=''
              onChange={(e) => onChange(e, 'teuEnd')}
              value={criteria?.teuEnd ?? ''}
              min={0}
            />
          </div>
        </div>
      )}

      <div className={`form-element`}>
        <div classame='form-label'>Date</div>
        <div className={`form-element form-element-inline`}>
          <input
            name='dateStart'
            type='date'
            className='form-input w-full disabled:bg-gray-100'
            placeholder=''
            onChange={(e) => onChange(e, 'dateStart')}
            value={criteria?.dateStart}
            disabled={disabledX}
          />
          <b>~</b>
          <input
            name='dateEnd'
            type='date'
            className='form-input w-full disabled:bg-gray-100'
            placeholder=''
            onChange={(e) => onChange(e, 'dateEnd')}
            value={criteria?.dateEnd}
            disabled={disabledX}
          />
        </div>
      </div>

      <SearchSelect name='frequency' label='Frequency' onChange={onChange} options={rtpFrequencies}
                    value={criteria?.frequency} disabled={disabledX}/>
    </>
  )
}

export default CommonSearchForm
