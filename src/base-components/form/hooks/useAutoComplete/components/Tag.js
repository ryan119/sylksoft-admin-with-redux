import CloseIcon from '@material-ui/icons/Close'
import React from 'react'
import autoStyles from 'src/styles/scss/use-autocomplete.module.scss'

export const Tag = ({ label, onDelete, show, ...props }) => (
  <div {...props} className={autoStyles.inputTag}>
    <span>{label}</span>
    <CloseIcon onClick={onDelete} />
  </div>
)

export const Help = props => <span className={autoStyles.help} {...props} />