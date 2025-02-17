import axios from 'axios';

const baseUrl = 'http://localhost:4000/api/products/sortproducts';

const getrecentProducts = async () => {
    try {
        const response = await axios.get(baseUrl, {
            headers: {
                "content-type": "application/json",
                authorization: `jwt ${localStorage.getItem('token')}`
            }
        });
        if (response.status === 200) {
            console.log("Products fetched successfully:", response.data);
            return response.data;
        } else {
            console.error("Unexpected status code:", response.status);
        }
    } catch (error) {
        console.error("Error fetching products:", error.message);
    }
};

export default getrecentProducts;
