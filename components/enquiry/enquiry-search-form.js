import Button from 'components/common/Button'
import { ENQUIRY_PARAM_MAP } from 'components/common/param-map'
import FormWrapper from 'components/common/search/form-wrapper'
import SearchInput from 'components/common/search/input'
import MultiSelect from 'components/common/search/multi-select'
import { addEmsgMatch, getEmsgInfo } from 'components/emsg/action'
import MatchVesselModal from 'components/emsg/match-vessel'
import { resetEnquiryListCriteria, searchEnquiryList, setEnquiryListCriteria } from 'components/enquiry/action'
import SearchVesselModal from 'components/enquiry/search-vessel-modal'
import { removeData } from 'components/ship/action'
import { isArray, isEmpty, map, mapKeys } from 'lodash'
import React, { useEffect, useRef, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { getEnquiryParamById, getParamById } from 'src/actions/common'
import Modal from 'src/base-components/modal/index2'

const EnquirySearchForm = () => {
  const dispatch = useDispatch()

  const { criteria, paramTypeList, paramYearList, paramDwtList, paramTeuList, paramCbmList, vessels } = useSelector((state) => {
    return {
      criteria: state.enquiryMgmt.get('criteria')?.toJS(),
      paramTypeList: state.common.get('paramTypeList')?.toJS(),
      paramYearList: state.common.get('paramYearList')?.toJS(),
      paramDwtList: state.common.get('paramDwtList')?.toJS(),
      paramTeuList: state.common.get('paramTeuList')?.toJS(),
      paramCbmList: state.common.get('paramCbmList')?.toJS(),
      vessels: state.ship.get('vessels')?.toJS(),
    }
  }, shallowEqual)


  useEffect(() => {
    mapKeys(ENQUIRY_PARAM_MAP, (value, key) => {
      dispatch(getEnquiryParamById(key))
    })
    dispatch(getParamById('T'))
  }, [])

  const onChange = (event, name) => {
    console.log('event: ', event.target.value, name)
    dispatch(setEnquiryListCriteria(name, event.target.value))
  }

  const onSearch = (e) => {
    e.preventDefault()
    dispatch(setEnquiryListCriteria('page', 0))
    dispatch(searchEnquiryList())
  }

  const reset = () => {
    dispatch(resetEnquiryListCriteria())
    dispatch(searchEnquiryList())
  }

  const onSelectChange = (type, ops) => {
    dispatch(setEnquiryListCriteria(type, ops))
  }

  const [disableVesselName, setDisableVesselName] = useState(false)
  const [disableSelect, setDisableSelect] = useState(false)
  useEffect(() => {
    shouldDisableName() ? setDisableVesselName(true) : setDisableVesselName(false)
    shouldDisableSelect() ? setDisableSelect(true): setDisableSelect(false)
  },[criteria?.typeIds, criteria.yearIds, criteria.dwtIds, criteria.teuIds, criteria.cbmIds, criteria.vesselName])

  const shouldDisableName = () => {
    if (!isEmpty(criteria.typeIds) || !isEmpty(criteria.yearIds) || !isEmpty(criteria.dwtIds) || !isEmpty(criteria.teuIds) || !isEmpty(criteria.cbmIds)) {
      return true
    }
    return false
  }

  const shouldDisableSelect = () => {
    if(!isEmpty(criteria.vesselName)) {
      return true
    }
    return false
  }

  const [openModal, setOpenModal] = useState(false)
  const hide = () => {
    dispatch(removeData('vessels'))
    setOpenModal(false)
  }

  const show = (e) => {
    setOpenModal(true)
  }

  const _onSelectedVessel = (vessel) => {
    //onSelectChange('vesselId', vessel.vesselId)
    onSelectChange('vesselName', vessel.vesselName)
    hide()
  }

  return (
    <>
      <FormWrapper onSearch={onSearch} reset={reset} gridCols='grid-cols-5'>
        <SearchInput name='vesselId' label='船舶名稱' value={criteria?.vesselName} disabled={disableVesselName} readOnly={true} onClick={show} placeholder='Search Vessel...'/>
        <MultiSelect name='typeIds' label='Type' onChange={(ops) => onSelectChange('typeIds', ops)} options={paramTypeList} value={criteria?.typeIds} disabled={disableSelect}/>
        <MultiSelect name='yearIds' label='Age' onChange={(ops) => onSelectChange('yearIds', ops)} options={paramYearList} value={criteria?.yearIds} disabled={disableSelect}/>
        <MultiSelect name='dwtIds' label='Deadweight' onChange={(ops) => onSelectChange('dwtIds', ops)} options={paramDwtList}
                     value={criteria?.dwtIds} disabled={disableSelect}/>
        <MultiSelect name='teuIds' label='TEU' onChange={(ops) => onSelectChange('teuIds', ops)} options={paramTeuList} value={criteria?.teuIds} disabled={disableSelect}/>
        <MultiSelect name='cbmIds' label='CBM' onChange={(ops) => onSelectChange('cbmIds', ops)} options={paramCbmList} value={criteria?.cbmIds} disabled={disableSelect}/>
        <div className={`form-element`}>
          <div className='form-label'>收件日期</div>
          <div className={`form-element form-element-inline`}>
            <input
              name='receiveTimeStart'
              type='date'
              className='form-input w-full'
              placeholder=''
              onChange={(e) => onChange(e, 'receiveTimeStart')}
              value={criteria?.receiveTimeStart ?? ''}

            />
            <b>~</b>
            <input
              name='receiveTimeEnd'
              type='date'
              className='form-input w-full'
              placeholder=''
              onChange={(e) => onChange(e, 'receiveTimeEnd')}
              value={criteria?.receiveTimeEnd ?? ''}
            />
          </div>
        </div>
      </FormWrapper>
      <Modal
        height={ vessels?.length > 10 ? 'h-full' : 'h-hit'}
        title='選擇船舶'
        body={<SearchVesselModal onCancel={hide} onSelected={_onSelectedVessel} />}
        open={openModal}
        setOpen={setOpenModal}
        withFooter={false}
        width='w-3/4'
      />
    </>

  )
}

export default EnquirySearchForm
