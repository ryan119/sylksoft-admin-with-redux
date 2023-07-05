import React from "react";

function Spinner({isLoading, children, loadingClassName}) {

  const renderChildrenComponent = (children) => {
    return children ? children : null
  }
  return isLoading ? (
    <>
      <div className={loadingClassName}>
        <svg className="spinner" viewBox="0 0 50 50">
          <circle
            className="path"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth="5"
          />
        </svg>
      </div>
    </>
  ): (
     renderChildrenComponent(children)
  )
}

Spinner.defaultProps = {
  isLoading: false,
  loadingClassName: 'spinner-overlay fullscreen'
}

export default Spinner;

