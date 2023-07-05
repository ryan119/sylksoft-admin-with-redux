import Button from 'components/common/Button'
import { PARAM_MAP } from 'components/common/param-map'
import FormWrapper from 'components/common/search/form-wrapper'
import SearchInput from 'components/common/search/input'
import SearchSelect from 'components/common/search/select'
import { resetVesselCriteria, searchVessel, setVesselCriteria } from 'components/ship/action'
import { mapKeys } from 'lodash'
import React, { useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { getParamById } from 'src/actions/common'

const SearchForm = () => {
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

  const onChange = (event, name) => {
    dispatch(setVesselCriteria(name, event.target.value))
  }

  const onSearch = (e) => {
    e.preventDefault()
    dispatch(setVesselCriteria('page', 0))
    dispatch(searchVessel())
  }

  const reset = () => {
    dispatch(resetVesselCriteria())
    dispatch(searchVessel())
  }

  const { criteria } = useSelector((state) => {
    return {
      criteria: state.ship.get('criteria')?.toJS()
    }
  })

  return (
    <FormWrapper onSearch={onSearch} reset={reset} gridCols='grid-cols-5'>
      <SearchInput name='vesselName' label='Vessel Name' onChange={onChange} value={criteria?.vesselName} />
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

      <SearchInput name='exName' label='Ex-Name' onChange={onChange} value={criteria?.exName} />
      <SearchInput name='owner' label='Owners' onChange={onChange} value={criteria?.owner} />
      <SearchSelect name='twOwner' label='Taiwanese Owner' onChange={onChange} options={paramTwOwnerList}
                    value={criteria?.twOwner} />
      <SearchInput name='shipYard' label='Shipyard' onChange={onChange} value={criteria?.shipYard} />
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
      <SearchInput name='lrNo' label='IMO No.' onChange={onChange} value={criteria?.lrNo} />
      <div className={`form-element`}>
        <div className='form-label'>Match Date</div>
        <div className={`form-element form-element-inline`}>
          <input
            name='matchDateStart'
            type='date'
            className='form-input w-full'
            placeholder=''
            onChange={(e) => onChange(e, 'matchDateStart')}
            value={criteria?.matchDateStart ?? ''}
          />
          <b>~</b>
          <input
            name='matchDateEnd'
            type='date'
            className='form-input w-full'
            placeholder=''
            onChange={(e) => onChange(e, 'matchDateEnd')}
            value={criteria?.matchDateEnd ?? ''}
          />
        </div>
      </div>

    </FormWrapper>
  )
}

export default SearchForm
