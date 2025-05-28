import { ErrorMessage } from '../types'

export const formatError = (error: ErrorMessage) => error.data.message
