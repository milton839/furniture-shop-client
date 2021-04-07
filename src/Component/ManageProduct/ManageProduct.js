import React, { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Table,Spinner } from 'react-bootstrap';
import { FaEdit, FaPlus,FaMagnet } from 'react-icons/fa';
import ManageProductDetails from '../ManageProductDetails/ManageProductDetails';

const ManageProduct = () => {
    document.title = "Manage Product";
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://furniture-shop-839.herokuapp.com/products',)
        .then(response => response.json())
        .then(data => {
            setProducts(data)
            setLoading(false)
        })
    })
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-3 pt-5" style ={{  backgroundColor:'#203D37',height:'600px' }}>
                
                        <Nav className="">
                            <Nav.Link><Link className="text-white" style ={{ textDecoration:'none' }} to="/manageProduct"><FaMagnet /> Manage Product</Link></Nav.Link>
                            <Nav.Link><Link className="text-white" style ={{ textDecoration:'none' }} to="/admins"><FaPlus /> Add Product</Link></Nav.Link>
                            <Nav.Link><Link className="text-white" style ={{ textDecoration:'none' }} to="/editProduct"><FaEdit /> Edit Product</Link></Nav.Link>
                            
                        </Nav>
                </div>
                <div className="col-lg-7 mt-5 ml-5">
                <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Product Name</th>
                    <th>Product Price</th>
                    <th>Product Image</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                            {
                                products.map(item => <ManageProductDetails item={item} key={item._id}></ManageProductDetails>)
                            }
                </tbody>
                </Table>
                </div>
            </div>
        </div>
    );
};

export default ManageProduct;