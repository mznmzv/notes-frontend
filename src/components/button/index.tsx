import { FC } from 'react'

interface Props {
  text: string
  className?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export const Button: FC<Props> = ({ text, className = '', onClick }) => {
  return (
    <button
      className={`bg-blue-500 py-2 px-4 rounded-md cursor-pointer hover:bg-blue-600 transition-all text-white ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  )
}
