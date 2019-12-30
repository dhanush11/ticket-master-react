import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

import CustomerList from './components/customers/List';
import CustomerNew from './components/customers/New';
import CustomerShow from './components/customers/Show';
import CustomerEdit from './components/customers/Edit';

import DepartmentList from './components/Departments/DepIndex';

import EmployeeList from './components/employees/List'
import EmployeeNew from './components/employees/New'
import EmployeeShow from './components/employees/Show'


class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <h1>Ticket Master</h1>
                    <ul>
                        <li><Link to="/" >Home</Link></li>
                        <li><Link to="/customers">Customers</Link></li>
                        <li><Link to="/departments">Departments</Link></li>
                        <li><Link to="/employees">Employees</Link></li>
                    </ul>

                    <Switch>
                        <Route path="/customers" component={CustomerList} exact={true} />
                        <Route path="/customers/new" component={CustomerNew} exact={true} />
                        <Route path="/customers/edit/:id" component={CustomerEdit} exact={true} />
                        <Route path="/customers/:id" component={CustomerShow} />

                        <Route path="/departments" component={DepartmentList} exact={true} />

                        <Route path="/employees" component={EmployeeList} exact={true} />
                        <Route path="/employees/new" component={EmployeeNew} exact={true} />
                        <Route path="/employees/:id" component={EmployeeShow} exact={true} />
                    </Switch>


                </div>
            </BrowserRouter>
        )
    }
}


export default App;