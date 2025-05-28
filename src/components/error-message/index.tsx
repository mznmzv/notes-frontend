import { FC } from 'react'

interface Props {
  error: string | undefined
}

export const ErrorMessage: FC<Props> = ({ error }) => {
  return <div className='mt-1.5 text-orange-700 text-sm'>{error}</div>
}
