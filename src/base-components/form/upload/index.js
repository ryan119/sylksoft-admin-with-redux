import PropTypes from 'prop-types'
import React, { useRef } from 'react'

const Upload = ({
                  resetKey,
                  children,
                  onChange,
                  ...props
                }) => {
  const inputFileRef = useRef()

  const handleOnClickUpload = () => {
    inputFileRef.current.click()
  }

  const handleOnChange = (event) => {
    if (typeof onChange === 'function') {
      console.log('files: ', event?.target.files)
      onChange(event?.target?.files)
    }
  }

  return (
    <>
      <input
        key={resetKey}
        ref={inputFileRef}
        type='file'
        style={{ display: 'none' }}
        onChange={handleOnChange}
        {...props}
      />
      {

        children && React.cloneElement(children, {
          onClick: handleOnClickUpload
        })
      }
    </>
  )
}

Upload.propTypes = {
  /**
   * 重設鍵值，鍵值被改變時 input value 會被重設
   */
  resetKey: PropTypes.number,
  /**
   * 限制檔案類型
   */
  accept: PropTypes.string,
  /**
   * 是否選取多個檔案
   */
  multiple: PropTypes.bool,
  /**
   * 選取上傳檔案時的 callback
   */
  onChange: PropTypes.func,
  /**
   * 內容，這邊指的是上傳按鈕外觀
   */
  children: PropTypes.element.isRequired
}

Upload.defaultProps = {
  resetKey: 0,
  accept: undefined,
  multiple: false,
  onChange: () => {
  }
}

export default Upload
