import axios from 'axios';

const baseUrl = 'http://localhost:4000/api/products/newproduct';


const addProduct = async (product) => {

    try {
        const response = await axios.post(baseUrl, product, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: `jwt ${localStorage.getItem('token')}`
            }
        });
        if (response.status === 201) {
            console.log("From Response" + response.data);
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error adding product:', error);
        return false;
    }
};

export default addProduct;
