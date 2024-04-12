import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { button } from "react-bootstrap";

// employee row component which populated data in row of employee table...
const EmployeeRow = withRouter((props) => {
    const style = props.rowStyle;
    const statusColor = props.employee.status === 1 ? '#45e03a' : 'red';

    const { location: { search }, deleteEmployee, terminateEmployee, index} = props

    // const buttonStyle = {
    //     padding: '5px 15px', fontSize: '16px', backgroundColor: '#ffc400', color: 'white', border: 'none'
    //   };

    //   const editLinkStyle = {
    //     padding: '5px 15px', textDecoration: 'none', fontSize: '16px', backgroundColor: '#00ff26', color: 'white', border: 'none'
    //   };

    //   const detailsLinkStyle = {
    //     padding: '5px 15px',  textDecoration: 'none', fontSize: '16px', backgroundColor: '#00b3ff', color: 'white', border: 'none'
    //   };

    //   const terminateButtonStyle = {
    //     padding: '5px 15px', fontSize: '16px', backgroundColor: '#ff3700', color: 'white', border: 'none'
    //   };

      return(
          <tr>
              <td style={style}>{props.employee.id}</td>
              <td style={style}>{props.employee.firstname}</td>
              <td style={style}>{props.employee.employeeType}</td>
              <td style={{ ...style, color: statusColor, fontWeight: 'bold' }}>{props.employee.status === 1 ? 'Working' : 'Not Working'}</td>
              <td style={style}>
                <Link className='btn btn-success me-1 px-3' to={`/employeeEdit/${props.employee.id}`}>Edit</Link>
                {'   '}
                <Link className='btn btn-info text-white me-1 px-3' to={`/employee/${props.employee.id}`}>All Details</Link>
                {'   '}
                <button className='btn btn-warning text-white me-1 px-3' onClick={() => deleteEmployee(index)}>Delete Employee</button>
                {props.employee.status === 1 && (
                    <>
                        {'   '}
                        <button className='btn btn-danger me-1 px-3' onClick={() => terminateEmployee(index)}>Terminate Employee</button>
                    </>
                )}
              </td>
          </tr>
      );
});          

export default EmployeeRow;