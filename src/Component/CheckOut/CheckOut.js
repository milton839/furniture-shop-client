import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Table,Spinner } from 'react-bootstrap';
import { UserContext } from '../../App';

const CheckOut = () => {
    document.title = "Checkout Page";
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [checkProduct, setCheckProduct] = useState([]);
    const [count, setCount] = useState(1);
    const {pdId} = useParams();
    console.log(pdId)
    useEffect(() => {
        fetch('https://furniture-shop-839.herokuapp.com/products')
        .then(res => res.json())
        .then(data => setCheckProduct(data))
    },[]);

    const selectProduct = checkProduct.find(product => product._id === pdId);
    
    return (
        <div className="container mt-4">
            {
                checkProduct.length===0 && <Spinner style={{ margin:'0 auto' }} animation="grow" variant="primary" />
            }
            <h2>CheckOut</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th></th>
                        <th className="text-center">Description</th>
                        <th className="text-center">Quantity</th>
                        <th className="text-center">Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>{selectProduct?.title}</td>
                        <td className="text-center">{count}</td>
                        <td className="text-center">${selectProduct?.price}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td className="text-center">Total</td>
                        <td></td>
                        <td className="text-center">${selectProduct?.price}</td>
                    </tr>
                </tbody>
            </Table>
            <Link to={`/shipment/${pdId}`}>
                <button style={{backgroundColor:'tomato',border:'0',color:'white',padding:'10px 15px 10px 15px',borderRadius:'10px'}} className="float-right">Checkout</button>
            </Link>
        </div>
    );
};

export default CheckOut;