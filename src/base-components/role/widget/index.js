import PropTypes from 'prop-types'
import CreateButton from 'src/base-components/auth/link-button'

const Widget = ({title = null, description = null, right = null,searchForm=null,  children}) => {
  return (
    <div id='widget' className="widget w-full p-4 mb-4 rounded-lg bg-gray-100 border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
      {(title || description || right || searchForm) && (
        <>
        {searchForm}
        <div className="flex flex-row items-center justify-between">
          {right}
          <div className="flex flex-col">
            <div className="text-sm font-light text-gray-500">{title}</div>
            <div className="text-sm font-bold">{description}</div>
          </div>

        </div>
        </>
      )}
      {children}
    </div>
  )
}

Widget.propTypes = {
  title: PropTypes.any,
  description: PropTypes.any,
  right: PropTypes.any,
  children: PropTypes.any
}
export default Widget
