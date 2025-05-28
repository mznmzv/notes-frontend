interface DateFormaterProps {
  value?: Date | string
  format?: 'iso' | 'locale'
}

export const formatDate = ({ value, format }: DateFormaterProps) => {
  if (!value) return undefined
  if (format === 'iso') return new Date(value).toISOString().split('T')[0]
  return new Date(value).toLocaleDateString()
}
