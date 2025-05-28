import { SubmitHandler, useForm } from 'react-hook-form'
import { Input } from '../input'
import { ErrorMessage as ErrorMessageType, Note, NoteData } from '../../types'
import { Button } from '../button'
import { TagsInput } from '../tags-input'
import { ErrorMessage } from '../error-message'
import { FC, useEffect } from 'react'
import { DateInput } from '../date-input'
import { DescInput } from '../desc-input'
import {
  useCreateNoteMutation,
  useDeleteNoteMutation,
  useEditNoteMutation,
} from '../../app/services/noteApi'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { selectUserId } from '../../app/features/userSlice'
import { formatDate } from '../../utils/format-date'

interface Props {
  closeModal: () => void
  setCurrentNote: React.Dispatch<React.SetStateAction<Note | null>>
  note: Note | null
}

export const NoteForm: FC<Props> = ({ closeModal, note, setCurrentNote }) => {
  const [createNote] = useCreateNoteMutation()
  const [editNote] = useEditNoteMutation()
  const [deleteNote] = useDeleteNoteMutation()
  const userId = useSelector(selectUserId)

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    setError,
    clearErrors,
  } = useForm<NoteData>({ mode: 'onSubmit' })

  const submitHandler: SubmitHandler<NoteData> = async noteData => {
    try {
      if (note && userId) {
        if (
          formatDate({ value: note.date, format: 'iso' }) !==
            formatDate({ value: noteData.date, format: 'iso' }) ||
          noteData.description !== note.description ||
          noteData.title !== note.title ||
          noteData.tags.toString() !== note.tags.toString()
        ) {
          await editNote({ id: note.id, user: userId, ...noteData }).unwrap()
          toast('Заметка обновлена')
        } else {
          toast('Данные сохранены')
        }
        return closeModal()
      }
      await createNote({
        date: new Date(noteData.date),
        description: noteData.description,
        tags: noteData.tags,
        title: noteData.title,
      }).unwrap()
      toast('Заметка создана')
      closeModal()
    } catch (error) {
      const message = (error as ErrorMessageType).data.message
      toast(message)
    }
  }

  useEffect(() => {
    return () => setCurrentNote(null)
  }, [])

  return (
    <form className='p-10 w-full' onSubmit={handleSubmit(submitHandler)}>
      <div className='flex items-center flex-col gap-5'>
        <h3 className='text-lg'>Информация о заметке</h3>
        <div className='flex flex-col gap-3 w-full'>
          <div>
            <Input
              control={control}
              placeholder='Название'
              defaultValue={note?.title}
            />
            {errors.title && <ErrorMessage error={errors.title?.message} />}
          </div>

          <div>
            <DateInput
              control={control}
              defaultValue={formatDate({
                value: note ? note.date : undefined,
                format: 'iso',
              })}
            />
            {errors.date && <ErrorMessage error={errors.date?.message} />}
          </div>

          <div className='flex flex-col'>
            <DescInput control={control} defaultValue={note?.description} />
            {errors.description && (
              <ErrorMessage error={errors.description?.message} />
            )}
          </div>

          <div>
            <TagsInput
              setValue={setValue}
              initialTags={note?.tags}
              clearErrors={clearErrors}
              setError={setError}
            />
            {errors.tags && <ErrorMessage error={errors.tags?.message} />}
          </div>
        </div>
        <div className='w-full'>
          <Button
            text={`${note ? 'Изменить' : 'Добавить'}`}
            className='w-full'
          />
          {note && (
            <Button
              text='Удалить'
              onClick={e => {
                e.preventDefault()
                deleteNote(note.id)
                toast('Заметка удалена')
                closeModal()
              }}
              className='w-full hover:bg-rose-600 bg-rose-500 mt-2'
            />
          )}
        </div>
      </div>
    </form>
  )
}
