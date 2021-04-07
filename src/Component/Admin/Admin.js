import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaPlus,FaEdit,FaMagnet } from 'react-icons/fa';

const Admin = () => {
    document.title = "Add Product";
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [imageUrl, setImageUrl] = useState(null);

    const onSubmit = data => {
        const eventData ={
            title: data.title,
            price:data.price,
            image_url: imageUrl
        }

        const url = `https://furniture-shop-839.herokuapp.com/addProducts`;
        fetch(url,{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify(eventData)
        })
        .then(res => {
            alert('Your product added successfully');
        });
    }

    const handleAddProduct = (event)=>{
        console.log(event.target.files[0])
        const imageData = new FormData();
        imageData.set('key', 'cb0aabf5a2bd15ad9c2afc66db955837');
        imageData.append('image', event.target.files[0])

        axios.post('https://api.imgbb.com/1/upload', imageData)
          .then(function (response) {
            console.log(response.data.data.display_url);
            setImageUrl(response.data.data.display_url);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

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
                <div className="col-lg-4 mt-5 ml-5">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input class="form-control" placeholder="Product Title" {...register("title")} />
                    <br></br>
                    <br></br>
                    <input class="form-control"  placeholder="Product Price" {...register("price")} />
                    <br></br>
                    <br></br>
                    <input  type="file" onChange = {handleAddProduct} />
                    <br></br>
                    <br></br>
                    {errors.exampleRequired && <span>This field is required</span>}
                    
                    <input type="submit" value="Add Product" style={{ backgroundColor:'#0069D9',border:'0',color:'white',padding:'10px 20px 10px 20px',borderRadius:'10px' }} />
                </form>
                </div>
            </div>
        </div>
    );
};

export default Admin;