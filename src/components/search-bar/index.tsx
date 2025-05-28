import { FC, useEffect, useState } from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { IoMdClose } from 'react-icons/io'
import { useDispatch } from 'react-redux'
import { searchNotes } from '../../app/features/userSlice'

interface Props {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

export const SearchBar: FC<Props> = ({ value, setValue }) => {
  const [isActive, setIsActive] = useState(false)
  const dispatch = useDispatch()
  const handleSearch = (search: string) => {
    dispatch(searchNotes(search))
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(value)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    if (!isActive) {
      document.removeEventListener('keydown', handleKeyDown)
    }
    if (value === '') {
      handleSearch('')
    }
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [value, isActive])

  return (
    <div className='flex max-w-96 w-full h-full border border-slate-200 bg-slate-100 rounded-xl '>
      <div className='flex items-center w-full px-4'>
        <input
          className='py-2 w-full outline-0'
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder='Поиск заметок...'
          onFocus={() => {
            setIsActive(true)
          }}
          onBlur={() => {
            setIsActive(false)
          }}
        />
        {value && (
          <IoMdClose
            onClick={() => {
              setValue('')
            }}
            className='text-2xl cursor-pointer text-slate-500 hover:text-black transition-all'
          />
        )}
      </div>
      <FaMagnifyingGlass
        onClick={() => {
          handleSearch(value)
        }}
        className='text-white hover:bg-blue-600 transition-all cursor-pointer w-15 px-5 rounded-r-xl h-full flex items-center justify-center bg-blue-500'
      />
    </div>
  )
}
