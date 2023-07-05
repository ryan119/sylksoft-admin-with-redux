import { sumBy } from 'lodash'
import { alertWarningMessage } from 'src/functions/page-alert'


function validFileSize(file, callback) {
  return new Promise((resolve, reject) => {
    if (file?.size > 25 * 1024 * 1024) {
      alertWarningMessage('上傳限制', '請勿超過25MB限制', callback)
      resolve(false)
    }
    resolve(true)
  })
}

function validFilesTotalSize(files, callback) {
  const totalSize = sumBy(files, 'size')
  return new Promise((resolve, reject) => {
    if (totalSize > 25 * 1024 * 1024) {
      alertWarningMessage('上傳限制', '請勿超過25MB限制', callback)
      resolve(false)
    }
    resolve(true)
  })
}

export { validFileSize, validFilesTotalSize }
