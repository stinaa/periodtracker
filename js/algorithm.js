class PeriodAlgo {

  // Write your algorithm here!
  predictNextPeriodStartDate (data) {
    // Tip! check in your browsers console to see how the data looks like
    console.log(`\n\n\nWill run the algorithm based on this data:\n`, data)
    

    // Step 1. Calculate the average cycle length
    // Tip! Use the numbers in the array data.cycleLengths to get the average value
    const average = this.getAverageValueFromArrayOfNumbers(data.cycleLengths)
    
    // Step 2. Use the average cycle length to predict when the next cycle will start 
    // Tip! You might want to use data.currentCycleStart and the value you got from step 1 to get the new date
    const nextPeriod = this.getNewDateByAddingDaysToDate(data.currentCycleStart, average)

    // Step 3. Return the predicted period date
    return nextPeriod
  }


  // If you need help, below are two functions you can use to complete your algorithm


  // Input: an array with numbers
  // Output: the average value
  getAverageValueFromArrayOfNumbers(array) {
    if (!array || !array.length) return 0
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

  // Input: a date and number of days you want to add
  // Output: the modified date
  getNewDateByAddingDaysToDate(date, days) {
    if (!date || !days) return

    // Modify the date by adding X amount of days
    const modifiedDate = new Date().setDate(date.getDate() + days)

    // Return the modified date
    return new Date(modifiedDate)
  }

}