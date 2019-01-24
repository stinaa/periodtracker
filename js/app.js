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

    // Use the dates to generate cycle data
    const data = this.getCycleDataFromDates(dates)

    // Use the data to predict next period
    const nextPeriod = this.algo.predictNextPeriodStartDate(data)

    // If it is a date, format it
    if (nextPeriod instanceof Date && !isNaN(nextPeriod)) {
      this.updatePrediction(nextPeriod.toDateString())
      return
    }
    
    // If it is not a date, next period is still unknown
    this.updatePrediction('🤷')

  }

  updatePrediction(result) {
    // Display the result
    document.getElementById('prediction').innerHTML = result
  }

  getCycleDataFromDates(dates) {
    // Create the data object where currentCycleStart is the last date selected in the calendar
    const data = {
      currentCycleStart: undefined,
      cycleLengths: [],
    }

    let periodDay = 0
    dates.forEach((date, index) => {
      // Set currentCycleStart if periodDay is 0
      if (periodDay === 0) {
        data.currentCycleStart = date
      }

      // Return if it is the last date, we dont want to count in the ongoing cycle
      if (!dates[index + 1]) return

      // Count days between current date and next date
      const daysBetween = this.helpers.getNumberOfDaysBetweenTwoDates(date, dates[index + 1])

      // If its only 1 day between it means it is the same period
      if (daysBetween === 1) {
        return periodDay++
      } else {
        // If its more than 1 days between, push the total days to cycleLengths
        data.cycleLengths.push(periodDay + daysBetween)
        periodDay = 0
      }
    })

    return data
  }

  clearDates() {
    this.calendar.clear()
  }

}

const helpers = new Helpers()
const algo = new PeriodAlgo(helpers)
const app = new PeriodTracker(algo, helpers)

app.init()