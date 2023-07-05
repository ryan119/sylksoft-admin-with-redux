import React from 'react'

function Ellipsis({variants, onClick, children}) {
  return (
    <div className={`${variants} overflow-ellipsis overflow-hidden whitespace-nowrap`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default Ellipsis