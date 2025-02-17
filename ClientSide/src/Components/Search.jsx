import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const URL = "http://localhost:4000/api/products/search?q=";

const Search = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate()
    const token = localStorage.getItem("token")

    const fetchData = async (apiURL) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(apiURL, {
                headers: {
                    "content-type": "application/json",
                    authorization: `jwt ${localStorage.getItem('token')}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setData(data);
        } catch (error) {
            setError(error.message || 'Something went wrong');
        }
        setLoading(false);
    };

    const handleSearch = () => {
        const correctURL = `${URL}${searchTerm}`;
        if (searchTerm.trim() !== "") {
            fetchData(correctURL);
        } else {
            setData([]);
        }
    };

    useEffect(() => {
        if (!token) {
            navigate("/")
        }
        handleSearch();
    }, [searchTerm]);

    return (
        <div>
            <div className="search-container">
                <input type="text" placeholder="Search Product" className="search-input" value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} />
                <button className="search-button" onClick={handleSearch}>
                    <i className="fa fa-search"></i>
                </button>
            </div>
            <div className='result-list'>
                {loading && <h3>Loading...</h3>}
                {error && <h3 style={{ color: "red" }}>{error}</h3>}
                {!loading && !error && (
                    <ul className="product-data">
                        {data.map((eachdata, index) => {
                            const { productname } = eachdata;
                            return (
                                <li key={index}>
                                    <div className="text">
                                        <p>Product Name: {productname}</p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Search;
