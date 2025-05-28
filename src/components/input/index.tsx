import { FC } from 'react'
import { NoteData } from '../../types'
import { Control, Controller } from 'react-hook-form'

interface Props {
  placeholder: string
  control: Control<NoteData>
  defaultValue?: string
}

export const Input: FC<Props> = ({
  placeholder,
  control,
  defaultValue = '',
}) => {
  return (
    <Controller
      control={control}
      name='title'
      defaultValue={defaultValue}
      rules={{ required: 'Введите название' }}
      render={({ field: { onChange, value, name } }) => (
        <input
          className='bg-slate-100 text-sm py-2 px-4 rounded-lg outline-0 text-gray-600 w-full'
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          name={name}
        />
      )}
    />
  )
}
