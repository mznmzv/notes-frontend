import { Control, Controller } from 'react-hook-form'
import { NoteData } from '../../types'
import { FC } from 'react'
import { formatDate } from '../../utils/format-date'

interface Props {
  control: Control<NoteData>
  defaultValue?: string
}

export const DateInput: FC<Props> = ({ control, defaultValue }) => {
  return (
    <Controller
      name='date'
      control={control}
      rules={{
        required: 'Введите дату',
        maxLength: { value: 10, message: 'Введите корректную дату' },
        min: {
          value: '2025-01-01',
          message: 'Введите дату: 2025-2050',
        },
        max: {
          value: '2050-01-01',
          message: 'Введите дату: 2025-2050',
        },
      }}
      defaultValue={defaultValue ? new Date(defaultValue) : undefined}
      render={({ field: { onChange, value, name } }) => (
        <input
          className='bg-slate-100 text-sm py-2 px-4 rounded-lg outline-0 text-gray-600 w-full'
          type='date'
          name={name}
          onChange={onChange}
          value={formatDate({ value, format: 'iso' }) || ''}
          required={false}
        />
      )}
    />
  )
}
