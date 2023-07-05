import React, { useEffect, useState } from 'react'
import { get, useFormContext } from 'react-hook-form'
import Error from 'src/base-components/form/error'
import useAutoComplete from 'src/base-components/form/hooks/useAutoComplete'
import ListBox from 'src/base-components/form/hooks/useAutoComplete/components/ListBox'
import { Help, Tag } from 'src/base-components/form/hooks/useAutoComplete/components/Tag'
import autoStyles from 'src/styles/scss/use-autocomplete.module.scss'
import { find, map, isArray } from 'lodash'

const MultiRoleInput = ({
  required,
  inline = true,
  inputWidth = 'w-full',
  labelWidth = 'w-32',
  options = [],
  values=[],
  name,
  label,
  ...props
}) => {
  const { register, setValue, clearErrors, watch, trigger, getValues, formState: { errors } } = useFormContext()
  const [newTag, setNewTag] = useState('')
  const [tags, setTags] = useState([])
  register(name, {
    required: 'This filed is required',
    validate: (value, formValues) => {
      return value?.length > 0
    }})
  const { bindInput, bindOptions, bindOption, isBusy, suggestions, selectedIndex, open } = useAutoComplete({
    onChange: (value, callback) => {
      //console.log('selected value: ', value)
      if (!(tags?.some(t => t['label'] === value['label']))) {
          setValue(name, tags?.concat(value))
          setNewTag('')
          setTags([...tags?.concat(value)])
      }

      if (typeof callback === 'function') {
        callback()
      }
      trigger(name)
    },
    source: (search) => {
      if (search) {
        return options.filter(option => new RegExp(`^${search}`, 'i').test(option.label))
      } else {
        return options
      }
    },
    defaultOptions: options.filter((option) => !(tags?.some(t => t?.id === option?.id)))
  })

  useEffect(() => {
    if(isArray(watch(name))) {
      const tags = map(watch(name), (v) => {
        if(typeof v === 'string') {
          return find(options, o => o.id === v)
        }else {
          return v
        }
      })
      setTags(tags)
      setValue(name, tags)
    }else if(watch(name)){
      setTags(watch(name) ?? [])
      setValue(name, watch(name) ?? [])
    }
  }, [watch(name)?.length])

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
    <div className={`${inline ? 'lg:flex lg:flex-1' : ''} mb-2`}>
      <div className={`form-element ${inline ? `flex-none ${labelWidth}` : 'flex'}`}>
        <div className={`flex-1 form-label ${required ? 'required' : ''}`}>{label}</div>
      </div>
      <div style={{ position: 'relative' }} className={inputWidth}>
        <div className={`bg-white ${autoStyles.inputWrapper} ${get(errors, name) ? autoStyles.error : ''}`}>
          {map(tags, (v, idx) => <Tag key={idx} label={v?.label} onDelete={handleRemoveTag} show={true} />)}
          <input
            className='form-input disabled:bg-gray-100'
            style={{ height: '34px', border: '1px #6b7280' }}
            type='text'
            {...bindInput}
          />
        </div>

        { get(errors, name) ? <Error errors={errors} name={name} /> : (<Help>{props.noteMsg}</Help>) }

        <ListBox
          bindOptions={bindOptions}
          bindOption={bindOption}
          selectedIndex={selectedIndex}
          suggestions={suggestions}
        />
      </div>
    </div>
  )
}

MultiRoleInput.defaultProps = {
  required: true,
  placeholder: '',
  readonly: false,
  inline: false,
  children: undefined
}
export default MultiRoleInput


