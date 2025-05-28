import { useNavigate } from 'react-router'
import { useLoginMutation } from '../../app/services/userApi'
import { AuthForm } from '../../components/auth-form'
import { ErrorMessage, UserData } from '../../types'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { selectIsAuth } from '../../app/features/userSlice'
import { useEffect } from 'react'

export const Login = () => {
  const [login] = useLoginMutation()
  const navigate = useNavigate()
  const isAuth = useSelector(selectIsAuth)

  useEffect(() => {
    if (isAuth) {
      navigate('/')
    }
  }, [isAuth])

  const handleSubmit = async (userData: UserData) => {
    try {
      await login(userData).unwrap()
      toast('Авторизация прошла успешно')
      navigate('/')
    } catch (error) {
      const message = (error as ErrorMessage).data.message
      toast(message)
    }
  }

  return (
    <div className='flex items-center justify-center h-full'>
      <AuthForm
        submitAction={handleSubmit}
        btnText='Войти'
        formTitle='Авторизация'
      />
    </div>
  )
}
