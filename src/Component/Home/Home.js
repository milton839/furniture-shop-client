import React, {  useEffect, useState } from 'react';
import HomeItem from '../HomeItem/HomeItem';
import { Spinner } from 'react-bootstrap';
import ManageProduct from '../ManageProduct/ManageProduct';



const Home = () => {
    document.title = "Home Page";
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://furniture-shop-839.herokuapp.com/products',)
        .then(response => response.json())
        .then(data => setProducts(data))
    })

    
    return (
        <div className="container mt-5">
            <div className="row">
                {
                    products.length === 0 && <Spinner style={{ margin:'0 auto' }} animation="grow" variant="primary" />
                }
                {
                    products.map(item => <HomeItem item={item} key={item._id}></HomeItem>)
                }
            </div>
        </div>
    );
};

export default Home;