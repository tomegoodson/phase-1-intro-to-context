function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
      firstName,
      familyName,
      title,
      payPerHour,
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  function createEmployeeRecords(employeeDataArray) {
    return employeeDataArray.map(employeeData => createEmployeeRecord(employeeData));
  }
  function createTimeInEvent(employeeRecord, dateTime) {
    let [date, hour] = dateTime.split(' ');
    employeeRecord.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date
    });
    return employeeRecord;
  }
  function createTimeOutEvent(employeeRecord, dateTime) {
    let [date, hour] = dateTime.split(' ');
    employeeRecord.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date
    });
    return employeeRecord;
  }
  function hoursWorkedOnDate(employeeRecord, date) {
    let inEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    let outEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
    return (outEvent.hour - inEvent.hour) / 100;
  }
  function wagesEarnedOnDate(employeeRecord, date) {
    let hours = hoursWorkedOnDate(employeeRecord, date);
    return hours * employeeRecord.payPerHour;
  }
  function allWagesFor(employeeRecord) {
    let totalWages = employeeRecord.timeInEvents.reduce((total, event) => {
      return total + wagesEarnedOnDate(employeeRecord, event.date);
    }, 0);
    return totalWages;
  }
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, record) => total + allWagesFor(record), 0);
  }
  