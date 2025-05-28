import { FC, PropsWithChildren } from 'react'
import { Navbar } from '../navbar'
import { useLocation } from 'react-router'
import { useCurrentQuery } from '../../app/services/userApi'

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { isLoading } = useCurrentQuery()
  const location = useLocation()

  const isAuthPage =
    location.pathname === '/login' || location.pathname === '/register'

  return (
    <div className='mx-auto flex flex-col h-full'>
      <Navbar />
      {!isAuthPage && isLoading ? (
        <h3 className='text-xl text-slate-400 flex items-center justify-center h-full '>
          Загрузка...
        </h3>
      ) : (
        <div className='flex-1 p-6'>{children}</div>
      )}
    </div>
  )
}
