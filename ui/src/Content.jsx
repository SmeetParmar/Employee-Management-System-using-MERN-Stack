import React from 'react';
import EmployeeDirectory from './EmployeeDirectory.jsx';
import EmployeeCreate from './EmployeeCreate.jsx';
import { Switch, Route, Redirect } from 'react-router-dom';
import EmployeeSearch from './EmployeeSearch.jsx';
import PageNotFound from './PageNotFound.jsx';
import EmployeeDetails from './EmployeeDetails.jsx';
import EmployeeEdit from "./EmployeeEdit.jsx";
import upComingRetirement from "./upComingRetirement.jsx";

function Content() {
  return (
    <Switch>
      <Redirect exact to="/employee" from="/" />
      <Route exact path="/employee" component={EmployeeDirectory}/>
      <Route path="/employee/:id" component={EmployeeDetails}/>
      <Route path="/employeeAdd" component={EmployeeCreate}/>
      <Route path="/upComingRetirement" component={upComingRetirement}/>
      <Route path="/employeeEdit/:id" component={EmployeeEdit}/>
      <Route path="/employeeSearch" component={EmployeeSearch}/>
      <Route component={PageNotFound}/>
    </Switch>
  )  
}

export default Content;