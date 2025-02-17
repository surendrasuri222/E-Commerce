
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [productDetails, setProductDetails] = useState({});
    const token = localStorage.getItem('token');
    const userId = token ? jwtDecode(token)._id : null;
    const Navigate = useNavigate();

    useEffect(() => {
        const fetchWishlistItems = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/products/wishlist/${userId}`);
                console.log(response.data.wishlistItems)
                setWishlistItems(response.data.wishlistItems);
            } catch (error) {
                console.error('Error fetching wishlist items:', error);
            }
        };

        if (userId) {
            fetchWishlistItems();
        }
    }, [userId]);
    useEffect(() => {
        if (!token) {
            Navigate("/")
        }
    })

    useEffect(() => {
        const fetchProductDetails = async (productId) => {
            try {
                const response = await axios.get(`http://localhost:4000/api/products/${productId}`);
                setProductDetails(prevDetails => ({
                    ...prevDetails,
                    [productId]: response.data // Set product details in an object with productId as key
                }));
            } catch (error) {
                console.error(`Error fetching product details for productId`, error);
            }
        };

        wishlistItems.forEach(wishlistItem => {
            wishlistItem.products.forEach(productId => {
                if (!productDetails[productId]) {
                    fetchProductDetails(productId);
                }
            });
        });
    }, [wishlistItems, productDetails]);

    const handleremoveWishlist = async (pid) => {
        const token = localStorage.getItem('token');
        const userId = jwtDecode(token)._id;

        await axios.post(`http://localhost:4000/api/products/wishlist/remove/${userId}`, { productId: pid });
        setWishlistItems(prevItems => prevItems.map(item => ({
            ...item,
            products: item.products.filter(productId => productId !== pid)
        })));
    }
    return (
        <div className='container '>
            <div className='row'>
                <div className='col-6'>
                    <div className='wishlist-div'>
                        <h2 className='w-products'>Favorite Products</h2>
                        <ul>
                            {wishlistItems.map(wishlistItem => (
                                <li key={wishlistItem._id}>
                                    {wishlistItem.products.map(productId => (
                                        <div key={productId}>
                                            {productDetails[productId] ? (
                                                <div>
                                                    <h3 className='w-pname'>{productDetails[productId].productname}</h3>
                                                    <p className='w-pdes'>{productDetails[productId].description}</p>
                                                    <p className='w-pcost'>Cost: ${productDetails[productId].cost}</p>
                                                    <button className='w-pbutton' onClick={() => { handleremoveWishlist(productId) }}>X</button>
                                                </div>
                                            ) : (
                                                <p>Loading product details...</p>
                                            )}
                                        </div>
                                    ))}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Wishlist;
