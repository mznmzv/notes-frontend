import { FC, useState } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { UserData } from '../../types'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'

interface Props {
  register: UseFormRegister<UserData>
  placeholder: string
  name: 'username' | 'password'
  type?: React.HTMLInputTypeAttribute
}

export const AuthInput: FC<Props> = ({ register, placeholder, name, type }) => {
  const [isShowPassword, setIsShowPassword] = useState(false)
  const toggleShowPassword = () => setIsShowPassword(!isShowPassword)
  return (
    <div className='relative'>
      <input
        className='border-blue-200 border-2 py-2 px-4 rounded-lg outline-0 text-gray-600 focus:shadow-blue-100 focus:shadow-lg transition-all w-full'
        placeholder={placeholder}
        {...register(name, { required: 'Обязательное поле' })}
        type={isShowPassword ? 'text' : type}
        autoComplete={type === 'password' ? 'current-password' : 'username'}
      />
      {type === 'password' &&
        (isShowPassword ? (
          <FaRegEye
            size={20}
            onClick={toggleShowPassword}
            className='flex items-center right-2 top-1/2 -translate-y-[50%] absolute cursor-pointer text-blue-600 h-full'
          />
        ) : (
          <FaRegEyeSlash
            size={20}
            onClick={toggleShowPassword}
            className='flex items-center right-2 top-1/2 -translate-y-[50%] absolute cursor-pointer text-blue-600 h-full'
          />
        ))}
    </div>
  )
}
