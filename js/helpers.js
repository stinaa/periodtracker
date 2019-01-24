class Helpers {
  
  // Input: Two dates
  // Output: Number of days between the dates
  getNumberOfDaysBetweenTwoDates(firstDate, secondDate) {
    // This is the length of a day in milliseconds
    const oneDay = 24 * 60 * 60 * 1000 // hours * minutes * seconds * milliseconds
    
    // Count the difference in days between firstDate and secondDate
    const absoluteValue = Math.abs((firstDate.getTime() - secondDate.getTime()) / oneDay)

    // Round the value
    const days = Math.round(absoluteValue)

    // Return number of days between the two dates
    return days
  }


  // Input: a date and number of days you want to add
  // Output: the modified date
  getNewDateByAddingDaysToDate(date, days) {
    // Modify the date by adding X amount of days
    date.setDate(date.getDate() + days)

    // Return the modified date
    return date
  }


  // Input: an array with numbers
  // Output: the average value
  getAverageValueFromArrayOfNumbers(array) {
    // Count the total value
    let totalValue = 0
    array.forEach(value => {
      totalValue += value
    })

    // Get the average by dividing the total value by number of items
    const average = totalValue / array.length

    // Return the average value
    return average
  }


}