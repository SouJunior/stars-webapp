import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relativeTime)
dayjs.locale('pt-br')

const BR_TIMEZONE = 'America/Sao_Paulo'

export const formatDate = (date) => {
  if (!date) return ''
  return dayjs(date).tz(BR_TIMEZONE).format('DD/MM/YYYY')
}

export const formatDateTime = (date) => {
  if (!date) return ''
  return dayjs(date).tz(BR_TIMEZONE).format('DD/MM/YYYY HH:mm')
}

export const formatTimeAgo = (date) => {
  if (!date) return ''
  return dayjs(date).fromNow()
}

export default {
  formatDate,
  formatDateTime,
  formatTimeAgo
}
