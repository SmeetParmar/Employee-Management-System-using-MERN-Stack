const { UserInputError } = require('apollo-server-express');
const { getDatabase, getNextSequence } = require('./database');

const validateEmployee = ({ employee }) => {
  let errors = [];
  //console.log(employee);

  if ((isNaN(parseInt(employee.age, 10)) || employee.age < 21 || employee.age > 71)) {
    errors.push("Enter a valid age between 21 and 71.");
  }

  if (employee.title != 'Employee' && employee.title != 'Director' && employee.title != 'Manager' && employee.title != 'VP') {
    errors.push('Enter valid title. Employee, Director, Manager and VP only these values are allowed...');
  }

  if (employee.department != 'IT' && employee.department != 'Marketing' && employee.department != 'Engineering' && employee.department != 'HR') {
    errors.push('Enter valid department. IT, Marketing, Engineering and HR only these values are allowed...');
  }

  if (employee.employeeType != 'FullTime' && employee.employeeType != 'PartTime' && employee.employeeType != 'Contract' && employee.employeeType != 'Seasonal') {
    errors.push('Enter valid employee type. FullTime, PartTime, Contract and Seasonal only these values are allowed...');
  }

  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors });
  }
}

// asyc function for adding new employee to mongodb. It will be called when mutaion query will run from client side...
const addEmployee = async (parent, args) => {

  const database = getDatabase();
  const { employee } = args;

  validateEmployee({ employee });

  //default status 1 i.e. working...
  employee.status = 1;

  employee.id = await getNextSequence('employeeList');

  //inserting data...
  const result = await database.collection('employeeList').insertOne(employee);

  const savedEmployee = await database.collection('employeeList').findOne({ _id: result.insertedId });
  return savedEmployee;

}

//function for getting data from graphql. It will be called when graphql query will be there from client side... 
const employeeList = async (parent, { employeeType }) => {
  const database = getDatabase();
  let filter = {};
  if (employeeType) filter.employeeType = employeeType;
  //console.log(filter.employeeType);
  const employee = await database.collection('employeeList').find(filter).toArray();
  return employee;
}

//function for getting one data from graphql. It will be called when graphql query will be there from client side for fetching one employee according to id... 
const getOneEmployee = async (parent, { id }) => {
  const database = getDatabase();
  const employee = await database.collection('employeeList').findOne({ id });
  return employee;
}

//function for deleting data. It will be called when delete graphql query will be there from client side... 
const deleteOne = async (parent, { id }) => {
  const database = getDatabase();
  const employee = await database.collection('employeeList').findOne({ id });
  if (employee.status === 1) {
    throw new Error("Cannot delete employee with status WORKING!!!");
  }
  if (!employee) return false;
  employee.deleted = new Date();
  let result = await database.collection('deleted_employee').insertOne(employee);
  if (result.insertedId) {
    result = await database.collection('employeeList').deleteOne({ id });
    return result.deletedCount === 1;
  }
  return false;
}

//function for changing the status. It will be called when terminate graphql query will be there from client side... 
const terminate = async (parent, { id }) => {
  const database = getDatabase();
  await database.collection('employeeList').updateOne({ id }, { $set: { status: 0 } });

  return false;
}

//function for updating the data. It will be called when update graphql query will be there from client side... 
const updateEmployee = async (parent, { id, changes }) => {
  const database = getDatabase();
  //console.log({changes});
  if (changes.title || changes.department || changes.status) {
    const employee = await database.collection('employeeList').findOne({ id });
    Object.assign(employee, changes);
    validateEmployee({ employee });
  }
  await database.collection('employeeList').updateOne({ id }, { $set: changes });
  const savedEmployee = await database.collection('employeeList').findOne({ id });
  //console.log(savedIssue)
  return savedEmployee
}

//function for getting upcoming retirements in next 6 months. It will be called when getUpcomingRetirement graphql query will be there from client side... 
const getUpComingRetirement = async (parent,{ employeeType }) => {
  const database = getDatabase();
  const currentDate = new Date();
  const sixMonthsFromNow = new Date();
  sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);

  let filter = {};
  if (employeeType) filter.employeeType = employeeType;

  const employees = await database.collection('employeeList').find(filter).toArray();

  const upcomingRetirements = employees.filter(employee => {

      const retirementAge = 65 - employee.age;
      const dateOfJoining = new Date(employee.dateOfJoining);
      const retirementDate = new Date(dateOfJoining);
      retirementDate.setFullYear(retirementDate.getFullYear() + retirementAge);

      return retirementDate <= sixMonthsFromNow && retirementDate >= currentDate;
  });

  return upcomingRetirements;
}

module.exports = { addEmployee, employeeList, getOneEmployee, deleteOne, terminate, updateEmployee, getUpComingRetirement };