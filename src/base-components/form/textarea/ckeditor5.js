import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import {CKEditor} from '@ckeditor/ckeditor5-react'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import {useFormContext, Controller} from 'react-hook-form'
import Error from 'src/base-components/form/error'

const CkEditor = ({name, label, inline=true}) => {
  const {control, formState: {errors}} = useFormContext()

  return (
    <>
    <div className="relative flex py-5 items-center">
      <div className="flex-grow border-t border-gray-400"></div>
      <span className="flex-shrink mx-4 text-gray-400">Content</span>
      <div className="flex-grow border-t border-gray-400"></div>
    </div>
    <div className='lg:flex lg:flex-1'>
      <div className='w-32 h-4 mb-4'>
        <div className='w-full'>
          <div className={`form-element ${inline ? 'form-element-inline' : ''}`}>
            <div className='form-label'>{label}</div>
          </div>
        </div>
      </div>
      <div className='w-full'>
        <div className='w-full mb-4'>
          <Controller
            name={name}
            control={control}
            rules={{required: 'This field is required'}}
            render={({ field: {onChange, value} }) => (
              <CKEditor
                editor={ClassicEditor}
                config={{
                  removePlugins: ['EasyImage','ImageUpload', 'MediaEmbed']
                }}
                data={value}
                onChange={(event, editor) => {
                  const data = editor.getData()
                  onChange(data)
                }}
              />
            )}
            />
            <Error errors={errors} name={name}/>
          </div>
        {/*</div>*/}
      </div>
    </div>
    </>
  )
}

CkEditor.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}

CkEditor.defaultProps = {
  required: true,
  rule: {required: 'This field is required'},
  inline: true,
}

export default CkEditor
