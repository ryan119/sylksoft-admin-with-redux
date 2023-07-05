import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FiLogOut } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import * as actions from 'src/actions/actionTypes'

const AccountLinks = () => {
  const webUrl = process.env.NEXT_PUBLIC_APP_URL
  const router = useRouter()
  const dispatch = useDispatch()
  const items = [
    /* {
       url: '/',
       icon: <FiMail size={18} className="stroke-current" />,
       name: 'Inbox',
       badge: {
         number: 2,
         color: 'bg-red-500 text-white'
       }
     },
     {
       url: '/',
       icon: <FiStar size={18} className="stroke-current" />,
       iconColor: 'default',
       name: 'Messages',
       badge: {
         number: 3,
         color: 'bg-blue-500 text-white'
       }
     },
     {
       url: '/extras/user-profile',
       icon: <FiUser size={18} className="stroke-current" />,
       name: 'Profile',
       badge: null
     },*/
    {
      url: '#',
      icon: <FiLogOut size={18} className='stroke-current' />,
      name: 'Logout',
      badge: null,
      action: () => {
        //TODO: signOut 直接用redirect, URL 都是Localhost，有時間請查明
        signOut({
          callbackUrl: `${webUrl}/login`,
          redirect: false
        }).then((props) => {
          dispatch({ type: actions.GET_MENU, payload: undefined})
          router.replace('/login')
        })
      }
    }
  ]
  return (
    <div className='flex flex-col w-full'>
      <ul className='list-none'>
        {items.map((item, i) => (
          <li key={i} className='dropdown-item' onClick={(e) => item?.action(e)}>
            {item?.name === 'Logout' ? (
              <a className='flex flex-row items-center justify-start h-10 w-full px-2'>
                {item.icon}
                <span className='mx-2'>{item.name}</span>
                {item.badge && (
                  <span
                    className={`uppercase font-bold inline-flex text-center p-0 leading-none text-2xs h-4 w-4 inline-flex items-center justify-center rounded-full ${item.badge.color} ml-auto`}>
                    {item.badge.number}
                  </span>
                )}
              </a>
            ) : (
              <Link href={item.url}>
                <a className='flex flex-row items-center justify-start h-10 w-full px-2'>
                  {item.icon}
                  <span className='mx-2'>{item.name}</span>
                  {item.badge && (
                    <span
                      className={`uppercase font-bold inline-flex text-center p-0 leading-none text-2xs h-4 w-4 inline-flex items-center justify-center rounded-full ${item.badge.color} ml-auto`}>
                    {item.badge.number}
                  </span>
                  )}
                </a>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AccountLinks
