import { ToastContainer, Zoom } from 'react-toastify'
const Index = ({title, subtitle, children}) => {
  return (
    <div className="flex flex-col bg-white border border-gray-200 p-8 w-full max-w-xl">
      <ToastContainer
        transition={Zoom}
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        draggable
      />
      <div className="flex flex-col w-full mb-4 text-center">
        <div className="text-xs uppercase">{title}</div>
        <div className="text-lg font-bold">{subtitle}</div>
      </div>
      {children}
    </div>
  )
}

export default Index
