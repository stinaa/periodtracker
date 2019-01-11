const init = () => {
  const dates = JSON.parse(localStorage.getItem('period_dates'))

  flatpickr('#dates', {
    mode: 'multiple',
    maxDate: new Date(),
    defaultDate: dates,
    onChange: datesChanged
  })
}

const datesChanged = (dates) => {
  localStorage.setItem('period_dates', JSON.stringify(dates))

  dates.forEach(date => {
    console.log(date.toDateString())
  })

}

init()

