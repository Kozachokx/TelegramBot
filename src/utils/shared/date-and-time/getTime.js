const getTime = (date) => {
  const hour = new Date(date).getHours() > 9 ? new Date(date).getHours() : `0${new Date(date).getHours()}`
  const minutes = new Date(date).getMinutes() > 9 ? new Date(date).getMinutes() : `0${new Date(date).getMinutes()}`
  return `${hour}:${minutes}`
}

module.exports = { getTime }
