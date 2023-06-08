export const getDayOfWeek = (day: number = new Date().getDay()) => {
  switch (day) {
    case 0:
      return 'Неділя'
    case 1:
      return 'Понеділок'
    case 2:
      return 'Вівторок'
    case 3:
      return 'Середа'
    case 4:
      return 'Четвер'
    case 5:
      return "П'ятниця"
    default:
      return 'Субота'
  }
}

export const getMonth = (pos: number) => {
  switch (pos) {
    case 0:
      return 'січня'
    case 1:
      return 'лютого'
    case 2:
      return 'березня'
    case 3:
      return 'квітня'
    case 4:
      return 'травня'
    case 5:
      return 'червня'
    case 6:
      return 'липня'
    case 7:
      return 'серпня'
    case 8:
      return 'вересня'
    case 9:
      return 'жовтня'
    case 10:
      return 'листопада'
    case 11:
      return 'грудня'
  }
}
