import { toast } from 'react-toastify'
import { useRegisterMutation } from '../../app/services/userApi'
import { AuthForm } from '../../components/auth-form'
import { ErrorMessage, UserData } from '../../types'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectIsAuth } from '../../app/features/userSlice'

export const Register = () => {
  const [register] = useRegisterMutation()
  const navigate = useNavigate()
  const isAuth = useSelector(selectIsAuth)

  const handleSubmit = async (userData: UserData) => {
    try {
      await register(userData).unwrap()
      toast('Регистрация прошла успешно')
      navigate('/login')
    } catch (error) {
      const message = (error as ErrorMessage).data.message
      toast(message)
    }
  }

  useEffect(() => {
    if (isAuth) {
      navigate('/')
    }
  }, [isAuth])

  return (
    <div className='flex items-center justify-center h-full'>
      <AuthForm
        submitAction={handleSubmit}
        btnText='Зарегистрироваться'
        formTitle='Регистрация'
      />
    </div>
  )
}
