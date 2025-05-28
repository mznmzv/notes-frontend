import { FC, PropsWithChildren, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectIsAuth } from '../../app/features/userSlice'
import { useNavigate } from 'react-router'

export const CheckAuth: FC<PropsWithChildren> = ({ children }) => {
  const isAuth = useSelector(selectIsAuth)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuth) {
      navigate('/login')
    }
  }, [isAuth])

  return <>{children}</>
}
