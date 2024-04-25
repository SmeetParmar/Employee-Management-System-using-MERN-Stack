import React from 'react';
import { graphQlFetch } from './graphQlFetch.js';
import { Table } from "react-bootstrap";
import UpComingRetirementFilter from './upComingRetirementFilter.jsx';

class UpcomingRetirement extends React.Component {

    constructor() {
        super();
        this.state = { employees: [] };
    }

    async componentDidMount() {
        await this.getUpcomingRetirements();
    }

    componentDidUpdate(prevProps) {
        const params = this.props.location.search;
        const prevparams = prevProps.location.search;
        if (prevparams != params) {
          this.getUpcomingRetirements();
        }
      }

    async getUpcomingRetirements() {
        const vars = {}
        const { search } = this.props.location;
        const params = new URLSearchParams(search);
        if (params.get('type')) vars.type = params.get('type');

        const query = `
            query 
                upComingRetirement( $type: defaultEmployeeType )
                {
                    upComingRetirement(employeeType: $type) {
                        id
                        firstname
                        lastname
                        age
                        dateOfJoining
                        title
                        department
                        employeeType
                        status
                    }
                
            }`;

        const result = await graphQlFetch(query,vars);
        this.setState({ employees: result.upComingRetirement });
    }

    render() {
        const mainStyle = {
            textAlign: 'center',
            color: '#ff03ee',
            marginBottom: '30px',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
        };

        const headStyle = {
            backgroundColor: '#00008b', 
            color: 'white', 
        };

        return (
            <>
                <h1 className='mt-3' style={mainStyle}>Upcoming Retirements</h1>
                <h3 style={mainStyle}>Employees who are retiring within the next 6 months...</h3>
                <UpComingRetirementFilter filterName="UpComingRetirement"/> <br/>
                <Table bordered responsive hover className='text-center'>
                    <thead>
                        <tr>
                            <th style={headStyle}>ID</th>
                            <th style={headStyle}>First Name</th>
                            <th style={headStyle}>Last Name</th>
                            <th style={headStyle}>Age</th>
                            <th style={headStyle}>Date of Joining</th>
                            <th style={headStyle}>Retirement Date</th>
                            <th style={headStyle}>Title</th>
                            <th style={headStyle}>Department</th>
                            <th style={headStyle}>Employee Type</th>
                            <th style={headStyle}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.employees.map(employee => {
                            const retirementAge = 65 - parseInt(employee.age);
                            const dateOfJoining = new Date(employee.dateOfJoining);
                            const retirementDate = new Date(dateOfJoining);
                            retirementDate.setFullYear(retirementDate.getFullYear() + retirementAge);

                            const statusColor = employee.status === 1 ? '#45e03a' : 'red';

                            return (
                                <tr key={employee.id}>
                                    <td>{employee.id}</td>
                                    <td>{employee.firstname}</td>
                                    <td>{employee.lastname}</td>
                                    <td>{employee.age}</td>
                                    <td>{new Date(employee.dateOfJoining).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                                    <td>{retirementDate.toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                                    <td>{employee.title}</td>
                                    <td>{employee.department}</td>
                                    <td>{employee.employeeType}</td>
                                    <td style={{ color: statusColor, fontWeight: 'bold' }}>{employee.status === 1 ? 'Working' : 'Not Working'}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </>
        );
    }
}

export default UpcomingRetirement;
