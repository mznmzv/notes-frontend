import { FC, PropsWithChildren, useEffect } from 'react'
import { MdClose } from 'react-icons/md'

interface Props extends PropsWithChildren {
  closeModal: () => void
}

export const Modal: FC<Props> = ({ children, closeModal }) => {
  const handleClose = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal()
    }
  }
  useEffect(() => {
    document.addEventListener('keydown', handleClose)
    return () => document.removeEventListener('keydown', handleClose)
  }, [])
  return (
    <>
      <div className='fixed inset-0 flex items-center justify-center z-10'>
        <div className='bg-white rounded-xl text-black relative max-w-[320px] w-full '>
          <MdClose
            onClick={closeModal}
            className='top-3 right-3 absolute cursor-pointer'
            size={20}
          />
          {children}
        </div>
        <div
          className='bg-gray-600 h-screen w-screen fixed opacity-40 -z-10'
          onClick={closeModal}
        ></div>
      </div>
    </>
  )
}
