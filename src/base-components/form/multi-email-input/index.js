import CloseIcon from '@material-ui/icons/Close'
import React, { useEffect, useState } from 'react'
import { get, useFormContext } from 'react-hook-form'
import useAutoComplete from 'src/base-components/form/hooks/useAutoComplete'
import ListBox from 'src/base-components/form/hooks/useAutoComplete/components/ListBox'
import { Help, Tag } from 'src/base-components/form/hooks/useAutoComplete/components/Tag'
import autoStyles from 'src/styles/scss/use-autocomplete.module.scss'
import { flatten, map, uniq } from 'lodash'

const MultiEmailInput = ({
                           options = [],
                           limit,
                           values = [],
                           name,
                           label,
                           valid = { required: 'This filed is required' },
                           ...props
                         }) => {
  const { control, register, setValue, trigger,clearErrors, watch, setError, getValues, formState: { errors } } = useFormContext()
  const [newTag, setNewTag] = useState('')
  const [tags, setTags] = useState([])

  const { bindInput, bindOptions, bindOption, isBusy, suggestions, selectedIndex, open } = useAutoComplete({
    onChange: (value, callback) => {
      const arr = value.split(/[;,]/).map((v) => v.trim())
      let hasError = false
      let errorEmails = []
      arr.forEach((v, idx) => {
          if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v))) {
            hasError=true
            errorEmails.push(v)
          }
      })

      if(hasError) {
        setError(name, { type: 'manual', message: `invalid email address: ${flatten(errorEmails)}` })
      }else {
        setValue(name, uniq(tags.concat(arr)))
        setNewTag('')
        setTags([...uniq(tags.concat(arr))])
        clearErrors(name)
      }

      if (typeof callback === 'function') {
        callback()
      }
    },
    source: (search) => {
      if (search) {
        return options.filter(option => new RegExp(`^${search}`, 'i').test(option.label))
      } else {
        return options
      }
    },
    defaultOptions: options.filter((option) => !tags.includes(option.label))

  })

  useEffect(() => {
    console.log('watch: ', watch(name))
    setTags(watch(name) ?? [])
  }, [values])

  const handleRemoveTag = (e) => {
    let tag = e.target.parentNode.textContent.trim()
    let index = tags.indexOf(tag)
    const tmp = [...tags]
    tmp.splice(index, 1)
    setValue(name, tmp)
    setNewTag('')
    setTags(tmp)
  }


  return (

    <div style={{ position: 'relative' }} className='w-full'>
      <div className={`bg-white ${autoStyles.inputWrapper} ${get(errors, name) ? autoStyles.error : ''}`}>
        { map(tags, (v, idx) => <Tag key={idx} label={v} onDelete={handleRemoveTag} show={true} />)}
        <input
          className='form-input disabled:bg-gray-100'
          style={{ height: '34px', border: '1px #6b7280' }}
          type='text'
          readOnly={watch('choose') === '2'}
          disabled={watch('choose') === '2'}
          //onChange={handleChange}
          //onKeyDown={handleKeyDown}
          {...bindInput}
        />
      </div>
      {get(errors, name) ? undefined : (<Help>{props.noteMsg}</Help>)}

      <ListBox
        bindOptions={bindOptions}
        bindOption={bindOption}
        selectedIndex={selectedIndex}
        suggestions={suggestions}
      />


    </div>
  )
}

export default MultiEmailInput

