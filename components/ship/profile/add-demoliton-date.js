import Button from 'components/common/Button'
import React, { useEffect } from 'react'
import { TextInput } from 'src/base-components/form/text-input'
import Widget from 'src/base-components/role/widget'


const AddDemolitionDate = ({ onCancel }) => {

  return (
    <>
      <Widget>
        <TextInput type='date' name='demolitionDate' label='Demolition Date' inputWidth='w-full' inline={true}
                   labelWidth='w-32' required={false}/>
        <div className='flex justify-center pt-2'>
          <Button color='primary' label='確定' onClick={() => onCancel()} />
        </div>
      </Widget>
    </>
  )
}

export default AddDemolitionDate