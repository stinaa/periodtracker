class PeriodTracker {
  constructor(algo, helpers) {
    this.algo = algo
    this.helpers = helpers
    this.calendar
  }

  init() {
    // Get dates from localStorage and parse them to javascript date objects
    let dates = JSON.parse(localStorage.getItem('period_dates')) || []

    dates = dates.map((d) => {
      return new Date(d)
    })

    // Init the calendar
    this.calendar = flatpickr('#dates', {
      mode: 'multiple',
      maxDate: new Date(),
      defaultDate: dates,
      onChange: this.datesChanged.bind(this),
      inline: true,
      locale: {
        firstDayOfWeek: 1
      }
    })

    // Jump to today
    this.calendar.jumpToDate(new Date())

    // Run the algorithm
    this.datesChanged(dates)   
  }

  datesChanged(dates) {
    // Sort the dates
    dates.sort((a, b) => {
      return a - b
    })

    // Save dates in localStorage
    localStorage.setItem('period_dates', JSON.stringify(dates))

    const data = this.getCycleDataFromDates(dates)
    const nextPeriod = this.algo.predictNextPeriodStartDate(data)

    if (nextPeriod instanceof Date && !isNaN(nextPeriod)) {
      this.updatePrediction(nextPeriod.toDateString())
      return
    }
    
    this.updatePrediction('🤷')

  }

  updatePrediction(result) {
    document.getElementById('prediction').innerHTML = result

  }

  getCycleDataFromDates(dates) {
    const cycles = {
      currentCycleStart: new Date(dates[dates.length - 1]),
      cycleLengths: []
    }

    dates.forEach((date, index) => {      
      if (!dates[index + 1]) return

      const daysBetween = this.helpers.getNumberOfDaysBetweenTwoDates(date, dates[index + 1])
      cycles.cycleLengths.push(daysBetween)
    })

    return cycles
  }

  clearDates() {
    this.calendar.clear()
  }

}

const helpers = new Helpers();
const algo = new PeriodAlgo(helpers);

const app = new PeriodTracker(algo, helpers)
app.init()