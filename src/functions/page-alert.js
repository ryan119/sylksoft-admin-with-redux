import {useDispatch} from 'react-redux'
import Swal from "sweetalert2"
import withReactContent from 'sweetalert2-react-content'

const AlertMessage = withReactContent(Swal)

export const confirmDelete = (deleteAction, title='確定刪除', text='刪除後將無法復原') => {
  AlertMessage.fire({
    icon: 'warning',
    title: title,
    text: text,
    showCancelButton: true,
    cancelButtonText: '取消',
    confirmButtonColor: '#d33',
    cancelButtonColor: '#999',
    confirmButtonText: '確定',
    allowOutsideClick: false,
  }).then((result) => {
    //console.log('result: ', result)
    if(result.isConfirmed){
      deleteAction()
    }
  })
}

export const alertWarningMessage = (title='', message, cb) => {
  AlertMessage.fire({
    title: title,
    icon: 'warning',
    confirmButtonColor: '#ec6602',
    text: message,
    allowOutsideClick: false,
  }).then(() => {
    if(typeof cb === 'function'){
      cb()
    }
  })
}

export const confirmMessage = (action, title, text) => {
  AlertMessage.fire({
    icon: 'warning',
    title: title,
    text: text,
    showCancelButton: true,
    cancelButtonText: 'Cancel',
    cancelButtonColor: '#999',
    confirmButtonColor: '#ec6602',
    confirmButtonText: 'Save',
    allowOutsideClick: false,
  }).then((result) => {
    //console.log('result: ', result)
    if(result.isConfirmed){
      action()
    }
  })
}

/**
 * 編輯狀態下離開
 * @param callback
 * @param title
 * @param text
 */
export const exitConfirm = (callback, title, text) => {
  AlertMessage.fire({
    icon: 'warning',
    title: title,
    text: text,
    showCancelButton: true,
    cancelButtonText: 'Cancel',
    cancelButtonColor: '#999',
    confirmButtonColor: '#ec6602',
    confirmButtonText: 'OK',
    allowOutsideClick: false,
  }).then((result) => {
    //console.log('result: ', result)
    if(result.isConfirmed){
      callback()
    }
  })
}
