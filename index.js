/* Your Code Here */
let createEmployeeRecord= function(row) {
	return {
		firstName: row[0], 
		familyName: row[1], 
		title: row[2], 
		payPerHour: row[3],
		timeInEvents: [],
		timeOutEvents: []
	}	
}

let createEmployeeRecords = function(employyeRowData) {
	return employyeRowData.map(function(row) {
	return createEmployeeRecord(row)
})	
}

let createTimeInEvent = function(employee, dateStamp) {
	let [date, hour] = dateStamp.split(' ')

	employee.timeInEvents.push({
		type: "TimeIn",
		hour: parseInt(hour, 10),
		date, 
	})
	console.log(employee)
	return employee
}

let createTimeOutEvent = (employee, dateStamp) => {
	let [date, hour] = dateStamp.split(' ')

	employee.timeOutEvents.push({
		type: "TimeOut",
		hour: parseInt(hour, 10),
		date, 
	})
	console.log(employee)
	return employee
}

const hoursWorkedOnDate = (employee, dateDYM) => {
	let timeIn = employee.timeInEvents.find((w) => w.date === dateDYM)
	let timeOut = employee.timeOutEvents.find((w) => w.date === dateDYM)
	return (timeOut.hour - timeIn.hour)/100
}

const wagesEarnedOnDate = (employee, dateDYM) => {
	let money = employee.payPerHour
	let hoursWorked = hoursWorkedOnDate(employee, dateDYM)
	const hateThis = money * hoursWorked
	return parseFloat(hateThis.toString())
}

const findEmployeeByFirstName = (ArrayFinder, Name) => {
	return ArrayFinder.find((record) => record.firstName === Name)
}

const calculatePayroll = (records) => {
	let allPay = (records.map((employee) => {return allWagesFor(employee)} ))
	return allPay.reduce((jobs, coins) => jobs + coins)	 
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}