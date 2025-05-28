import { MdAdd } from 'react-icons/md'
import { NoteCard } from '../../components/note-card'
import { Modal } from '../../components/modal'
import { useState } from 'react'
import { NoteForm } from '../../components/note-form'
import { useGetUserNotesQuery } from '../../app/services/noteApi'
import { Note } from '../../types'
import { useSelector } from 'react-redux'
import { selectUserNotes } from '../../app/features/userSlice'
import { SortButton } from '../../components/sort-button'
import { DeleteButton } from '../../components/delete-button'
import { ArchiveButton } from '../../components/archive-button'

export const Home = () => {
  const [currentNote, setCurrentNote] = useState<Note | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const closeModal = () => setIsModalOpen(false)
  const openModal = () => setIsModalOpen(true)
  const { isLoading } = useGetUserNotesQuery()
  const data = useSelector(selectUserNotes)

  if (data?.length === 0)
    return (
      <div className='text-slate-400 text-xl flex items-center justify-center h-full'>
        Нет заметок...
      </div>
    )

  return (
    <>
      {!isLoading && (
        <div>
          <div className='flex items-center justify-between mb-5'>
            <SortButton />
            <div className='flex gap-5'>
              <ArchiveButton />
              <DeleteButton />
            </div>
          </div>
          <div className='grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5'>
            {data?.map(note => (
              <NoteCard
                note={note}
                key={note.id}
                openModal={openModal}
                closeModal={closeModal}
                setCurrentNote={setCurrentNote}
              />
            ))}
          </div>
        </div>
      )}
      <button
        onClick={() => {
          setIsModalOpen(true)
        }}
        className='bg-blue-500 fixed bottom-6 right-6 w-12 h-12 flex items-center justify-center rounded-xl hover:bg-blue-600 transition-all cursor-pointer'
      >
        <MdAdd size={30} className='text-white' />
      </button>
      {isModalOpen && (
        <Modal closeModal={closeModal}>
          <NoteForm
            closeModal={closeModal}
            note={currentNote}
            setCurrentNote={setCurrentNote}
          />
        </Modal>
      )}
    </>
  )
}
