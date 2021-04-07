import React from 'react';
import { FaTrashAlt,FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const ManageProductDetails = (props) => {
    const {_id,title, price, image_url} = props.item;
    const handleDelete = (id)=>{
        fetch(`https://furniture-shop-839.herokuapp.com/deleteProduct/${id}`,{
            method:'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            alert('Product deleted successfully');
        })
    }
    return (
        <tr>
            <td>{title}</td>
            <td>{price}</td>
            <td><img style={{ height:'50px',width:'100px' }} src={image_url} alt=""/></td>
            <td className="d-flex justify-content-around">
                <div>
                    <FaEdit />
                </div>
                <div>
                    <button onClick={()=>handleDelete(_id)}><FaTrashAlt /></button>
                </div>
            </td>
        </tr>
    );
};

export default ManageProductDetails;