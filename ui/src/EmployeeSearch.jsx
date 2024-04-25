import React from 'react';

// employee search component which has input field and a button, it is not functional...
class EmployeeSearch extends React.Component {
    render() {
      const containerStyle = {display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px 0'};

      const inputStyle = {
        padding: '10px', marginRight: '20px', fontSize: '16px', borderRadius: '4px',
        border: '1px solid #ccc', boxSizing: 'border-box', width: '400px'
      };
  
      const buttonStyle = {
        padding: '10px', fontSize: '16px', backgroundColor: '#00008b', color: 'white', border: 'none', borderRadius: '4px',
      };

      const mainStyle = { textAlign: 'center', color: '#ff03ee', marginBottom: '30px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'};
  
      return (
        <>
        <h1 className='mt-3' style={mainStyle}>Search Employee</h1>
        
        <div style={containerStyle}>
          <input style={inputStyle} name="search" placeholder="Search..." />
          <button style={buttonStyle}>Search</button>
        </div>
        </>
      );
    }
  }

  export default EmployeeSearch;