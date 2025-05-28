export interface UserData {
  username: string
  password: string
}

export interface NoteData {
  title: string
  date: Date
  description: string
  tags: string
  isPinned?: boolean
}

export interface User extends UserData {
  id: string
  notes: Note[]
}

export interface Note extends NoteData {
  id: string
  user: string
}

export type ErrorMessage = {
  data: {
    message: string
  }
  status: number
}

export type SortType = 'az' | 'za' | 'newest' | 'oldest' | 'default'
