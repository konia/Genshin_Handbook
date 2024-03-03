import dayjs from 'dayjs';

export function useDate() {
  function formatDate(date: Date) {
    return dayjs(date).format('YYYY-MM-DD');
  }
  return { formatDate };
}
