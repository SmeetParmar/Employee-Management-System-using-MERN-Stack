import React from 'react';
import { graphQlFetch } from './graphQlFetch.js';
import { Table } from 'react-bootstrap';

class EmployeeDetails extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidUpdate(prevProps) {
    const { id } = this.props.match.params;
    const { id: prevId } = prevProps.match.params;
    if (id != prevId) {
      this.loadData();
    }
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const { id } = this.props.match.params;

    const query = `query oneEmployee($id: Int!) {
        oneEmployee(id: $id) {
            id firstname lastname department title
            age employeeType status dateOfJoining
      }
    }`;

    const result = await graphQlFetch(query, { id });

    this.setState({ employee: result.oneEmployee }, () => {
      const { employee } = this.state;
      if (employee) {
        const retirementAge = 65 - parseInt(employee.age);
        const dateOfJoining = new Date(employee.dateOfJoining);
        const retirementDate = new Date(dateOfJoining);
        retirementDate.setFullYear(retirementDate.getFullYear() + retirementAge);
        this.setState({ retirementDate });

        const currentDate = new Date();
        const diffTime = Math.abs(retirementDate - currentDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const years = Math.floor(diffDays / 365);
        const months = Math.floor((diffDays % 365) / 30);
        const days = Math.floor((diffDays % 365) % 30);
        this.setState({ years, months, days });
      }
    });
  }

  render() {
    const mainStyle = {
      textAlign: 'center',
      color: '#ff03ee',
      marginBottom: '30px',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
    };

    const headerCellStyle = {
            backgroundColor: '#00008b', 
            color: 'white', 
            width:"250px"
     };

    return (
      <div>
        <h1 style={mainStyle}>
          Employee Detail Of{' '}
          {this.state.employee ? this.state.employee.firstname + ' ' + this.state.employee.lastname : ''}
        </h1>
        <Table bordered hover responsive className="mx-auto text-center border border-1 border-dark" style={{ maxWidth: '600px' }}>
          <tbody>
            <tr>
              <td style={headerCellStyle}>ID</td>
              <td>{this.state.employee ? this.state.employee.id : ''}</td>
            </tr>
            <tr>
              <td style={headerCellStyle}>First Name</td>
              <td>{this.state.employee ? this.state.employee.firstname : ''}</td>
            </tr>
            <tr>
              <td style={headerCellStyle}>Last Name</td>
              <td>{this.state.employee ? this.state.employee.lastname : ''}</td>
            </tr>
            <tr>
              <td style={headerCellStyle}>Department</td>
              <td>{this.state.employee ? this.state.employee.department : ''}</td>
            </tr>
            <tr>
              <td style={headerCellStyle}>Title</td>
              <td>{this.state.employee ? this.state.employee.title : ''}</td>
            </tr>
            <tr>
              <td style={headerCellStyle}>Age</td>
              <td>{this.state.employee ? this.state.employee.age : ''}</td>
            </tr>
            <tr>
              <td style={headerCellStyle}>Employee Type</td>
              <td>{this.state.employee ? this.state.employee.employeeType : ''}</td>
            </tr>
            <tr>
              <td style={headerCellStyle}>Status</td>
              <td>
                {this.state.employee ? this.state.employee.status === 1 ? 'Working' : 'Not Working' : ''}
              </td>
            </tr>
            <tr>
              <td style={headerCellStyle}>Date Of Joining</td>
              <td>
                {this.state.employee ? new Date(this.state.employee.dateOfJoining).toLocaleDateString('en-GB', 
                { year: 'numeric',month: 'short', day: 'numeric' }): ''}
              </td>
            </tr>
            <tr>
              <td style={headerCellStyle}>Retirement Date</td>
              <td>{this.state.retirementDate ? this.state.retirementDate.toLocaleDateString('en-GB',
                   {year: 'numeric', month: 'short', day: 'numeric' }) : ''}</td>
            </tr>
            <tr>
              <td style={headerCellStyle}>Time Left Until Retirement</td>
              <td> {this.state.days + " Days"|| '0 Days'} , {this.state.months + " Months" || '0 Months'} , {this.state.years + " Years" || '0 Years'}</td>
            </tr>
            
          </tbody>
        </Table>
      </div>
    );
  }
}

export default EmployeeDetails;
