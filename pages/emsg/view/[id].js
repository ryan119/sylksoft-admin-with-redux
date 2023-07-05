import Button from 'components/common/Button'
import {
  addEmsgMatch,
  deleteEmsg, downloadAttach,
  getEmsgInfo,
  removeEmsgInfo,
  sendEmail,
  updateEmsgStatus
} from 'components/emsg/action'
import { parserContent } from 'components/emsg/html-parser'
import MatchVesselModal from 'components/emsg/match-vessel'
import SendMailModal from 'components/emsg/send-mail-modal'
import { createEnquiry } from 'components/enquiry/action'
import EnquiryFomModal from 'components/enquiry/enquiry-fom-modal'
import { removeData, removeVesselEmsg } from 'components/ship/action'
import { saveAs } from 'file-saver'
import HTMLReactParser from 'html-react-parser'
import { forEach, map, omit } from 'lodash'
import { useRouter } from 'next/router'
import React, { isValidElement, useEffect, useState } from 'react'
import { FormProvider, get, useForm, useFormContext } from 'react-hook-form'
import ReactHtmlParser from 'react-html-parser'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { getEmsgMatchStatuses } from 'src/actions/common'
import StaticTable from 'src/base-components/datatable/static-table'
import { CheckboxGroup } from 'src/base-components/form/checkbox-group'
import FormTitle from 'src/base-components/form/common/form-title'
import Error from 'src/base-components/form/error'
import { ParseRadioInput } from 'src/base-components/form/radio-input/parse-radio-input'
import { TextInput } from 'src/base-components/form/text-input'
import { validFilesTotalSize } from 'src/base-components/form/upload/validation'
import Modal from 'src/base-components/modal/index2'
import Spinner from 'src/base-components/spinner'
import SectionTitle from 'src/components/section-title'
import { formatDatetimePatternDash } from 'src/functions/date-format'
import { confirmDelete } from 'src/functions/page-alert'
import parse, { domToReact } from 'html-react-parser'

const EmsgView = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const emsgId = router.query.id

  const { emsgInfo, matchStatuses, loading } = useSelector((state) => {
    return {
      loading: state.common.get('loading'),
      emsgInfo: state.emsgMgmt.get('emsgInfo')?.toJS(),
      matchStatuses: state.common.get('matchStatuses')?.toJS()
    }
  }, shallowEqual)

  useEffect(() => {
    dispatch(getEmsgMatchStatuses())
  }, [])

  useEffect(() => {
    const cb = () => {
      router.push('/emsg/list')
    }
    dispatch(getEmsgInfo(emsgId, cb))
    return () => {
      dispatch(removeEmsgInfo())
    }
  }, [emsgId])

  const methods = useForm({
    defaultValues: {
      ...emsgInfo,
      receiveTime: formatDatetimePatternDash(emsgInfo?.receiveTime)

    }
  })

  useEffect(() => {
    if (emsgInfo) {
      methods.reset({
        ...emsgInfo,
        receiveTime: formatDatetimePatternDash(emsgInfo?.receiveTime),
        //matchedVessels: emsgInfo.matchedVessels.map(v => v.vesselName).toString(),
        content: ReactHtmlParser(emsgInfo.content)
      })
    }
  }, [emsgInfo?.id, emsgId])

  const updateStatus = () => {
    const status = methods.watch('matchStatus')
    dispatch(updateEmsgStatus({ id: emsgId, matchStatus: status }))
  }

  //寄送作業
  const [openSendMail, setOpenSendMail] = useState(false)
  const _onSendMail = (values) => {
    const cb = () => {
      setOpenSendMail(false)
    }

    validFilesTotalSize(values.attaches).then((r) => {
      if (r) {
        dispatch(sendEmail(values, cb))
      }
    })
  }

  //新增船舶需求
  const [openEnquiry, setOpenEnquiry] = useState(false)
  function createSubmit(values) {
    const postData = { emsgId, ...values }
    const cb = () => { hideEnquiry() }
    dispatch(createEnquiry(postData, cb))
  }

  function hideEnquiry() {
    setOpenEnquiry(false)
  }

  function showEnquiry() {
    setOpenEnquiry(true)
  }

  const handleDeleteEmsg = (emsgId) => {
    confirmDelete(() => {
      const cb = () => { router.replace('/emsg/list')}
      dispatch(deleteEmsg({ids: [emsgId]}, cb))
    })
  }

  return (
    <>
      <SectionTitle title='' subtitle='電文記錄內容' />
      <Spinner isLoading={loading} />
      {emsgInfo ? (
        <FormProvider {...methods}>
          <form className='text-base'>
            <TextInput name='sender' label='寄件者' inline={true} inputWidth='w-full' disabled required={false}/>
            <TextInput name='receiveTime' label='收件時間' inline={true} inputWidth='w-full' disabled required={false}/>
            <TextInput name='subject' label='電文主旨' inline={true} inputWidth='w-full' disabled required={false}/>
            <ParseRadioInput name='matchStatus' label='配對結果' inline={true} inputWidth='w-256'
                             options={matchStatuses ?? []} required={false}>
              <Button label='變更結果' onClick={updateStatus} textSize='lg:text-sm' />
            </ParseRadioInput>

            <MatchVessel inline={true} matchedVessels={emsgInfo?.matchedVessels} label='媒合船舶' />

            <div className='flex lg:justify-left mb-4 lg:pl-32 lg:-mt-3 mt-3'>
              <Button
                color='primary'
                label='回列表'
                onClick={() => {
                  if (router.query.redirect === '') {
                    router.back()
                  } else {
                    router.push('/emsg/list')
                  }
                }}
              />
              <Button color='blue' label='新增船舶需求' onClick={showEnquiry} />
              <Button color='red' label='刪除' onClick={() => handleDeleteEmsg(emsgId)} />
              <Button color='blue' label='寄件作業' onClick={() => setOpenSendMail(true)}/>
            </div>

            <Content label='電文內容' name='content' rows={10} inputWidth='w-full' disabled data={emsgInfo.content} />
            <Attachment label='附件' inputWidth='w-full' attaches={emsgInfo.attaches} />



          </form>
        </FormProvider>

      ) : <Spinner isLoading={true} />}

      <Modal
        title='寄送作業'
        height='h-full'
        headerBg='bg-blue-900'
        body={<SendMailModal onCancel={() => setOpenSendMail(false)} onSubmit={_onSendMail} />}
        open={openSendMail}
        setOpen={setOpenSendMail}
        withFooter={false}
        width='w-3/4'
      />

      <Modal
        title='新增船舶需求'
        headerBg='bg-blue-900'
        body={<EnquiryFomModal mode='create' onCancel={hideEnquiry} onSubmit={createSubmit} btnColor='blue'/>}
        open={openEnquiry}
        setOpen={setOpenEnquiry}
        withFooter={false}
        width='w-3/4'
        height='h-full'
      />
    </>
  )
}

export default EmsgView

const Attachment = ({ inline, inputWidth, labelWidth = 'w-32', label, attaches }) => {
  const dispatch = useDispatch()
  const download = (item) => {
    dispatch(downloadAttach(item.link, (data) => saveAs(data, item.fileName)))
  }

  return (
    <div className='lg:flex lg:flex-1 mt-2'>
      <FormTitle label={label} inline={inline} width={labelWidth} required={false} />
      <div className={`flex-1 ${inputWidth ? inputWidth : 'lg:w-3/6'}`}>
        <div className='flex-1' style={{
          borderColor: '#6b7280',
          borderWidth: '1px',
          borderRadius: '0px',
          padding: '10px'
        }}>
          <div className='form-element'>
            <div className='form-textarea'>
              {attaches.length > 0 ? attaches.map((attach) => {
                return (
                  <p><a className='text-blue-600 hover:text-blue-700 underline' href='#'
                        onClick={() => download(attach)}>{attach.fileName}</a></p>
                )
              }) : 'N/A'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Content = (
  {
    inline, inputWidth, labelWidth = 'w-32', label, data
  }) => {

  return (
    <div className='lg:flex lg:flex-1'>
      <FormTitle label={label} inline={inline} width={labelWidth} required={false}/>
      <div className={`overflow-auto flex-1 ${inputWidth ? inputWidth : 'lg:w-3/6'}`}>
        <div className='overflow-auto' style={{
          borderColor: '#6b7280',
          borderWidth: '1px',
          borderRadius: '0px',
          padding: '10px'
        }}>

            { parserContent(data) }
        </div>
      </div>
    </div>
  )
}


const MatchVessel = ({ matchedVessels, inline, inputWidth, labelWidth = 'w-32', label }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const emsgId = router.query.id

  const columns = [
    { Header: 'Type', accessor: 'type' },
    { Header: 'Vessel Name', accessor: 'vesselName' },
    { Header: 'Deadweight', accessor: 'dwt' },
    { Header: 'Year', accessor: 'year' },
    { Header: '操作', accessor: 'action' }
  ]
  const [openModal, setOpenModal] = useState(false)
  const [editData, setEditData] = useState()
  const actionsOfList = [
    {
      index: 'removeMatch',
      func: (values) => removeMatch(values)
    }
  ]

  const removeMatch = (values) => {
    const postData = { vesselId: values.vesselId, emsgId }
    confirmDelete(() => {
      dispatch(removeVesselEmsg(postData, () => dispatch(getEmsgInfo(emsgId))))
    }, '確定移除關聯?', '移除此電文與船舶之關連!')

  }

  const hide = () => {
    dispatch(removeData('vessels'))
    setEditData(null)
    setOpenModal(false)
  }

  const show = () => {
    setOpenModal(true)
  }

  const _onSubmit = (values) => {
    const vesselIds = map(values, v => v.vesselId)
    const postData = { emsgIds: [emsgId], vesselIds }
    const cb = () => {
      dispatch(getEmsgInfo(emsgId))
      hide()
    }
    dispatch(addEmsgMatch(postData, cb))
  }

  return (
    <div className='lg:flex lg:flex-1'>
      <FormTitle label={label} inline={inline} width={labelWidth} required={false}/>
      <div className={inputWidth ? inputWidth : 'lg:w-4/6'}>
        <div className='flex-1'>
          <Button label='新增媒合船舶' onClick={() => show()} textSize='lg:text-sm' />
          <StaticTable columns={columns} data={matchedVessels} actionsOfList={actionsOfList}>
            <Button id='removeMatch' color='red' label='移除關聯' textSize='lg:text-sm' />
          </StaticTable>
        </div>
      </div>
      <Modal
        title='新增媒合船舶'
        body={<MatchVesselModal onCancel={hide} onSubmit={_onSubmit} />}
        open={openModal}
        setOpen={hide}
        withFooter={false}
        width='w-3/4'
        height={'h-full'}
      />
    </div>
  )
}

const CustomInput = ({
                       name, type, label, required, valid, readonly, placeholder, inline, inputWidth, children, ...props
                     }) => {
  const { register, formState: { errors } } = useFormContext()
  valid = (required && !props.disabled) ? valid : omit(valid, ['required'])
  return (
    <div className='lg:flex lg:flex-1 lg:pr-4'>

      <FormTitle label={label} inline={true} required={false}/>

      <div className={inputWidth ? inputWidth : 'lg:w-4/6'}>
        <div className='w-full'>
          <div className='form-element'>
            <input
              name={name}
              type={type}
              className={`${get(errors, name) ? 'form-input form-element-inline ' : 'form-input'} disabled:bg-gray-100`}
              placeholder={placeholder}
              {...register(name, valid)}
              {...props}
            />
            <Error errors={errors} name={name} />
          </div>

        </div>
      </div>
      <div className='lg:w-2/6 lg:px-4 lg:pb-0 pb-4'>
        {children}
      </div>
    </div>
  )
}
