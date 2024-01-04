import { format, setHours, setMinutes } from 'date-fns'

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

export const formatMinutes = (minutes: number) => {
  let result = ''
  if (minutes >= 60) {
    result += `${Math.floor(minutes / 60)}h `
    minutes = minutes % 60
  }

  if (minutes > 0 || minutes % 60 == 0) {
    result += `${minutes}m`
  }

  return result
}

export const parseTime = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number)
  return setMinutes(setHours(new Date(), hours), minutes)
}
