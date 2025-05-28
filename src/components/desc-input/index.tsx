import { FC } from 'react'
import { Control, Controller } from 'react-hook-form'
import { NoteData } from '../../types'

interface Props {
  control: Control<NoteData>
  defaultValue?: string
}

export const DescInput: FC<Props> = ({ control, defaultValue = '' }) => {
  return (
    <Controller
      control={control}
      name='description'
      defaultValue={defaultValue}
      rules={{ required: 'Введите описание' }}
      render={({ field: { onChange, value, name } }) => (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          className='outline-none text-gray-600 bg-slate-100 py-2 px-4 rounded-lg resize-none text-sm min-h-22 w-full'
          placeholder='Описание'
        ></textarea>
      )}
    />
  )
}
