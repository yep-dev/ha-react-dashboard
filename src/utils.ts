import { format } from 'date-fns'

export const textToCamel = (text: string) =>
  text
    .split(' ')
    .map((word: string, index: number) => {
      if (index === 0) {
        return word.toLowerCase()
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    .join('')

export const dateTime = (date: Date) => format(date, 'yyyy-MM-dd HH:mm:ss')
