import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan , faEdit } from "@fortawesome/free-solid-svg-icons";

// employee row component which populated data in row of employee table...
const EmployeeRow = withRouter((props) => {
    const style = props.rowStyle;
    const statusColor = props.employee.status === 1 ? '#45e03a' : 'red';

    const { location: { search }, deleteEmployee, terminateEmployee, index} = props

    const EditTt = (
        <Tooltip id="edit-tooltip" placement="top">
          Click here to edit employee
        </Tooltip>
      );

    const deleteTt = (
    <Tooltip id="delete-tooltip" placement="right">
        Click here to delete employee
    </Tooltip>
    );

    const deleteemp = (e) => {
        e.preventDefault();
        deleteEmployee(index);
      }

      return(
          <tr>
              <td style={style}>{props.employee.id}</td>
              <td style={style}>{props.employee.firstname}</td>
              <td style={style}>{props.employee.employeeType}</td>
              <td style={{ ...style, color: statusColor, fontWeight: 'bold' }}>{props.employee.status === 1 ? 'Working' : 'Not Working'}</td>
              <td style={style}>
                <Link className='btn btn-info text-white me-1 px-3' to={`/employee/${props.employee.id}`}>All Details</Link>

                {props.employee.status === 1 && (
                    <>
                        {'   '}
                        <button className='btn btn-danger me-1 px-3' onClick={() => terminateEmployee(index)}>Terminate Employee</button>
                    </>
                )}
                {'   '}
                <Link className='btn me-1 pr-3' to={`/employeeEdit/${props.employee.id}`}>
                    <OverlayTrigger
                        placement="top"
                        delay={{ show: 700 }}
                        overlay={EditTt}
                    >
                    <Button size="sm" className='bg-warning border-0'>
                        <FontAwesomeIcon icon={faEdit}  style={{ color: 'white' }}/>
                    </Button>
                    </OverlayTrigger>
                </Link>
                {'   '}
                <span className=" me-1 pe-3 w-auto">
                <OverlayTrigger
                placement="right"
                delay={{ show: 700 }}
                overlay={deleteTt}
                
                >
                    <Button size="sm" onClick={deleteemp} className='bg-dark border-0'>
                        <FontAwesomeIcon icon={faTrashCan} style={{ color: 'white' }} />
                    </Button>
                </OverlayTrigger>
                </span>
              </td>
          </tr>
      );
});          

export default EmployeeRow;