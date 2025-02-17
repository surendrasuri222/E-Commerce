
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Products = () => {
    const [products, setProducts] = useState([]);

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/products", {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `jwt ${localStorage.getItem('token')}`
                    }
                });
                setProducts(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    // Function to handle sorting

    useEffect(() => {
        if (!token) {
            navigate("/");
        }
    })

    return (
        <div className='product-comp'>
            <div>
                <Link to='/newproduct'><button>+ Add Product</button></Link>
            </div>
            <h1>All Products</h1>
            {
                products.map((prod, i) => (
                    <div>
                        <img src={prod.image} alt='Hello' />

                    </div>
                ))
            }
        </div>
    )
}

export default Products;


