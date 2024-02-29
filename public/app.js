// employee create component which have a form with validations...
class EmployeeCreate extends React.Component {
  constructor() {
    super();

    // state for storing formData and errors...
    this.state = {
      formData: {
        firstname: '',
        lastname: '',
        age: '',
        dateOfJoining: '',
        title: '',
        department: '',
        employeeType: ''
      },
      errors: {
        firstname: '',
        lastname: '',
        age: '',
        dateOfJoining: '',
        title: '',
        department: '',
        employeeType: ''
      }
    };

    //binding inputs and change functions...
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //function for validating form data...
  validateForm = () => {
    //boolean variable for checking inputs...
    let isValid = true;
    const {
      formData
    } = this.state;

    //copying error state and making new object...
    const newErrors = {
      ...this.state.errors
    };

    //functions for checking input and showing valid errors accordingly as inputs....

    if (formData.firstname.trim() === '') {
      newErrors.firstname = 'First Name Is Required...';
      isValid = false;
    } else {
      newErrors.firstname = '';
    }
    if (formData.lastname.trim() === '') {
      newErrors.lastname = 'Last Name Is Required...';
      isValid = false;
    } else {
      newErrors.lastname = '';
    }
    if (formData.age.trim() === '') {
      newErrors.age = 'Age Is Required...';
      isValid = false;
    } else if (isNaN(parseInt(formData.age, 10)) || formData.age < 21 || formData.age > 71) {
      newErrors.age = 'Enter A Valid Age Beteween 20 To 70....';
      isValid = false;
    } else {
      newErrors.age = '';
    }
    if (formData.dateOfJoining.trim() === '') {
      newErrors.dateOfJoining = 'Date Of Joining Is Required...';
      isValid = false;
    } else {
      newErrors.dateOfJoining = '';
    }
    if (formData.title.trim() === '') {
      newErrors.title = 'Title Is Required...';
      isValid = false;
    } else if (formData.title != "VP" && formData.title != "Employee" && formData.title != "Manager" && formData.title != "Director") {
      newErrors.title = 'Please Enter One Of These Values : "VP", "Manager", "Director", "Employee"...';
      isValid = false;
    } else {
      newErrors.title = '';
    }
    if (formData.department.trim() === '') {
      newErrors.department = 'Department Is Required...';
      isValid = false;
    } else if (formData.department != "IT" && formData.department != "HR" && formData.department != "Marketing" && formData.department != "Engineering") {
      newErrors.department = 'Please Enter One Of These Values : "IT", "HR", "Marketing", "Engineering"...';
      isValid = false;
    } else {
      newErrors.department = '';
    }
    if (formData.employeeType.trim() === '') {
      newErrors.employeeType = 'Type Is Required...';
      isValid = false;
    } else if (formData.employeeType != "FullTime" && formData.employeeType != "PartTime" && formData.employeeType != "Contract" && formData.employeeType != "Seasonal") {
      newErrors.employeeType = 'Please Enter One Of These Values : "FullTime", "PartTime", "Contract", "Seasonal"...';
      isValid = false;
    } else {
      newErrors.employeeType = '';
    }

    //setting the errors in state....
    this.setState({
      errors: newErrors
    });
    return isValid;
  };

  //function when submit button is clicked...
  handleSubmit(e) {
    e.preventDefault();

    //if the form will be valid, it will call createEmployee function and make input state empty...
    if (this.validateForm()) {
      this.props.createEmployee(this.state.formData);
      this.setState({
        formData: {
          firstname: '',
          lastname: '',
          age: '',
          dateOfJoining: '',
          title: '',
          department: '',
          employeeType: ''
        }
      });
    } else {
      alert("Insert Valid Data...");
    }
  }
  //function for updating input state data as user enters data...
  handleInputChange = event => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    //copying previous data and adding new data to it...
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [fieldName]: fieldValue
      }
    }));
  };
  render() {
    const buttonStyle = {
      padding: '10px',
      backgroundColor: '#00008b',
      color: 'white',
      marginRight: '200px',
      border: 'none',
      marginLeft: '200px',
      borderRadius: '3px',
      marginTop: '20px'
    };
    const inputStyle = {
      marginBottom: '10px',
      marginTop: '10px',
      padding: '8px',
      border: '1px solid black',
      borderRadius: '3px',
      boxSizing: 'border-box',
      width: '100%'
    };
    const formStyle = {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '650px',
      margin: 'auto',
      padding: '20px',
      border: '1px solid black',
      borderRadius: '3px',
      boxSizing: 'border-box'
    };
    const labelStyle = {
      marginBottom: '10px',
      fontWeight: 'bold'
    };
    const errorStyle = {
      color: 'red',
      marginTop: '5px',
      marginBottom: '10px',
      fontWeight: 'bold'
    };
    return /*#__PURE__*/React.createElement("form", {
      name: "employeeForm",
      onSubmit: this.handleSubmit,
      style: formStyle
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      style: labelStyle
    }, "First Name:"), /*#__PURE__*/React.createElement("input", {
      style: inputStyle,
      name: "firstname",
      value: this.state.formData.firstname,
      onChange: this.handleInputChange
    }), /*#__PURE__*/React.createElement("span", {
      style: errorStyle
    }, this.state.errors.firstname)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      style: labelStyle
    }, "Last Name:"), /*#__PURE__*/React.createElement("input", {
      style: inputStyle,
      name: "lastname",
      value: this.state.formData.lastname,
      onChange: this.handleInputChange
    }), /*#__PURE__*/React.createElement("span", {
      style: errorStyle
    }, this.state.errors.lastname)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      style: labelStyle
    }, "Age:"), /*#__PURE__*/React.createElement("input", {
      style: inputStyle,
      type: "text",
      name: "age",
      value: this.state.formData.age,
      onChange: this.handleInputChange
    }), /*#__PURE__*/React.createElement("span", {
      style: errorStyle
    }, this.state.errors.age)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      style: labelStyle
    }, "Date of Joining:"), /*#__PURE__*/React.createElement("input", {
      style: inputStyle,
      type: "date",
      name: "dateOfJoining",
      value: this.state.formData.dateOfJoining,
      onChange: this.handleInputChange
    }), /*#__PURE__*/React.createElement("span", {
      style: errorStyle
    }, this.state.errors.dateOfJoining)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      style: labelStyle
    }, "Title:"), /*#__PURE__*/React.createElement("input", {
      style: inputStyle,
      type: "text",
      name: "title",
      value: this.state.formData.title,
      onChange: this.handleInputChange
    }), /*#__PURE__*/React.createElement("span", {
      style: errorStyle
    }, this.state.errors.title)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      style: labelStyle
    }, "Department:"), /*#__PURE__*/React.createElement("input", {
      style: inputStyle,
      type: "text",
      name: "department",
      value: this.state.formData.department,
      onChange: this.handleInputChange
    }), /*#__PURE__*/React.createElement("span", {
      style: errorStyle
    }, this.state.errors.department)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      style: labelStyle
    }, "Type:"), /*#__PURE__*/React.createElement("input", {
      style: inputStyle,
      type: "text",
      name: "employeeType",
      value: this.state.formData.employeeType,
      onChange: this.handleInputChange
    }), /*#__PURE__*/React.createElement("span", {
      style: errorStyle
    }, this.state.errors.employeeType)), /*#__PURE__*/React.createElement("button", {
      type: "submit",
      style: buttonStyle
    }, "Register"));
  }
}

// employee search component which has input field and a button, it is not functional...
class EmployeeSearch extends React.Component {
  render() {
    const containerStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '20px 0'
    };
    const inputStyle = {
      padding: '10px',
      marginRight: '20px',
      fontSize: '16px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      boxSizing: 'border-box',
      width: '400px'
    };
    const buttonStyle = {
      padding: '10px',
      fontSize: '16px',
      backgroundColor: '#00008b',
      color: 'white',
      border: 'none',
      borderRadius: '4px'
    };
    return /*#__PURE__*/React.createElement("div", {
      style: containerStyle
    }, /*#__PURE__*/React.createElement("input", {
      style: inputStyle,
      name: "search",
      placeholder: "Search..."
    }), /*#__PURE__*/React.createElement("button", {
      style: buttonStyle
    }, "Search"));
  }
}

// employee row component which populated data in row of employee table...
class EmployeeRow extends React.Component {
  render() {
    const style = this.props.rowStyle;
    const statusColor = this.props.employee.status === 1 ? '#45e03a' : 'red';
    return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
      style: style
    }, this.props.employee.id), /*#__PURE__*/React.createElement("td", {
      style: style
    }, this.props.employee.firstname), /*#__PURE__*/React.createElement("td", {
      style: style
    }, this.props.employee.lastname), /*#__PURE__*/React.createElement("td", {
      style: style
    }, this.props.employee.age), /*#__PURE__*/React.createElement("td", {
      style: style
    }, new Date(this.props.employee.dateOfJoining).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })), /*#__PURE__*/React.createElement("td", {
      style: style
    }, this.props.employee.title), /*#__PURE__*/React.createElement("td", {
      style: style
    }, this.props.employee.department), /*#__PURE__*/React.createElement("td", {
      style: style
    }, this.props.employee.employeeType), /*#__PURE__*/React.createElement("td", {
      style: {
        ...style,
        color: statusColor,
        fontWeight: 'bold'
      }
    }, this.props.employee.status === 1 ? 'Working' : 'Not Working'));
  }
}

// employee table which displayes a table and a heading, inside which row component is called....
class EmployeeTable extends React.Component {
  render() {
    const style = {
      textAlign: 'center',
      padding: '10px',
      border: '1px solid black'
    };
    const tableStyle = {
      border: '1px solid black',
      borderCollapse: 'collapse',
      width: '100%',
      margin: '20px 0'
    };
    const headerCellStyle = {
      backgroundColor: '#00008b',
      border: '1px solid black',
      color: 'white',
      padding: '10px',
      textAlign: 'center'
    };
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("table", {
      style: tableStyle
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
      style: headerCellStyle
    }, "ID"), /*#__PURE__*/React.createElement("td", {
      style: headerCellStyle
    }, "First Name"), /*#__PURE__*/React.createElement("td", {
      style: headerCellStyle
    }, "Last Name"), /*#__PURE__*/React.createElement("td", {
      style: headerCellStyle
    }, "Age"), /*#__PURE__*/React.createElement("td", {
      style: headerCellStyle
    }, "Date Of Joining"), /*#__PURE__*/React.createElement("td", {
      style: headerCellStyle
    }, "Title"), /*#__PURE__*/React.createElement("td", {
      style: headerCellStyle
    }, "Department"), /*#__PURE__*/React.createElement("td", {
      style: headerCellStyle
    }, "Type"), /*#__PURE__*/React.createElement("td", {
      style: headerCellStyle
    }, "Status"))), /*#__PURE__*/React.createElement("tbody", null, this.props.employees.map(eachEmployee => /*#__PURE__*/React.createElement(EmployeeRow, {
      rowStyle: style,
      employee: eachEmployee,
      key: eachEmployee.id
    })))));
  }
}

// employee directory component which has all components in it and has mutation and query, for selecting and inserting data using graphql api...
class EmployeeDirectory extends React.Component {
  constructor() {
    super();
    this.state = {
      employees: []
    };
    this.createEmployee = this.createEmployee.bind(this);
  }

  //calling load data when component mounts in application...
  componentDidMount() {
    this.loadData();
  }

  //function for selecting data...
  async loadData() {
    // graphql api query for fetching data... 
    const query = `
      query {
              employeeList { id firstname lastname department title
                             age employeeType status dateOfJoining }
            }`;
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query
      })
    });
    const body = await response.text();
    const result = JSON.parse(body);
    this.setState({
      employees: result.data.employeeList
    });
  }

  //function for creating new employee...
  async createEmployee(data) {
    //graphql mutation query for add new employee...
    const query = `mutation AddEmployee($employee: inputEmployee!) 
                  {
                    addEmployee(employee: $employee) { id }
                  }`;
    await fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query,
        variables: {
          employee: data
        }
      })
    });

    //calling funtion that selects all data...
    this.loadData();
  }
  render() {
    const headingStyle = {
      textAlign: 'center',
      color: '#00008b',
      marginBottom: '20px',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
    };
    const mainStyle = {
      textAlign: 'center',
      color: '#ff03ee',
      marginBottom: '30px',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
    };
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", {
      style: mainStyle
    }, "EMPLOYEE MANAGEMENT SYSTEM"), /*#__PURE__*/React.createElement("h2", {
      style: headingStyle
    }, "Employee Search"), /*#__PURE__*/React.createElement(EmployeeSearch, null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("h2", {
      style: headingStyle
    }, "Employee Table"), /*#__PURE__*/React.createElement(EmployeeTable, {
      employees: this.state.employees
    }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("h2", {
      style: headingStyle
    }, "Employee Create"), /*#__PURE__*/React.createElement(EmployeeCreate, {
      createEmployee: this.createEmployee
    }));
  }
}

// rendering employee directory component in data div...
ReactDOM.render( /*#__PURE__*/React.createElement(EmployeeDirectory, null), document.getElementById('data'));