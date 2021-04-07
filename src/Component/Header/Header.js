import React from 'react';
import { Navbar,Nav,Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div style={{ backgroundColor:'#0069D9' }}>
            <Navbar className="container" expand="lg">
                <Navbar.Brand href="#home">
                    <h2 className="text-uppercase fw-bold text-white">
                        <Link className="fs-5 text-decoration-none text-white fw-bold active" to="/home">FURNITURE SHOP</Link>
                    </h2>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                    <Nav.Link><Link className="fs-5 text-decoration-none text-white fw-bold active" to="/home">HOME</Link></Nav.Link>
                    <Nav.Link><Link className="fs-5 text-decoration-none text-white fw-bold active" to="/orders">ORDERS</Link></Nav.Link>
                    <Nav.Link><Link className="fs-5 text-decoration-none text-white fw-bold active" to="/admins">ADMINS</Link></Nav.Link>
                    <Nav.Link><Link className="fs-5 text-decoration-none text-white fw-bold active" to="/deals">DEALS</Link></Nav.Link>
                    </Nav>
                    <Button style={{ backgroundColor:'tomato',padding:'5px 15px',border:'0',marginLeft:'30px' }} className="fs-5 fw-bold"><Link style={{ textDecoration:'none',color:'white' }} to="/login">Log In</Link></Button>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default Header;