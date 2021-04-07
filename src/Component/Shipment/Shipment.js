import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { Link, useParams } from 'react-router-dom';

const Shipment = () => {
    document.title = "Shipment Page";
  const { register, handleSubmit, watch, errors } = useForm();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [checkProduct, setCheckProduct] = useState([]);
    const {pdId} = useParams();
    console.log(pdId)
    useEffect(() => {
        fetch('https://furniture-shop-839.herokuapp.com/products')
        .then(res => res.json())
        .then(data => setCheckProduct(data))
    },[]);

    const selectProduct = checkProduct.find(product => product._id === pdId);
  const onSubmit = data => {
    const orderDetails = {...loggedInUser,products:selectProduct, shipment:data, orderTime: new Date()};
    console.log(orderDetails)

    fetch('https://furniture-shop-839.herokuapp.com/addOrder/',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(orderDetails)
    })
    .then(res => res.json())
    .then(data => {
      if(data){
        alert('Your Order Successfully Done');
      }
    })

    };

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <div className="container">
      <h2 className ="text-center">Please, Provide your Details Information</h2>
        <div className="row mt-5">
            <div className="col-md-5 m-auto">
                <form onSubmit={handleSubmit(onSubmit)} style={{ border:'2px solid lightgray',borderRadius:'15px', padding:'25px' }}>
        
                    <input className="form-control" defaultValue={loggedInUser.name} {...register("name")} />
                    <br></br>
                    <input className="form-control" defaultValue={loggedInUser.email} {...register("email")} />
                    <br></br>
                    <input className="form-control" placeholder="Your Address" {...register("address", { required: true })} />
                    <br></br>
                    <input className="form-control" placeholder="Your Phone Number" {...register("phone", { required: true })} />
                    <br></br>
                    <input className="form-control" style={{ backgroundColor:'tomato',border:'0',color:'white' }} type="submit" value="Order Placed" />
                </form>
            </div>
        </div>
    </div>
    
  );
};

export default Shipment;