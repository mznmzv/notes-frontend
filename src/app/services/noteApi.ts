import { Note, NoteData } from '../../types'
import { api } from './api'

const noteApi = api.injectEndpoints({
  endpoints: build => ({
    getUserNotes: build.query<Note[], void>({
      query: () => ({ url: '/notes' }),
      providesTags: ['Note'],
    }),
    createNote: build.mutation<Note, NoteData>({
      query: noteData => ({ url: '/notes', body: noteData, method: 'POST' }),
      invalidatesTags: ['Note'],
    }),
    editNote: build.mutation<Note, Note>({
      query: noteData => ({
        url: `/notes/${noteData.id}`,
        body: noteData,
        method: 'POST',
      }),
      invalidatesTags: ['Note'],
    }),
    deleteNote: build.mutation<Note, string>({
      query: id => ({
        url: `/notes/${id}`,
        body: id,
        method: 'DELETE',
      }),
      invalidatesTags: ['Note'],
    }),
    pinNote: build.mutation<Note, string>({
      query: noteId => ({
        url: `/notes/pin/${noteId}`,
        method: 'POST',
        body: noteId,
      }),
      invalidatesTags: ['Note'],
    }),
  }),
})

export const { getUserNotes } = noteApi.endpoints

export const {
  useCreateNoteMutation,
  useDeleteNoteMutation,
  useEditNoteMutation,
  useGetUserNotesQuery,
  usePinNoteMutation,
} = noteApi
