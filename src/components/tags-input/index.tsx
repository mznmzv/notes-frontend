import { FC, useEffect, useState } from 'react'
import {
  UseFormClearErrors,
  UseFormSetError,
  UseFormSetValue,
} from 'react-hook-form'
import { MdAddCircle, MdClose } from 'react-icons/md'
import { NoteData } from '../../types'
import { toast } from 'react-toastify'

interface Props {
  setValue: UseFormSetValue<NoteData>
  setError: UseFormSetError<NoteData>
  clearErrors: UseFormClearErrors<NoteData>
  initialTags?: string
}

export const TagsInput: FC<Props> = ({
  initialTags,
  setValue,
  setError,
  clearErrors,
}) => {
  const [tag, setTag] = useState('')
  const [tags, setTags] = useState<string[]>([])

  const handleAddTag = () => {
    if (tags.length >= 4) {
      return toast('Максимальное количество тегов: 4')
    }
    if (tag.trim().length > 0 && !tags.includes(tag)) {
      setTags([...tags, tag.trim()])
    }
    setTag('')
  }

  const handleDeleteTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index))
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTag()
    }
  }

  useEffect(() => {
    if (initialTags) setTags([...tags, ...initialTags.split(',')])
  }, [initialTags])

  useEffect(() => {
    if (tags.length === 0) {
      setError('tags', {
        type: 'required',
        message: 'Укажите теги',
      })
    } else {
      clearErrors('tags')
    }
    setValue('tags', tags.toString())
  }, [tags])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [tag, tags])

  return (
    <div className='flex flex-col justify-between bg-slate-100 text-sm py-2 px-4 rounded-lg text-gray-600'>
      <div className='flex gap-2 flex-wrap top-2'>
        {tags.map((item, index) => (
          <div
            className='bg-slate-200 rounded-lg py-2 px-2 flex gap-0.5 items-center'
            key={index}
          >
            {item.length > 12 ? `${item.slice(0, 12)}...` : item}
            <MdClose
              className='text-lg cursor-pointer hover:text-red-400 transition-all'
              onClick={() => handleDeleteTag(index)}
            />
          </div>
        ))}
      </div>
      <div className='relative flex items-center'>
        <input
          placeholder='Тэги'
          className='w-full outline-0 h-8 text-sm'
          onChange={e => setTag(e.target.value)}
          value={tag}
          onKeyDown={e => e.key === 'Enter' && e.preventDefault()}
        />
        {tag.trim().length > 0 && (
          <div className='flex text-lg gap-2'>
            <MdAddCircle
              className='cursor-pointer transition-all hover:text-blue-500'
              onClick={handleAddTag}
            />
            <MdClose
              className='absoulute cursor-pointer hover:text-red-400 transition-all'
              onClick={() => setTag('')}
            />
          </div>
        )}
      </div>
    </div>
  )
}
