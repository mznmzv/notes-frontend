import { createSlice } from '@reduxjs/toolkit'
import { current, login } from '../services/userApi'
import { RootState } from '../store'
import { getUserNotes } from '../services/noteApi'
import { Note } from '../../types'

type InitialState = {
  notes: Note[]
  sortedNotes: Note[]
  token: string | null
  isAuth: boolean
  userId: string | null
}

const initialState: InitialState = {
  notes: [],
  sortedNotes: [],
  token: null,
  isAuth: false,
  userId: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: () => {
      localStorage.removeItem('token')
      return initialState
    },
    searchNotes: (state, action) => {
      const query = action.payload.trim().toLowerCase()

      if (query === '') {
        state.sortedNotes = state.notes
      } else {
        state.sortedNotes = state.notes.filter(
          note =>
            note.title.toLowerCase().includes(query) ||
            note.description.toLowerCase().includes(query) ||
            note.tags.split(',').some(tag => tag.toLowerCase().includes(query))
        )
      }
    },
    sortNotes: (state, action) => {
      const sortType = action.payload
      if (sortType === 'za') {
        state.sortedNotes = [...state.notes].sort((a, b) =>
          a.title.localeCompare(b.title)
        )
      }
      if (sortType === 'az') {
        state.sortedNotes = [...state.notes].sort((a, b) =>
          b.title.localeCompare(a.title)
        )
      }
      if (sortType === 'newest') {
        state.sortedNotes = [...state.notes].sort(
          (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
        )
      } else if (sortType === 'oldest') {
        state.sortedNotes = [...state.notes].sort(
          (a, b) => Number(new Date(a.date)) - Number(new Date(b.date))
        )
      }
    },
  },
  extraReducers: build => {
    build.addMatcher(login.matchFulfilled, (state, action) => {
      state.isAuth = true
      state.userId = action.payload.id
      localStorage.setItem('token', action.payload.token)
    })
    build.addMatcher(current.matchFulfilled, (state, action) => {
      state.isAuth = true
      state.userId = action.payload.id
    })
    build.addMatcher(getUserNotes.matchFulfilled, (state, action) => {
      state.notes = action.payload
      state.sortedNotes = action.payload
    })
  },
})

export const selectIsAuth = (state: RootState) => state.user.isAuth
export const selectUserNotes = (state: RootState) => state.user.sortedNotes
export const selectUserId = (state: RootState) => state.user.userId
export const { logout, searchNotes, sortNotes } = userSlice.actions
export default userSlice.reducer
