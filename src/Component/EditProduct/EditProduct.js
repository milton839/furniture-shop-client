import React from 'react';
import { Navbar,Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaEdit,FaPlus,FaMagnet } from 'react-icons/fa';

const EditProduct = () => {
    document.title = "Edit Product";
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
                    <h2>Edit product</h2>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;