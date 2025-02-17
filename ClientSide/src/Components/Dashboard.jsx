
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getrecentProducts from "../Apiservices/sortproduct";

function Dashboard() {
    const [products, setProducts] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getrecentProducts();
                setProducts(response);
            } catch (error) {
                console.error("Error fetching Products:", error.message);
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

    if (!token) {
        navigate("/");
    }

    return (
        <div>
            <h1>Latest Products</h1>
            <table>
                <thead>
                    <tr>
                        <th>Product Name
                            <i className={`fa-solid fa-sort-${sortOrder}`} onClick={handleSort}></i>
                        </th>
                        <th>Product Cost</th>
                        <th>Product Description</th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.length !== undefined ? (
                        products.map((product, i) => (
                            <tr key={i} className='p-2'>
                                <td>{product.productname}</td>
                                <td>${product.cost}</td>
                                <td>{product.description}</td>
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

export default Dashboard;


