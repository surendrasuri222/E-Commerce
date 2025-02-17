
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";



const Products = () => {
    const [products, setProducts] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc'); // State for sorting order

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
                console.log(response.data)
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    // Function to handle sorting
    const handleSort = () => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);
        const sortedProducts = [...products].sort((a, b) => {
            if (newSortOrder === 'asc') {
                return a.productname.localeCompare(b.productname);
            } else {
                return b.productname.localeCompare(a.productname);
            }
        });
        setProducts(sortedProducts);
    };
    useEffect(() => {
        if (!token) {
            navigate("/");
        }
    })

    const handleAddingWishlist = async (pid, pname) => {
        const token = localStorage.getItem('token');
        try {
            const userId = jwtDecode(token)._id;
            await axios.post(`http://localhost:4000/api/products/wishlist/add/${userId}`, { productId: pid });
            alert(`Product "${pname}" added to wishlist successfully`);
        } catch (error) {
            const errorMessage = error.response?.data?.error;
            if (errorMessage === 'Product already in wishlist') {
                alert(`"${pname}" product is already in your wishlist.`);
            } else {
                console.error('Error:', error);
                alert('Failed to add product');
            }

        }
    };
    const handleremoveWishlist = async (pid, pname) => {
        const token = localStorage.getItem('token');

        try {
            const userId = jwtDecode(token)._id;
            await axios.post(`http://localhost:4000/api/products/wishlist/remove/${userId}`, { productId: pid });
            alert(`Product "${pname}" removed from wishlist successfully`);
        } catch (error) {
            const errorMessage = error.response?.data?.error;
            if (errorMessage) {
                alert(error.response.data.error);
            } else {
                alert('Failed to remove');
            }
        }
    };

    return (
        <div className='product-comp'>
            <div>
                <Link to='/newproduct'><button>+ Add Product</button></Link>
            </div>
            <h1>All Products</h1>
            <table>
                <thead>
                    <tr>
                        {/* <th>ID</th> */}
                        <th >Product Name
                            <i className={`fa-solid fa-sort-${sortOrder}`} onClick={handleSort}></i>
                        </th>
                        <th>Product Image</th>
                        <th>Product Cost</th>
                        <th>Product Description</th>
                        <th>Wishlist</th>


                    </tr>
                </thead>
                <tbody>
                    {products && products.length !== undefined ? (
                        products.map((product, i) => (
                            <tr key={i} className='p-2'>
                                <td>{product.productname}</td>
                                <td><img src={product.image} alt="img" className="img-thumbnail" style={{ height: "100px", width: '90px' }} /></td>
                                {/* <td><img src="http://localhost:4000/images/product_1710761110975.png" alt="img" className="img-thumbnail" /></td> */}

                                <td>${product.cost}</td>
                                <td>{product.description}</td>
                                <td id='wishlistrow'><button id="wishlistbutton" onClick={() => { handleAddingWishlist(product._id, product.productname) }}><i className="fa-solid fa-heart"></i></button></td>
                                <td id='wishlistrow'><button id="wishlistbutton" onClick={() => { handleremoveWishlist(product._id, product.productname) }}><i className="fa-regular fa-heart"></i></button></td>

                            </tr>
                        ))
                    ) : (
                        navigate('/')
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Products;


