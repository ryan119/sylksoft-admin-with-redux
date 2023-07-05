import Button from 'components/common/Button'
import { getEmsgInfo, removeEmsgInfo } from 'components/emsg/action'
import { parserContent } from 'components/emsg/html-parser'
import { getVesselEmsgs } from 'components/ship/action'
import parse, { domToReact } from 'html-react-parser'
import { forEach, omit } from 'lodash'
import React, { useEffect } from 'react'
import { FormProvider, get, useForm, useFormContext } from 'react-hook-form'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import FormTitle from 'src/base-components/form/common/form-title'
import Error from 'src/base-components/form/error'
import { TextInput } from 'src/base-components/form/text-input'
import { TextArea } from 'src/base-components/form/textarea'
import Widget from 'src/base-components/role/widget'
import Spinner from 'src/base-components/spinner'
import { formatDatePatternDash, formatDatetimePatternDash } from 'src/functions/date-format'
//import parse, { domToReact } from 'html-react-parser'
import ReactHtmlParser from 'react-html-parser'

const EmailForm = ({ onSubmit, emsgId, onCancel }) => {

  const dispatch = useDispatch()
  const { emsgInfo, loading } = useSelector((state) => {
    return {
      loading: state.common.get('loading'),
      emsgInfo: state.emsgMgmt.get('emsgInfo')?.toJS()
    }
  }, shallowEqual)

  useEffect(() => {
    dispatch(getEmsgInfo(emsgId))
    return () => {
      dispatch(removeEmsgInfo())
    }
  }, [emsgId])

  const methods = useForm({
    defaultValues: {
      ...emsgInfo,
      receiveTime: formatDatetimePatternDash(emsgInfo?.receiveTime),

    }
  })

  useEffect(() => {
    if (emsgInfo) {
      methods.reset({
        ...emsgInfo,
        receiveTime: formatDatetimePatternDash(emsgInfo?.receiveTime),
        matchedVessels: emsgInfo.matchedVessels.map(v => v.vesselName).toString(),
        content: ReactHtmlParser(emsgInfo.content),
        sender: emsgInfo.sender,
      })
    }
  }, [emsgInfo?.id, emsgId])

  return (
    <>

        <Widget>
          { emsgInfo ? (
          <FormProvider {...methods}>
            <form className='text-base'>
              <TextInput name='sender' label='寄件者' inline={true} inputWidth='w-full' disabled />
              <TextInput name='receiveTime' label='收件時間' inline={true} inputWidth='w-full' disabled/>
              <TextInput name='subject' label='電文主旨' inline={true} inputWidth='w-full' disabled/>
              <CustomInput type='text' name='matchStatusLabel' inline={true} label='配對結果' disabled>
                {/*<button
                type='button'
                onClick={() => null}
                className='btn btn-default bg-teal-500 hover:bg-teal-600 text-white btn-rounded'>
                變更結果
              </button>*/}
              </CustomInput>
              <CustomInput type='text' name='matchedVessels' label='媒合船舶' disabled>
                {/*<button
                type='button'
                onClick={() => null}
                className='btn btn-default bg-teal-500 hover:bg-teal-600 text-white btn-rounded'>
                指定船舶
              </button>*/}
              </CustomInput>
              <Content label='電文內容' name='content' rows={10} inputWidth='w-full' disabled data={emsgInfo?.content}/>


            </form>
          </FormProvider>
          ): (<Spinner isLoading={loading} loadingClassName=''/>)}
        </Widget>
    </>
  )
}

export default EmailForm


const Content = (
  {
    inline, inputWidth, labelWidth='w-32', label, data
  }) => {
  //console.log('ReactHtmlParse: ', ReactHtmlParser(data) )

  return (
    <div className='lg:flex lg:flex-1'>
      <FormTitle label={label} inline={inline} width={labelWidth}/>
      <div className={`overflow-auto flex-1 ${inputWidth ? inputWidth : 'lg:w-3/6'}`}>
        <div className='overflow-auto' style={{
          borderColor: '#6b7280',
          borderWidth: '1px',
          borderRadius:'0px',
          padding:'10px'
        }}>
          <div className='form-element'>
            <div className='form-textarea'>
              {/*{ ReactHtmlParser(data) }*/}
              { parserContent(data) }
            </div>
          </div>
        </div>
      </div>
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

      <FormTitle label={label} inline={true} />

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
        { children }
      </div>
    </div>
  )
}
