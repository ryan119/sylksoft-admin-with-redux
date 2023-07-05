import Button from 'components/common/Button'
import { PARAM_MAP } from 'components/common/param-map'
import FormWrapper from 'components/common/search/form-wrapper'
import SearchSelect from 'components/common/search/select'
import { resetVesselEstCriteria, searchVesselEst, setVesselEstCriteria } from 'components/tradeMgmt/action'
import { mapKeys } from 'lodash'
import React, { useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { getParamById } from 'src/actions/common'

const VesselEstSearch = () => {
  const dispatch = useDispatch()
  const { criteria, paramTypeList, paramBuildPlaceList, paramDeadWeightList, paramTeuList } = useSelector((state) => {
    return {
      criteria: state.tradeMgmt.get('vesselEstCriteria')?.toJS(),
      paramTypeList: state.common.get('paramTypeList')?.toJS(),
      paramBuildPlaceList: state.common.get('paramBuildPlaceList')?.toJS(),
      paramDeadWeightList:  state.common.get('paramDeadWeightList')?.toJS(),
      paramTeuList: state.common.get('paramTeuList')?.toJS()
    }
  }, shallowEqual)

  useEffect(() => {
    mapKeys(PARAM_MAP, (value, key) => {
      dispatch(getParamById(key))
    })
  }, [])

  const onChange = (event, name) => {
    dispatch(setVesselEstCriteria(name, event.target.value))
  }
  const onCheckboxChange = (event, name) => {
    console.log('evnet: ', event, event.target.checked)
    dispatch(setVesselEstCriteria(name, event.target.checked))
  }

  const onSearch = (e) => {
    e.preventDefault()
    dispatch(setVesselEstCriteria('page', 0))
    dispatch(searchVesselEst())
  }

  const reset = () => {
    dispatch(resetVesselEstCriteria())
    dispatch(searchVesselEst())
  }

  return (
    <FormWrapper onSearch={onSearch} reset={reset} gridCols='grid-cols-4'>
      <SearchSelect name='type' label='Type' onChange={onChange} options={paramTypeList} value={criteria?.type} />
      <SearchSelect name='dwt' label='Deadweight' onChange={onChange} options={paramDeadWeightList} value={criteria?.dwt} />
      <div className={`form-element`}>
        <div className='form-label'>Age</div>
        <div className={`form-element form-element-inline`}>
          <input
            name='ageStart'
            type='text'
            className='form-input w-full'
            placeholder=''
            onChange={(e) => onChange(e, 'ageStart')}
            value={criteria?.ageStart ?? ''}

          />
          <b>~</b>
          <input
            name='ageEnd'
            type='text'
            className='form-input w-full'
            placeholder=''
            onChange={(e) => onChange(e, 'ageEnd')}
            value={criteria?.ageEnd ?? ''}
          />
        </div>
      </div>
      <SearchSelect name='builtCountry' label='Built Country' onChange={onChange} options={paramBuildPlaceList}
                    value={criteria?.builtCountry} />

      <SearchSelect name='teu' label='TEU' onChange={onChange} options={paramTeuList}
                    value={criteria?.teu} />

      <div className={`form-element`}>
        <div className='form-label'>Date</div>
        <div className={`form-element form-element-inline`}>
          <input
            name='estDateStart'
            type='date'
            className='form-input w-full'
            placeholder=''
            onChange={(e) => onChange(e, 'estDateStart')}
            value={criteria?.estDateStart ?? ''}
          />
          <b>~</b>
          <input
            name='estDateEnd'
            type='date'
            className='form-input w-full'
            placeholder=''
            onChange={(e) => onChange(e, 'estDateEnd')}
            value={criteria?.estDateEnd ?? ''}
          />
        </div>
      </div>
    </FormWrapper>
  )
}

export default VesselEstSearch
