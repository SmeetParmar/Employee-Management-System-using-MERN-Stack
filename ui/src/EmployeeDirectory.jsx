import React from 'react';
import { graphQlFetch } from './graphQlFetch.js';
import EmployeeTable from './EmployeeTable.jsx';
import EmployeeFilter from './EmployeeFilter.jsx';
import { Route } from "react-router-dom";
import EmployeeDetails from './EmployeeDetails.jsx';
import EmployeeEdit from './EmployeeEdit.jsx';

// employee directory component which has all components in it and has mutation and query, for selecting and inserting data using graphql api...
class EmployeeDirectory extends React.Component{
    constructor() 
    {
      super();
      this.state = { employees: [] };
    }
    
    //calling load data when component mounts in application...
    async componentDidMount() { this.loadData(); }

    componentDidUpdate(prevProps) {
      const params = this.props.location.search;
      const prevparams = prevProps.location.search;
      if (prevparams != params) {
        this.loadData();
      }
    }
  
    //function for selecting data...
    async loadData() {
      const vars = {}
      const { search } = this.props.location;
      const params = new URLSearchParams(search);
      if (params.get('type')) vars.type = params.get('type');

        const query = `
          query employeeList( $type: defaultEmployeeType )
                {
                  employeeList (employeeType: $type) 
                  { id firstname lastname department title
                                age employeeType status dateOfJoining }
                }`;
        const result = await graphQlFetch(query,vars);
        this.setState({ employees: result.employeeList });    
  }
  
  deleteEmployee = async (index) => {
    const query = `mutation deleteEmployee($id: Int!) {
      deleteEmployee(id: $id)
    }`;
    const { employees } = this.state;
    const { id } = employees[index];  
    if(confirm("Are you sure you want to delete employee ?"))
    {
      const data = await graphQlFetch(query, { id });
      if(data)
      {
        alert("Employee Deleted...")
        this.loadData();
      }
    }
  };

  terminateEmployee = async (index) => {
    const query = `mutation terminateEmployee($id: Int!) {
      terminateEmployee(id: $id)
    }`;
    const { employees } = this.state;
    const { id } = employees[index];
    const data = await graphQlFetch(query, { id });
    if(data)
    {
      alert("Employee Terminated...")
      this.loadData();
    }
  };
  
  render() {
    
  
    const mainStyle = { textAlign: 'center', color: '#ff03ee', marginBottom: '30px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'};
    
      return (
        <>
          <h1 className='mt-3' style={mainStyle}>Employee Table</h1>
          <EmployeeFilter filterName="Employee"/>
          <EmployeeTable 
          employees={this.state.employees}
          deleteEmployee={this.deleteEmployee} 
          terminateEmployee = {this.terminateEmployee}/>
        </>
      );
    }
  }

  export default EmployeeDirectory;