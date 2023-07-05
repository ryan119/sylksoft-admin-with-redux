import autoStyles from '/src/styles/scss/use-autocomplete.module.scss'
import CloseIcon from '@material-ui/icons/Close'
import { get } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import FormTitle from 'src/base-components/form/common/form-title'

const TagsInput = ({ limit, values = [], name, label,inline=true, valid = { required: 'This filed is required' }, ...props }) => {
  const [newTag, setNewTag] = useState('')
  const [tags, setTags] = useState([])
  console.log('tags:', tags)
  const {
    control,
    register,
    setValue,
    trigger,
    watch,
    setError,
    getValues,
    formState: { errors }
  } = useFormContext()
  useEffect(() => {
    setTags(getValues(name) ?? [])
  }, [values])

  const handleChange = (e) => {
    setNewTag(e.target.value)
  }

  const handleKeyDown = (e) => {

    if (e.keyCode === 13 && e.target.value !== '') {
      let tag = newTag.trim()
      if (tags?.indexOf(tag) === -1) {
        setValue(name, tags.concat(tag))
        setNewTag('')
        setTags([...tags.concat(tag)])
      }
      e.target.value = ''
      e.preventDefault()
    }
  }

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
    <div className='lg:flex lg:flex-1 lg:pr-4'>

      <FormTitle label={label} inline={inline}/>

      <div className={props.inputWidth ? props.inputWidth : 'lg:w-3/6'}>
        <div className='w-full'>
          <div className='form-element'>
            <div className={`${autoStyles.inputWrapper} ${get(errors, name) ? autoStyles.error : ''}`}>
              {tags?.map((v, idx) => <Tag key={idx} label={v} onDelete={handleRemoveTag} show={true} />)}
              <input
                className='form-input'
                style={{ height: '34px', border: '1px #6b7280' }}
                type='text'
                onChange={handleChange}
                onKeyDown={handleKeyDown} />
            </div>
            { get(errors, name) ? undefined : (<Help>{props.noteMsg}</Help>) }
          </div>

        </div>
      </div>
    </div>
  )
}

export default TagsInput


const Tag = ({ label, onDelete, show, ...props }) => (
  <div {...props} className={autoStyles.inputTag}>
    <span>{label}</span>
    <CloseIcon onClick={onDelete} />
  </div>
)

const Help = props => <span className={autoStyles.help} {...props} />
