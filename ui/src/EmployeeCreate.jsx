import React from 'react';
import { graphQlFetch } from './graphQlFetch.js';
import { Button, Form} from 'react-bootstrap';

// employee create component which have a form with validations...
class EmployeeCreate extends React.Component {
  
    constructor() {
      super();
  
      // state for storing formData and errors...
      this.state = {
        formData: {
          firstname: '', lastname: '', age: '', dateOfJoining: '', title: '', department: '', employeeType: '',
        },
        errors: {
          firstname: '', lastname: '', age: '', dateOfJoining: '', title: '', department: '', employeeType: '',
        },
      };
  
      //binding inputs and change functions...
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    //function for validating form data...
    validateForm = () => {
  
      //boolean variable for checking inputs...
      let isValid = true;
      const { formData } = this.state;
  
      //copying error state and making new object...
      const newErrors = { ...this.state.errors };
  
      //functions for checking input and showing valid errors accordingly as inputs....
  
      if (formData.firstname.trim() === '') 
      {
        newErrors.firstname = 'First Name Is Required...';
        isValid = false;
      } 
      else 
      {
        newErrors.firstname = '';
      }
  
      if (formData.lastname.trim() === '') 
      {
        newErrors.lastname = 'Last Name Is Required...';
        isValid = false;
      } 
      else 
      {
        newErrors.lastname = '';
      }
  
      if (formData.age.trim() === '') 
      {
        newErrors.age = 'Age Is Required...';
        isValid = false;
      }
      else if(isNaN(parseInt(formData.age, 10)) || formData.age < 21 || formData.age > 71)
      {
        newErrors.age = 'Enter A Valid Age Beteween 20 To 70....';
        isValid = false;
      } 
      else 
      {
        newErrors.age = '';
      }
  
      if (formData.dateOfJoining.trim() === '') 
      {
        newErrors.dateOfJoining = 'Date Of Joining Is Required...';
        isValid = false;
      } 
      else 
      {
        newErrors.dateOfJoining = '';
      }
  
      if (formData.title === '') {
        newErrors.title = 'Please Select The Title...';
        isValid = false;
      } 
      else if(formData.title === 'default')
      {
        newErrors.title = 'Please Select The Title...';
        isValid = false;
      }
      else 
      {
        newErrors.title = '';
      }
      
  
      if (formData.department === '') 
      {
        newErrors.department = 'Please Select The Department...';
        isValid = false;
      }  
      else if(formData.department === 'default')
      {
        newErrors.department = 'Please Select The Department...';
        isValid = false;
      }
      else 
      {
        newErrors.department = '';
      }
      
      if (formData.employeeType === '') 
      {
        newErrors.employeeType = 'Please Select Employee Type...';
        isValid = false;
      }   
      else if(formData.employeeType === 'default')
      {
        newErrors.employeeType = 'Please Select Employee Type...';
        isValid = false;
      }
      else 
      {
        newErrors.employeeType = '';
      }
  
      //setting the errors in state....
      this.setState({ errors: newErrors });
      return isValid;
    };
  
    //function when submit button is clicked...
    handleSubmit(e){
      e.preventDefault();
  
      //if the form will be valid, it will call createEmployee function and make input state empty...
      if (this.validateForm()) 
      {
        this.createEmployee(this.state.formData);
        //console.log(this.state.formData);
        this.setState({
          formData: {
            firstname: '', lastname: '', age: '', dateOfJoining: '', title: '', department: '', employeeType: '',
          }
        });
      } 
      else 
      {
        alert("Insert Valid Data...");
      }
    };

    async createEmployee(data) {
  
      //graphql mutation query for add new employee...
      const query = `mutation AddEmployee($employee: inputEmployee!) 
                    {
                      addEmployee(employee: $employee) { id }
                    }`;

      const result = await graphQlFetch(query, { employee: { ...data } });
      if(result)
      {
        alert("New Employee Created...");
      }
      else
      {
        alert("Error inserting data...");
      }

  }
  
    //function for updating input state data as user enters data...
    handleInputChange = (event) => {
      const fieldName = event.target.name;
      const fieldValue = event.target.value;
  
      //copying previous data and adding new data to it...
      this.setState((prevState) => ({
        formData: { ...prevState.formData, [fieldName]: fieldValue },
      }));
    };
  
    render() {
  
      const buttonStyle = {
        width:'200px',
      };
  
      const formStyle = {
        display: 'flex', flexDirection: 'column', maxWidth: '650px', margin: 'auto', padding: '20px',
        border: '1px solid black', borderRadius: '3px', boxSizing: 'border-box'
      };
  
      const mainStyle = { textAlign: 'center', color: '#ff03ee', marginBottom: '30px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'};
          
      return (
        <>
        <h1 className='mt-3' style={mainStyle}>Add New Employee</h1>
        <form name="employeeForm" onSubmit={this.handleSubmit} style={formStyle}>
        
        <Form.Group className="mb-3">
          <Form.Label controlId="firstName" className="mb-1" >First Name</Form.Label>
          <Form.Control type="text" name="firstname" value={this.state.formData.firstname} onChange={this.handleInputChange} />
          <span className='fw-bold text-danger'>{this.state.errors.firstname}</span>
        </Form.Group>
        
        <Form.Group className='mb-3'>
          <Form.Label controlId="lastname" className="mb-1">Last Name</Form.Label>
          <Form.Control type="text" name="lastname" value={this.state.formData.lastname} onChange={this.handleInputChange} />
          <span className='fw-bold text-danger'>{this.state.errors.lastname}</span>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label controlId="age" className="mb-1">Age</Form.Label>
          <Form.Control type="number" name="age" value={this.state.formData.age} onChange={this.handleInputChange} />
          <span className='fw-bold text-danger'>{this.state.errors.age}</span>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label controlId="dateOfJoining" className="mb-1">Date Of Joining</Form.Label>
          <Form.Control type="date" name="dateOfJoining" value={this.state.formData.dateOfJoining} onChange={this.handleInputChange}/>
          <span className='fw-bold text-danger'>{this.state.errors.dateOfJoining}</span>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label controlId="title" className="mb-1">Title</Form.Label>
          <Form.Select name="title" value={this.state.formData.title} onChange={this.handleInputChange}  >
                <option value="default">Select Title</option>
                <option value="Manager">Manager</option>
                <option value="Employee">Employee</option>
                <option value="Director">Director</option>
                <option value="VP">VP</option>
          </Form.Select>
          <span className='fw-bold text-danger'>{this.state.errors.title}</span>
        </Form.Group>

        <Form.Group className='mb-3'>
        <Form.Label controlId="department" className="mb-1">Department</Form.Label>
            <Form.Select name="department" value={this.state.formData.department} onChange={this.handleInputChange} >
                <option value="default">Select Department</option>
                <option value="Marketing">Marketing</option>
                <option value="Engineering">Engineering</option>
                <option value="HR">HR</option>
                <option value="IT">IT</option>
            </Form.Select>
            <span className='fw-bold text-danger'>{this.state.errors.department}</span>
        </Form.Group>

        <Form.Group className='mb-3'>
        <Form.Label controlId="employeeType" className="mb-3">Type</Form.Label>
          <Form.Select name="employeeType" value={this.state.formData.employeeType} onChange={this.handleInputChange} placeholder='Employee Type'>
              <option value="default">Select Employee Type</option>
              <option value="FullTime">Full Time</option>
              <option value="PartTime">Part Time</option>
              <option value="Contract">Contract</option>
              <option value="Seasonal">Seasonal</option>
          </Form.Select>
          <span className='fw-bold text-danger'>{this.state.errors.employeeType}</span>
          </Form.Group>

        <Button type="submit" style={buttonStyle} className='btn btn-primary px-3 mt-3 mx-auto text-center '>Add Employee</Button>
      </form>
      </>
      );
    }
  }

  export default EmployeeCreate;