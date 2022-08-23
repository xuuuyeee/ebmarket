
export function parseTime(timeString) {
  if (timeString === undefined || timeString === null || timeString.trim() === '') {
    return '无'
  }
  return new Date(timeString).toLocaleString()
}

