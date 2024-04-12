import React from 'react';
import { graphQlFetch } from './graphQlFetch.js';
import { Table } from "react-bootstrap";

class UpcomingRetirement extends React.Component {

    constructor() {
        super();
        this.state = { employees: [] };
    }

    async componentDidMount() {
        await this.getUpcomingRetirements();
    }

    async getUpcomingRetirements() {
        const query = `
            query {
                upComingRetirement {
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

        const result = await graphQlFetch(query);
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
                <h1 style={mainStyle}>Upcoming Retirements</h1>
                <h3 style={mainStyle}>Employees who are retiring within the next 6 months...</h3>
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
                            const retirementAge = 60 - parseInt(employee.age);
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
