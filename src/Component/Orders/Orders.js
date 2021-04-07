import React, { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { Table } from 'react-bootstrap';
import OrderView from '../OrderView/OrderView';

const Orders = () => {
    document.title = "Orders Page";
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        fetch('https://furniture-shop-839.herokuapp.com/ordersProduct?email='+loggedInUser.email)
        .then(response => response.json())
        .then(data => setOrders(data));
    }, []);
    
    return (
        <div className="container">
            <h1 className="text-center">You have {orders.length} orders</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Product Name</th>
                    <th>Order Time</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map(order =><OrderView order = {order}></OrderView>)
                    }
                </tbody>
            </Table>
        </div>
    );
};

export default Orders;