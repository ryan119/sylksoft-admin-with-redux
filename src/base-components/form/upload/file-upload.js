import React, { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { FiUploadCloud } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { commonAlertError, setLoading, uploadFile } from 'src/actions/common'
import FormTitle from 'src/base-components/form/common/form-title'
import Error from 'src/base-components/form/error'
import Upload from 'src/base-components/form/upload/index'
import { confirmDelete, confirmMessage } from 'src/functions/page-alert'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import commonStyle from 'src/styles/scss/common.module.scss'
import { map } from 'lodash'

const AlertMessage = withReactContent(Swal)

const FileUpload = (
  { name, type, label, required, valid, readonly, placeholder,fileLimit=3, inline=true, ...props }) => {
  const { register, getValues, setValue, setError, trigger, formState: { errors } } = useFormContext()
  const [resetKey, setResetKey] = useState(0)
  const [fileList, setFileList] = useState([])

  useEffect(() => {
    const data = getValues(name)
    if(data) {
      setFileList(data??[])
    }
  }, [getValues(name)?.length])

  /*[
    {
      "id": "lovepin_1.jpeg",
      "url": "https://s3-ap-northeast-1.amazonaws.com/rain-storage/800f131140a21b3b6b484df656aee06b.jpeg",
      "mediaType": {
        id: 'image',
        label: 'Image'
      }
    },{
      "id": "2",
      "url": "https://rain-storage.s3.ap-northeast-1.amazonaws.com/lovepin_2.jpg",
      "mediaType": {
        id: 'image',
        label: 'Image'
      }
    },{
      "id": "3",
      "url": "https://rain-storage.s3.ap-northeast-1.amazonaws.com/lovepin_3.jpg",
      "mediaType": {
        id: 'image',
        label: 'Image'
      }
    }
  ]*/

  const dispatch = typeof props.dispatch === 'function' ? props.dispatch : useDispatch()

  register(name, { required: 'This is required filed' })
  const validation = (file) => new Promise((resolve, reject) => {
    if (file?.size > 10 * 1024 * 1024) {
      AlertMessage.fire({
        icon: 'warning',
        title: '上傳限制',
        text: '請勿超過10Mb限制',
        allowOutsideClick: false
      })
      resolve(false)
    } else {
      let img = new Image()
      img.src = window.URL.createObjectURL(file)
      img.onload = () => {
        const w = (img.width / 4) * 3
        if (img.height !== w) {

          AlertMessage.fire({
            icon: 'warning',
            title: '圖檔比例需為4:3',
            text: `請確認比例: ${img.width} x ${img.height}`,
            allowOutsideClick: false
          })
          resolve(false)
        } else {
          console.log('img:', img)
          resolve(true)
        }
      }
    }
  })

  const isMount = useRef(false)
  useEffect(() => {

    if (!isMount.current) {
      isMount.current = true
      return
    }
    if (fileList.length > 0) {
      const medias = map(fileList, (f, idx) => {
        return {
          ...f,
          sortOrder: idx+1,
        }
      })
      setValue(name, medias)
      trigger(name)
    }

  }, [fileList])

  const handleOnPreview = async (files) => {
    dispatch(setLoading(true))
    console.log('files: ', files)
    const file = files[0]
    if (file) {
      if (await validation(file)) {
        const upload = dispatch(uploadFile(file))
        upload
          .then((res) => {
            const result = res.files[0]
            setFileList((prev) => [
              ...prev,
              {
                fileName: result.fileName,
                url: result.filePath,
                mediaType: result.mediaType
              }
            ])
          })
          .catch((err) => {
            dispatch(commonAlertError(err))
          })
          .finally(() => {
            dispatch(setLoading(false))
            setResetKey((prev) => prev + 1)
          })
      } else {
        dispatch(setLoading(false))
      }
    } else {
      dispatch(setLoading(false))
    }
  }

  const handleDeleteItem = (fileId) => {

    const action = () => {
      console.log('fileId: ', fileId)
      setFileList((prev) => prev.filter((item, idx) => idx !== fileId))
    }
    confirmDelete(action)

  }

  const handleResetUpload = () => {
    setResetKey((prev) => prev + 1)
    setFileList([])
  }

  console.log('fileList: ', fileList)
  console.log('values: ', getValues())
  return (
    <div className='lg:flex lg:flex-1 lg:pr-4'>

      <FormTitle label={label} inline={inline}/>

      <div className={props.inputWidth ? props.inputWidth : 'lg:w-5/6'}>
        <div className='w-full'>
          <div className='form-element'>
            <div className='grid lg:grid-cols-4 gap-12'>
              {
                fileList?.map((file, idx) => (
                  <div className={commonStyle.picture_item} key={idx}>
                    <img src={file.url} alt='' style={{ objectFit: 'cover' }} />
                    <div
                      className={`${commonStyle.delete_button_mask} ${commonStyle.picture_item_delete_button}`}
                      onClick={() => handleDeleteItem(idx)}
                    >
                      <DeleteOutlineIcon/>
                    </div>
                  </div>
                ))
              }

              <Upload
                accept='image/*'
                multiple={true}
                resetKey={resetKey}
                onChange={handleOnPreview}
              >
                { fileList?.length < fileLimit ? (
                  <div
                    className='flex flex-col items-center justify-center w-[400px] h-[300px] border border-black border-dashed rounded cursor-pointer hover:border-blue-500 border-transparent border-2'>
                    <div style={{ fontSize: 32 }}>＋</div>
                    <div>上傳照片</div>
                  </div>
                ): undefined }
              </Upload>

            </div>

            <Error errors={errors} name={name} />
          </div>

        </div>
      </div>
    </div>

  )
}

export default FileUpload
