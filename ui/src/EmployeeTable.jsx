import React from 'react';
import EmployeeRow from './EmployeeRow.jsx';
import { Table } from 'react-bootstrap';

class EmployeeTable extends React.Component {
  render() {
    const headStyle = {
      backgroundColor: '#00008b',
      color: '#ffffff',
    };
    return (
      <div>
        <Table bordered hover responsive className='text-center mt-3'>
          <thead>
            <tr>
              <th style={headStyle}>ID</th>
              <th style={headStyle}>First Name</th>
              <th style={headStyle}>Type</th>
              <th style={headStyle}>Status</th>
              <th style={headStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.props.employees.map((eachEmployee, index) => (
              <EmployeeRow
                employee={eachEmployee}
                key={eachEmployee.id}
                deleteEmployee={this.props.deleteEmployee}
                terminateEmployee={this.props.terminateEmployee}
                index={index}
              />
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default EmployeeTable;
