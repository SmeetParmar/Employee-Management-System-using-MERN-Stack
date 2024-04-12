// import React from "react";
// import { withRouter } from 'react-router-dom';

// class EmployeeFilter extends React.Component {
//     constructor(props) {
//         super(props)
//         const params = new URLSearchParams(this.props.location.search)
//         this.state = {
//             type: params.get('type') || '',
//         }
//       }
    
//       componentDidUpdate(prevProps) {
//         const { search } = this.props.location;
//         const { search: prevSearch } = prevProps.location;
//         if (prevSearch !== search) {
//           this.showOriginalFilter();
//         }
//       }

//       showOriginalFilter = () => {
//         const { search } = this.props.location;
//         const params = new URLSearchParams(search);
//         this.setState({
//           type: params.get('type') || '',
//         })
//       }

//     onChangeStatus = (e) => {
//         const { value } = e.target;
//         this.setState({ type: value });
//       }

//       applyFilter = () => {
//         const { type } = this.state
//          const { history } = this.props;
     
//          const params = new URLSearchParams();
//          if (type) params.set('type', type);
//          const search = params.toString()? `?${params.toString()}`: '';
//          history.push({pathname: '/employee', search});
//        }

//     render() {
//         const { type } = this.state
//         const buttonStyle = {
//           padding: '5px 12px',  backgroundColor: '#00008b', color: 'white', border: 'none'
//         };
    
//         const inputStyle = {
//            padding: '4px 12px', 
//         };
//         return (
//             <div>
//                 Employement Type: {' '}
//                 <select style={inputStyle} onChange={this.onChangeStatus} value={type}>
//                     <option value=''>All</option>
//                     <option value='PartTime'>Part Time</option>
//                     <option value='FullTime'>Full Time</option>
//                     <option value='Seasonal'>Seasonal</option>
//                     <option value='Contract'>Contract</option>
//                 </select>
//                 {'   '}
//                 <button style={buttonStyle} type="button" onClick={this.applyFilter}>Apply</button>
//             </div>
//         );
//     }
// }

// export default withRouter(EmployeeFilter);

import React from "react";
import { withRouter } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

class EmployeeFilter extends React.Component {
    constructor(props) {
        super(props)
        const params = new URLSearchParams(this.props.location.search)
        this.state = {
            type: params.get('type') || '',
        }
    }
    
    componentDidUpdate(prevProps) {
        const { search } = this.props.location;
        const { search: prevSearch } = prevProps.location;
        if (prevSearch !== search) {
            this.showOriginalFilter();
        }
    }

    showOriginalFilter = () => {
        const { search } = this.props.location;
        const params = new URLSearchParams(search);
        this.setState({
            type: params.get('type') || '',
        })
    }

    onChangeStatus = (value) => {
        this.setState({ type: value });
    }

    applyFilter = () => {
        const { type } = this.state
        const { history } = this.props;

        const params = new URLSearchParams();
        if (type) params.set('type', type);
        const search = params.toString()? `?${params.toString()}`: '';
        history.push({pathname: '/employee', search});
    }

    render() {
        const { type } = this.state;

        return (
          <div className="d-flex align-items-center">
                    Employement Type: {' '}
                    <Dropdown onSelect={this.onChangeStatus}>
                        <Dropdown.Toggle variant="primary" className="px-3 ms-2" id="dropdown-basic">
                         {type ? type : 'All'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey=''>All</Dropdown.Item>
                            <Dropdown.Item eventKey='PartTime'>Part Time</Dropdown.Item>
                            <Dropdown.Item eventKey='FullTime'>Full Time</Dropdown.Item>
                            <Dropdown.Item eventKey='Seasonal'>Seasonal</Dropdown.Item>
                            <Dropdown.Item eventKey='Contract'>Contract</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                <button className="btn btn-secondary ms-2 px-4" type="button" onClick={this.applyFilter}>Apply</button>
            </div>
        );
    }
}

export default withRouter(EmployeeFilter);

