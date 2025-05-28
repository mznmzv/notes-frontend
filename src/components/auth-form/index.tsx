import { SubmitHandler, useForm } from 'react-hook-form'
import { UserData } from '../../types'
import { AuthInput } from '../auth-input'
import { Button } from '../../components/button'
import { ErrorMessage } from '../../components/error-message'
import { FC } from 'react'
import { Link, useLocation } from 'react-router'

interface Props {
  btnText: string
  formTitle: string
  submitAction: (userData: UserData) => Promise<void>
}

export const AuthForm: FC<Props> = ({ btnText, formTitle, submitAction }) => {
  const { pathname } = useLocation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>()
  const onSubmit: SubmitHandler<UserData> = async userData => {
    submitAction(userData)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col p-6 shadow-lg border-2 border-slate-200 rounded-3xl gap-4 w-[350px]'>
        <h3 className='text-center font-medium'>{formTitle}</h3>
        <div className='flex flex-col gap-4'>
          <label className='flex flex-col'>
            <AuthInput
              name='username'
              placeholder='Логин'
              register={register}
            />
            {errors.username && pathname === '/register' && (
              <ErrorMessage error={errors.username?.message} />
            )}
          </label>
          <label className='flex flex-col'>
            <AuthInput
              name='password'
              placeholder='Пароль'
              register={register}
              type='password'
            />
            {errors.password && pathname === '/register' && (
              <ErrorMessage error={errors.password?.message} />
            )}
          </label>
        </div>
        <div className='flex items-center justify-between'>
          <Button text={btnText} />
          {pathname === '/login' ? (
            <Link
              className='hover:text-blue-600 text-blue-400 transition-all'
              to='/register'
            >
              Нет аккаунта
            </Link>
          ) : (
            <Link
              className='hover:text-blue-600 text-blue-400 transition-all'
              to='/login'
            >
              Есть аккаунт
            </Link>
          )}
        </div>
      </div>
    </form>
  )
}
