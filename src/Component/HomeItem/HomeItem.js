import React, { useContext, useState } from 'react';
import { Card,Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const HomeItem = (props) => {
    const {_id,title, price, image_url} = props.item;
    return (
        <div className="col-md-4 col-sm-12 col-lg-4 col-12 col-xl-4">
            <Card style={{ width: '21rem', height: '400px',marginBottom: '50px'}}>
                <Card.Img variant="top" style={{height: '250px'}} src = {image_url}  />
                <Card.Body>
                    <Card.Title>
                        <h5 className='mb-4' style={{color:'tomato',fontWeight:'bold'}}>{title}</h5>
                    </Card.Title>
                    <Card.Text style={{marginBottom:'20px'}}>
                        <h3 className="float-left" style={{color:'#0069D9'}}> ${price}</h3>
                        <Link to ={`/checkOut/${_id}`}>
                            <Button  style={{ backgroundColor:'#0069D9',border:'0' }} className="float-right" >Buy Now</Button>
                        </Link>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};

export default HomeItem;