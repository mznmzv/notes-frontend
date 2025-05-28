import { useEffect, useState } from 'react'
import { BsSortAlphaDown, BsSortAlphaUp } from 'react-icons/bs'
import { GoSortAsc, GoSortDesc } from 'react-icons/go'
import { TbArrowsSort } from 'react-icons/tb'
import { SortType } from '../../types'
import { sortNotes } from '../../app/features/userSlice'
import { useDispatch } from 'react-redux'

export const SortButton = () => {
  const [sort, setSort] = useState<SortType>('newest')
  const [active, setActive] = useState(false)
  const dispatch = useDispatch()

  const handleSort = (sort: SortType) => {
    setSort(sort)
    dispatch(sortNotes(sort))
  }

  useEffect(() => {
    console.log(sort)
  }, [sort])

  return (
    <div
      className='relative outline-0 w-fit'
      onBlur={() => setActive(false)}
      tabIndex={0}
    >
      <div
        className='flex items-center gap-1 cursor-pointer bg-slate-100 border-1 border-slate-200  rounded-md p-2 hover:bg-slate-200 transition-all'
        onClick={() => setActive(!active)}
      >
        <span>Сортировка</span>
        <TbArrowsSort size={18} />
      </div>
      {active && (
        <ul className='absolute bg-white shadow-md rounded-md border-gray-200 border text-sm top-12 z-1 w-max'>
          <li
            className='cursor-pointer hover:bg-blue-50 transition-all p-3 rounded-t-md flex items-center gap-2 justify-between'
            onClick={() => handleSort('default')}
          >
            по умолчанию
          </li>
          <li
            className='cursor-pointer hover:bg-blue-50 transition-all p-3 rounded-t-md flex items-center gap-2 justify-between'
            onClick={() => {
              if (sort === 'za') {
                return handleSort('az')
              }
              handleSort('za')
            }}
          >
            по названию
            {sort === 'za' ? (
              <BsSortAlphaUp size={22} />
            ) : (
              <BsSortAlphaDown size={22} />
            )}
          </li>
          <li
            className='cursor-pointer hover:bg-blue-50 transition-all p-3 rounded-t-md flex items-center gap-5 justify-between'
            onClick={() => {
              if (sort === 'oldest') {
                return handleSort('newest')
              }
              handleSort('oldest')
            }}
          >
            по дате
            {sort === 'oldest' ? (
              <GoSortAsc size={22} />
            ) : (
              <GoSortDesc size={22} />
            )}
          </li>
        </ul>
      )}
    </div>
  )
}
