import { PARAM_MAP } from 'components/common/param-map'
import SearchInput from 'components/common/search/input'
import SearchSelect from 'components/common/search/select'
import { mapKeys } from 'lodash'
import React, { useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { getParamById } from 'src/actions/common'

/**
 * 成交價(T)及預估價(E)Search欄位
 * @param criteria
 * @param onChange
 * @returns {JSX.Element}
 * @constructor
 */
const CommonForm = ({ criteria, onChange, type }) => {
  const dispatch = useDispatch()
  const { paramTypeList, paramTwOwnerList, paramFlagList, paramBuildPlaceList } = useSelector((state) => {
    return {
      paramTypeList: state.common.get('paramTypeList')?.toJS(),
      paramTwOwnerList: state.common.get('paramTwOwnerList')?.toJS(),
      paramFlagList: state.common.get('paramFlagList')?.toJS(),
      paramBuildPlaceList: state.common.get('paramBuildPlaceList')?.toJS()
    }
  }, shallowEqual)

  useEffect(() => {
    mapKeys(PARAM_MAP, (value, key) => {
      dispatch(getParamById(key))
    })
  }, [])

  return (
    <>
      <SearchSelect name='type' label='Type' onChange={onChange} options={paramTypeList} value={criteria?.type} />
      <div className={`form-element`}>
        <div className='form-label'>Deadweight</div>
        <div className={`form-element form-element-inline`}>
          <input
            name='dwtMin'
            type='text'
            className='form-input w-full'
            placeholder=''
            onChange={(e) => onChange(e, 'dwtMin')}
            value={criteria?.dwtMin ?? ''}
          />
          <b>~</b>
          <input
            name='dwtMax'
            type='text'
            className='form-input w-full'
            placeholder=''
            onChange={(e) => onChange(e, 'dwtMax')}
            value={criteria?.dwtMax ?? ''}
          />
        </div>
      </div>
      <div className={`form-element`}>
        <div className='form-label'>Year</div>
        <div className={`form-element form-element-inline`}>
          <input
            name='yearStart'
            type='text'
            className='form-input w-full'
            placeholder=''
            onChange={(e) => onChange(e, 'yearStart')}
            value={criteria?.yearStart ?? ''}

          />
          <b>~</b>
          <input
            name='yearEnd'
            type='text'
            className='form-input w-full'
            placeholder=''
            onChange={(e) => onChange(e, 'yearEnd')}
            value={criteria?.yearEnd ?? ''}
          />
        </div>
      </div>
      <SearchSelect name='builtCountry' label='Built Country' onChange={onChange} options={paramBuildPlaceList}
                    value={criteria?.builtCountry} />

      <SearchInput name='vesselName' label='Vessel Name' onChange={onChange} value={criteria?.vesselName} />

      <div className={`form-element`}>
        <div className='form-label'>TEU</div>
        <div className={`form-element form-element-inline`}>
          <input
            name='teuStart'
            type='text'
            className='form-input w-full'
            placeholder=''
            onChange={(e) => onChange(e, 'teuStart')}
            value={criteria?.teuStart ?? ''}
          />
          <b>~</b>
          <input
            name='teuEnd'
            type='text'
            className='form-input w-full'
            placeholder=''
            onChange={(e) => onChange(e, 'teuEnd')}
            value={criteria?.teuEnd ?? ''}
          />
        </div>
      </div>

     {/* { type === 'T' ? (
        <SearchInput name='lrNo' label='IMO No.' onChange={onChange} value={criteria?.lrNo} />
      ): undefined }*/}

      <div className={`form-element`}>
        <div className='form-label'>Date</div>
        <div className={`form-element form-element-inline`}>
          <input
            name='matchDateStart'
            type='date'
            className='form-input w-full'
            placeholder=''
            onChange={(e) => onChange(e, type === 'T' ? 'soldDateStart' : 'estDateStart')}
            value={type === 'T' ? criteria?.soldDateStart ?? '' : criteria?.estDateStart ?? ''}
          />
          <b>~</b>
          <input
            name='matchDateEnd'
            type='date'
            className='form-input w-full'
            placeholder=''
            onChange={(e) => onChange(e, type === 'T' ? 'soldDateEnd' : 'estDateEnd')}
            value={type === 'T' ? criteria?.soldDateEnd ?? '' : criteria?.estDateEnd ?? ''}
          />
        </div>
      </div>


    </>
  )
}

export default CommonForm
