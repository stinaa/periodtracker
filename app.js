let calendar

const init = () => {
  const dates = JSON.parse(localStorage.getItem('period_dates'))

  calendar = flatpickr('#dates', {
    mode: 'multiple',
    maxDate: new Date(),
    defaultDate: dates,
    onChange: datesChanged,
    inline: true
  })

  if (dates) {
    const arr = dates.map((d) => {
      return new Date(d)
    })

    datesChanged(arr)
  } 
}

const datesChanged = (dates) => {
  dates.sort((a, b) => {
    return a - b
  })
  
  // Save dates in local storage
  localStorage.setItem('period_dates', JSON.stringify(dates))

  const periods = getPeriodsFromDates(dates)
  const nextPeriod = predictNextPeriodStartDate(periods)

  document.getElementById('prediction').innerHTML = nextPeriod
}

const getPeriodsFromDates = (dates) => {
  const periods = []
  let previousDate = undefined

  dates.forEach(date => {
    if (!previousDate) {
      previousDate = date
    }

    if (daysBetween(previousDate, date) !== 1) {
      periods.push([])
    }

    periods[periods.length-1].push(date)
    
    previousDate = date
  })

  return periods
}

const daysBetween = (firstDate, secondDate) => {
  const oneDay = 24 * 60 * 60 * 1000 // hours * minutes * seconds * milliseconds
  return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / oneDay))
}

const clearDates = () => {
  calendar.clear()
}

init()