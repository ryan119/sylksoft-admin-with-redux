import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import Button from 'components/common/Button'
import { getMineMailGroup } from 'components/setting/action'
import { saveAs } from 'file-saver'
import { forEach, map } from 'lodash'
import dynamic from 'next/dynamic'
import React, { useEffect, useRef, useState } from 'react'
import { FormProvider, get, useForm, useFormContext } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { convertBase64, setLoading } from 'src/actions/common'
import Error from 'src/base-components/form/error'
import { Help } from 'src/base-components/form/hooks/useAutoComplete/components/Tag'
import MultiEmailInput from 'src/base-components/form/multi-email-input'
import { TextInput } from 'src/base-components/form/text-input'
import Upload from 'src/base-components/form/upload'
import { validFileSize } from 'src/base-components/form/upload/validation'
import Widget from 'src/base-components/role/widget'
import Spinner from 'src/base-components/spinner'

const SendMailModal = ({ onSubmit, onCancel, selected }) => {
  const dispatch = useDispatch()
  const DynamicEditor = dynamic(() => import('src/base-components/form/textarea/ckeditor5'), {
    ssr: false,
    //loading: () => <div>Loading...</div>
  })

  const { mineMailGroup, loading } = useSelector((state) => {
    return {
      mineMailGroup: state.settingMgmt.get('mineMailGroup')?.toJS(),
      loading: state.common.get('loading')
    }
  })
  const methods = useForm()

  useEffect(() => {
    dispatch(getMineMailGroup())
  }, [])

  //因自行輸入的input 非controlled，故送出前針對性驗證是否有值存在
  const preSubmitCheck = (values) => {
    if(values.choose === '1' && values.receivers.length ===0) {
      methods.setError('receivers', { type: 'manual', message:'This field is required'})
      return
    }else {
      methods.clearErrors('receivers')
    }

    onSubmit(values)
  }

  //收件者選項不為自行輸入時，清除Errors
  useEffect(() => {
    if(methods.watch('choose') !== '1') {
      methods.clearErrors('receivers')
    }
  },[methods.watch('choose')])

  return (
    <Widget>
      <Spinner isLoading={loading} />
      <FormProvider {...methods}>
        <form className='text-base'>
          <TextInput name='subject' label='電文主旨' inline={true} inputWidth='w-full' />
          <ReceiverForm label='收件者' inline={true} inputWidth='w-full' selected={selected} />
          <Attachment name='attaches' label='附件' inline={true} inputWidth='w-full' />
          <DynamicEditor label='郵件內容' name='content' />

          <div className='text-center items-center'>
            <Button label='送出' color='primary' onClick={methods.handleSubmit(preSubmitCheck)} />
            <Button label='關閉' color='gray' onClick={onCancel} />
          </div>
        </form>
      </FormProvider>
    </Widget>
  )
}

export default SendMailModal

const Attachment = ({ name, label, inline, inputWidth }) => {
  const dispatch = useDispatch()
  const [resetKey, setResetKey] = useState(0)
  const [fileList, setFileList] = useState([])
  const { register, setValue, getValues, formState: { errors } } = useFormContext()
  const handleDeleteItem = (fileId) => {
    const action = () => {
      console.log('fileId: ', fileId)
      setFileList((prev) => prev.filter((item, idx) => idx !== fileId))
    }
    action()
    //confirmDelete(action, '確定移除附件檔案', '移除後需重新上傳')
  }

  const handleResetUpload = () => {
    setResetKey((prev) => prev + 1)
    setFileList([])
  }

  const handleOnChane = async (files) => {
    dispatch(setLoading(true))

    console.log('files: ', files)
    const cb = () => {
      setResetKey((prev) => prev + 1)
    }

    forEach(files, async (file) => {
      if (file) {
        if (await validFileSize(file, cb)) {
          const base64 = await convertBase64(file)
          setFileList((prev) => [
            ...prev,
            {
              fileName: file.name,
              url: window.URL.createObjectURL(file),
              content: base64,
              contentType: file.type,
              size: file.size
            }
          ])
        }
      }
    })

    dispatch(setLoading(false))
  }

  const isMount = useRef(false)
  useEffect(() => {
    if (!isMount.current) {
      isMount.current = true
      return
    }

    if (fileList.length > 0) {
      const files = map(fileList, (f) => f)
      setValue(name, files)
    }
  }, [fileList])

  return (
    <div className={`pt-4 ${inline ? 'lg:flex lg:flex-1' : ''}`}>
      <div className={`${inline ? `flex-none w-32` : 'flex'}`}>
        <div className='flex-1 form-label'>{label}</div>
      </div>
      <div className={`${inputWidth}`}>
        <Upload
          accept='*/*'
          multiple={true}
          resetKey={resetKey}
          onChange={handleOnChane}
        >
          <Button label='新增附件' color='primary' textSize='lg:text-xm'/>
        </Upload>
        <Help>(檔案限制 25M)</Help>
        {
          fileList?.map((file, idx) => (
            <div className={`flex pt-4`} key={idx}>
              <p className='cursor-pointer' onClick={() => {
                saveAs(file.url, file.fileName)
              }}>
                {file.fileName} ({(Math.round(file.size / 1024))} KB)
              </p>

              <div
                onClick={() => handleDeleteItem(idx)}
              >
                <DeleteOutlineIcon />
              </div>
            </div>
          ))
        }

      </div>
    </div>
  )
}

const ReceiverForm = ({ type, label, inline, inputWidth, selected, ...props }) => {

  const { mineMailGroup } = useSelector((state) => {
    return {
      mineMailGroup: state.settingMgmt.get('mineMailGroup')?.toJS()
    }
  })

  const { register, reset, watch, formState: { errors } } = useFormContext()
  //當Selected 有值時，表示外部勾選電文，預設將choose設為自行輸入(1)，並將receivers 傳入
  const receivers = map(selected, (s) => s.sender)
  useEffect(() => {
    reset({
      receivers: receivers,
      choose: selected?.length > 0 ? '1' : undefined
    })
  }, [selected?.length])

  return (
    <div className={`${inline ? 'lg:flex lg:flex-1' : ''}`}>
      <div className={`${inline ? `flex-none w-32` : 'flex'}`}>
        <div className='flex-1 form-label'>{label}</div>
      </div>
      <div className={`${inputWidth}`}>
        <div className='w-full'>
          <div className='form-element'>
            <div className='lg:inline-flex items-center lg:space-x-2 '>

              <label className='w-32'>
                <input className='mr-2' type='radio'
                       name='choose' {...register('choose', { required: 'This field is required' })} value='1' />自行輸入
                <Error errors={errors} name='choose' />
              </label>
              <div className='w-full'>
              <MultiEmailInput
                options={[]}
                values={receivers}
                label='Tags'
                name='receivers'
                inline={true}
                noteMsg='輸入Email後請按Enter'
              />
              <Error errors={errors} name='receivers' />
              </div>
              {/*<input
                name='receivers'
                type='text'
                className={`${get(errors, 'receivers') ? 'form-input form-input-invalid ' : 'form-input'} disabled:bg-gray-100`}
                placeholder={placeholder}
                disabled={watch('choose') === '2'}
                {...register('receivers', watch('choose') ==='1' ? {required: 'This field is required'} : {required:false})}
                {...props}
              />*/}

            </div>

          </div>

          <div className='form-element'>
            <div className='lg:inline-flex items-center lg:space-x-2'>

              <label className='w-32'>
                <input className='mr-2' type='radio'
                       name='choose' {...register('choose', { required: 'This field is required' })} value='2' />收件群組
                <Error errors={errors} name='choose' />
              </label>
              <div className='w-full'>
              <select
                className={`${get(errors, 'mailGroupId') ? 'form-select form-select-invalid' : 'form-select'} disabled:bg-gray-100`}
                name='mailGroupId'
                disabled={watch('choose') === '1'}
                {...register('mailGroupId', watch('choose') === '2' ? { required: 'This field is required' } : { required: false })}
                {...props}
              >
                <option value='' disabled={props.readonly}>
                  Please Select
                </option>
                {mineMailGroup?.map((option, idx) => (
                  <option
                    key={idx}
                    disabled={props.readonly}
                    value={option['id']}
                  >
                    {option['label']}
                  </option>
                ))}
              </select>
              <Error errors={errors} name='mailGroupId' />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
