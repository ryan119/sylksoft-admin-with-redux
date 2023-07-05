import Button from 'components/common/Button'
import Ellipsis from 'components/common/ellipsis'
import { downloadAttach } from 'components/emsg/action'
import { getVesselAttaches, updateVesselAttach } from 'components/ship/action'
import EditAttachmentForm from 'components/ship/attachment/edit-attachment'
import EmailForm from 'components/ship/emsg/email-form'
import ShipInfo from 'components/ship/ship-info'
import { omit } from 'lodash'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import Modal from 'src/base-components/modal/index2'
import Datatable from 'src/base-components/react-table'
import { Paginated } from 'src/base-components/react-table/paginated'
import { formatDatetimePatternDash } from 'src/functions/date-format'
import { saveAs } from 'file-saver'

const AttachmentList = () => {
  const router = useRouter()

  const menu = useSelector(state => state.member.get('menu')?.toJS(), shallowEqual)
  const dispatch = useDispatch()
  const vesselId = router.query.vesselId
  const { loading, attachInfo } = useSelector((state) => {
    return {
      loading: state.common.get('loading'),
      attachInfo: state.ship.get('attachInfo')?.toJS()
    }
  }, shallowEqual)

  useEffect(() => {
    dispatch(getVesselAttaches(vesselId))
  }, [vesselId])

  const [openDocx, setOpenDocx] = useState(false)
  const [docUrl, setDocUrl] = useState('')
  const [orgData, setOrgData] = useState({})
  const previewAttacth = ({ link, fileName }) => {
    const showContent = (data) => {
      try {
        const mimeType = getMimeTypeFromExtension(fileName)
        if (mimeType) {
          const blob = new Blob([data], { type: mimeType })
          const url = URL.createObjectURL(blob)
          setDocUrl(url)
          setOpenDocx(true)
          setOrgData({ fileName, data })
        } else {
          saveAs(data, fileName)
        }
      } catch (error) {
        console.log('blob: ', error)
      }
    }
    dispatch(downloadAttach(link, showContent))
    //dispatch(downloadAttach(link, (data) => saveAs(data, fileName)))
  }

  const closePreview = () => {
    setOpenDocx(false)
    setOrgData(null)
    setDocUrl('')
  }
  const download = () => {
    if (orgData) {
      saveAs(orgData.data, orgData.fileName)
    }
  }

  const columns = [
    //{ Header: '功能', accessor: 'actions' },
    {
      Header: '電文主旨', accessor: 'subject', Cell: (v) => {
        return (
          <Ellipsis variants='lg:w-80 w-48'>
            <span
              title={v.value}
              className='text-blue-500 underline hover:text-blue-600 cursor-pointer'
              onClick={() => showMsgModal(v.row.values)}
            >{v.value}
            </span>
          </Ellipsis>
        )
      }
    },
    {
      Header: '附件檔案', accessor: 'fileName', Cell: (v) => {
        return (
          <Ellipsis variants='lg:w-[500px] w-60'>
            <span
              className='text-blue-500 underline hover:text-blue-600 cursor-pointer'
              title={v.value}
              onClick={() => previewAttacth(v.row.values)}
            >{v.value}</span>
          </Ellipsis>
          /*<div className='text-blue-500 underline hover:text-blue-600 cursor-pointer'
               onClick={() => previewAttacth(v.row.values)}>{v.value}</div>*/
        )
      }
    },
    { Header: '寄件者', accessor: 'sender', Cell: v => <Ellipsis variants='lg:w-48 w-32'><span title={v.value}>{v.value}</span></Ellipsis> },
    { Header: '收件時間', accessor: 'receivedTime', Cell: (v) => formatDatetimePatternDash(v.value) },
    { Header: 'link', accessor: 'link' },
    { Header: 'attachId', accessor: 'attachId' },
    { Header: 'emsgId', accessor: 'emsgId' }
  ]


  const [openMsgModal, setOpenMsgModal] = useState(false)
  const [emsgId, setEmsgId] = useState()

  const showMsgModal = (item) => {
    setEmsgId(item.emsgId)
    setOpenMsgModal(true)
  }

  const closeMsgModal = () => {
    setOpenMsgModal(false)
  }

  const actionsOfList = [
    {
      index: 'edit',
      func: (data) => show(data)
    }
  ]
  const [openModal, setOpenModal] = useState(false)
  const [editData, setEditData] = useState()

  const handleUpdate = (values) => {
    const cb = () => {
      dispatch(getVesselAttaches(vesselId))
      hide()
    }
    dispatch(updateVesselAttach(values, cb))
  }

  const hide = () => {
    setEditData(null)
    setOpenModal(false)
  }

  const show = (values) => {
    setEditData(values)
    setOpenModal(true)
  }

  const right = (
    <>
      <Modal
        body={
          <EditAttachmentForm
            onCancel={hide}
            data={editData}
            onSubmit={handleUpdate}
          />
        }
        title='修改附件檔名'
        open={openModal}
        setOpen={setOpenModal}
        withFooter={false}
        width='w-2/4'
      />
    </>
  )

  return (
    <>
      <ShipInfo data={omit(attachInfo, ['attaches'])} />

      {right}

      <div className='flex flex-col w-full'>
        <div className='overflow-x-scroll pb-2'>
          <Paginated
            isLoading={loading}
            columns={columns}
            actionsOfList={actionsOfList}
            data={attachInfo?.attaches ?? []}
            indexId='attachId'
            hiddenColumns={['attachId', 'emsgId', 'link', 'attachId']}
          >
            <div id='edit' className='w-4 mr-2 transform hover:text-purple-500 hover:scale-110'>
              <FiEdit size={18} />
            </div>
          </Paginated>

          {/*<Datatable
            isLoading={loading}
            columns={columns}
            actionsOfList={actionsOfList}
            data={attachInfo?.attaches ?? []}
            indexId='attachId'
            hiddenColumns={['attachId', 'emsgId', 'link', 'attachId']}
          >
            <div id='edit' className='w-4 mr-2 transform hover:text-purple-500 hover:scale-110'>
              <FiEdit size={18} />
            </div>
          </Datatable>*/}
        </div>

        <div className='flex justify-center mt-6'>
          <Button color='gray' label='回列表' onClick={() => router.push('/ship/list')} />
        </div>

        <Modal
          height='h-full'
          body={
            <EmailForm
              onCancel={closeMsgModal}
              emsgId={emsgId}
            />
          }
          title='電文紀錄內容'
          open={openMsgModal}
          setOpen={setOpenMsgModal}
          width='w-3/4'
        />

        <Modal
          title='附件內容'
          height={'h-fit'}
          body={
            <DocxPreview docxUrl={docUrl} />
          }
          open={openDocx}
          setOpen={closePreview}
          width='w-3/4'
          footerChild={(<Button color='primary' label='下載' onClick={download} />)}
        />
      </div>

    </>
  )
}

export default AttachmentList


function getMimeTypeFromExtension(filename) {
  const ext = filename.split('.').pop().toLowerCase()
  const mimeTypeMap = {
    // 示例 MIME 类型映射表，您可以根据需求添加更多映射关系
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    pdf: 'application/pdf'
    /* doc: 'application/msword',
     docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'*/
    // 添加更多扩展名和对应的 MIME 类型...
  }
  return mimeTypeMap[ext] || ''
}

function DocxPreview({ docxUrl }) {
  return (
    <iframe
      title='Document Preview'
      src={`${docxUrl}`}
      style={{ width: '100%', height: '600px' }}
      frameBorder='0'
    />
  )
}