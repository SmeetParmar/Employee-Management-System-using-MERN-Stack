// import React from 'react';
// import EmployeeRow from './EmployeeRow.jsx';

// // employee table which displayes a table and a heading, inside which row component is called....
// class EmployeeTable extends React.Component {
//     render() {
//       const style = {
//         textAlign: 'center', padding: '10px', border: '1px solid black',
//       };
  
//       const tableStyle = {
//         border: '1px solid black', borderCollapse: 'collapse', width: '100%', margin: '20px 0',
//       };
  
//       const headerCellStyle = {
//         backgroundColor: '#00008b', border: '1px solid black', color: 'white', padding: '10px', textAlign: 'center',
//       };
//       return (
//         <div>
//           <table style={tableStyle}>
//             <thead>
//               <tr>
//                 <td style={headerCellStyle}>ID</td>
//                 <td style={headerCellStyle}>First Name</td>
//                 <td style={headerCellStyle}>Type</td>
//                 <td style={headerCellStyle}>Status</td>
//                 <td style={headerCellStyle}>Actions</td>
//               </tr>
//             </thead>
//             <tbody>
//               {this.props.employees.map((eachEmployee,index) => (
//               <EmployeeRow 
//                 rowStyle={style} 
//                 employee={eachEmployee} 
//                 key={eachEmployee.id} 
//                 deleteEmployee={this.props.deleteEmployee}
//                 terminateEmployee={this.props.terminateEmployee}
//                 index={index}
//               />))}
//             </tbody>
//           </table>
//         </div>
//       )
//     }
//   }

// export default EmployeeTable;
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
