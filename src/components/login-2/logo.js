import {FiBox} from 'react-icons/fi'
import {useSelector, shallowEqual} from 'react-redux'
import Link from 'next/link'

const Logo = () => {
  const {config} = useSelector(
    (state) => ({
      config: state.config.toJS()
    }),
    shallowEqual
  )
  const {name} = {...config}
  return (
    <div className="uppercase font-bold text-base tracking-wider flex flex-row items-center justify-start w-full whitespace-nowrap">
      <Link href="/">
        <a className="flex flex-row items-center justify-start space-x-2">
          {/*<FiBox size={28} />*/}
          <span>{name}</span>
        </a>
      </Link>
    </div>
  )
}

export default Logo
