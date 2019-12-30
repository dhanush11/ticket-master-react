import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../../Images/loader.gif'

class CustomerList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            customers: [],
            isLoading: true
        }
    }

    componentDidMount() {
        axios.get(`https://dct-ticket-master.herokuapp.com/customers`, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const customers = response.data;
                this.setState(() => ({
                    customers,
                    isLoading: false
                }))
            })
            .catch((error) => {
                //console.log(error);
                //this.props.history.push('/users/login');
                console.log(error)
            })
    }

    render() {
        return (
            <div>
                <h2>Listing Customers</h2>
                {this.state.isLoading === true ? (
                    <img src={logo} alt="loading..." height="120" width="120" />
                ) : (
                        <div>
                            <ul>
                                {this.state.customers.map(customer => {
                                    return <li key={customer._id}>
                                        <Link to={`/customers/${customer._id}`}>
                                            {customer.name}
                                        </Link>
                                    </li>
                                })}
                            </ul>
                            <Link to="/customers/new">Add Customer</Link>
                        </div>
                    )}

            </div>
        )
    }
}

export default CustomerList;