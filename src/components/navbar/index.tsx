import { Link, useNavigate } from 'react-router'
import { SearchBar } from '../search-bar'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectIsAuth } from '../../app/features/userSlice'
import { toast } from 'react-toastify'

export const Navbar = () => {
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isAuth = useSelector(selectIsAuth)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
    toast('Вы вышли из аккаунта')
  }

  return (
    <div className='flex items-center justify-between py-4 drop-shadow-md bg-white px-6 gap-5'>
      <Link
        to='/'
        className='font-bold text-sky-600 text-3xl transition-all hover:translate-y-0.5 hover:text-sky-700'
      >
        Notes
      </Link>
      {isAuth && (
        <>
          <SearchBar value={search} setValue={setSearch} />
          <div className='flex gap-10'>
            <Link
              to='/archive'
              className='font-medium hover:text-blue-600 transition-all'
            >
              Архив
            </Link>
            <button
              onClick={handleLogout}
              className='hover:text-red-500 transition-all font-medium cursor-pointer'
            >
              Выйти
            </button>
          </div>
        </>
      )}
    </div>
  )
}
