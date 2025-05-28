import { FC } from 'react'
import { MdCreate, MdDelete, MdOutlinePushPin, MdPushPin } from 'react-icons/md'
import {
  useDeleteNoteMutation,
  usePinNoteMutation,
} from '../../app/services/noteApi'
import { toast } from 'react-toastify'
import { ErrorMessage, Note } from '../../types'
import { formatDate } from '../../utils/format-date'

interface Props {
  note: Note
  openModal: () => void
  closeModal: () => void
  setCurrentNote: React.Dispatch<React.SetStateAction<Note | null>>
}

export const NoteCard: FC<Props> = ({ note, openModal, setCurrentNote }) => {
  const [pinNote] = usePinNoteMutation()
  const [deleteNote] = useDeleteNoteMutation()

  const handleDelete = async (id: string) => {
    try {
      await deleteNote(id).unwrap()
      toast('Заметка удалена')
    } catch (error) {
      const message = (error as ErrorMessage).data.message
      toast(message)
    }
  }

  const handlePin = async () => {
    try {
      await pinNote(note.id).unwrap()
    } catch (error) {
      const message = (error as ErrorMessage).data.message
      toast(message)
    }
  }

  return (
    <div className='p-5 bg-white border flex justify-between border-slate-200 hover:shadow-lg hover:shadow-gray-200 transition-all rounded-xl hover:scale-[1.015]'>
      <div
        onClick={() => {
          setCurrentNote(note)
          openModal()
        }}
        className='grow cursor-pointer flex flex-col justify-between'
      >
        <div className='flex items-center justify-between'>
          <div>
            <h5 className='font-medium text-sm'>{note.title}</h5>
            <span className='text-xs text-slate-500'>
              {formatDate({ value: note.date, format: 'locale' })}
            </span>
          </div>
        </div>

        <p className='text-xs text-slate-600 my-2 wrap-anywhere'>
          {note.description.slice(0, 60)}
          {note.description.length > 60 && '...'}
        </p>

        <div className='flex items-center justify-between'>
          <div className='flex flex-wrap gap-2 text-xs text-slate-500'>
            {note.tags.split(',').map((tag, index) => (
              <span
                className='bg-blue-200 p-1.5 rounded-lg font-medium'
                key={`${tag}-${index}`}
              >
                {tag.length > 12 ? `${tag.slice(0, 12)}...` : tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className='flex flex-col justify-between items-end'>
        {note.isPinned ? (
          <MdPushPin
            className='cursor-pointer text-blue-600 hover:text-blue-500 transition-all'
            size={23}
            onClick={handlePin}
          />
        ) : (
          <MdOutlinePushPin
            className='cursor-pointer hover:text-blue-600 transition-all'
            size={23}
            onClick={handlePin}
          />
        )}

        <div className='flex items-center gap-2'>
          <MdCreate
            className='cursor-pointer hover:text-blue-600 transition-all'
            size={20}
            onClick={() => {
              setCurrentNote(note)
              openModal()
            }}
          />
          <MdDelete
            className='cursor-pointer hover:text-red-500 transition-all'
            size={20}
            onClick={() => {
              handleDelete(note.id)
            }}
          />
        </div>
      </div>
    </div>
  )
}
