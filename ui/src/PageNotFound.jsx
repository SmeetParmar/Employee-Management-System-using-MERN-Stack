import React from 'react';

class PageNotFound extends React.Component {
    render() {
      const containerStyle = {display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px 0'};
  
      return (
        <div style={containerStyle}>
          <h1>Page Not Found</h1>
        </div>
      );
    }
  }

  export default PageNotFound;