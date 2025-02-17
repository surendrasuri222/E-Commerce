import React, { useState } from 'react'
import { toast } from 'react-toastify';
import addProduct from '../Apiservices/newproduct';
import { NavLink, useNavigate } from 'react-router-dom';
import upload_area from '../assets/upload_area.svg'

function Newproduct() {
    const [product, setProduct] = useState({
        productname: '',
        description: '',
        cost: 0,
        image: ''
    });
    const [image, setImage] = useState(false)
    const navigate = useNavigate()
    const token = localStorage.getItem("token")

    function handleChange(e) {
        console.log(e.target.name);
        console.log(e.target.value);
        let newProduct = { ...product };
        newProduct[e.target.name] = e.target.value;
        setProduct(newProduct);

    }
    async function handleSubmit(e) {
        e.preventDefault();

        let responsedata;
        let productDetails = product

        let formData = new FormData();
        formData.append('product', image);

        await fetch('http://localhost:4000/upload', {
            method: 'post',
            headers: {
                Accept: 'application/json',
            },
            body: formData
        }).then((res) => {
            return res.json()
        }).then((data) => {
            responsedata = data
            // console.log(responsedata)
        })
        if (responsedata.success) {
            productDetails.image = responsedata.image_url;
            console.log(productDetails);
        }
        const response = await addProduct(productDetails)
        console.log("Succesfully added", response);
        setProduct({
            productname: "",
            description: "",
            cost: ""
        })
        navigate("/products")
        toast.success("Product added succesfully")
    }
    if (!token) {
        navigate("/")
    }
    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    }
    return (
        <div>
            <div className="m-auto w-50 p-5 add-product">
                <h1>Add Product Component</h1>
                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label className='form-label' htmlFor='file-input'>
                            <img src={image ? URL.createObjectURL(image) : upload_area} className='add-image' alt='imageuploader' />
                        </label>
                        <input onChange={imageHandler} type='file' name='image' value={product.image} id='file-input' hidden />

                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="productname">Product Name</label>
                        <input className="form-control" onChange={handleChange} value={product.productname} id="productname" name="productname" type="text" required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="cost">Product Cost</label>
                        <input className="form-control" onChange={handleChange} value={product.cost} id="cost" name="cost" type="number" required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="description">Description</label>
                        <textarea className="form-control" id="description" name="description" rows={10} cols={20} value={product.description} onChange={handleChange} required ></textarea>
                    </div>

                    <div className="mb-3">
                        <button type="submit" className="button me-3">Submit</button>
                        <NavLink to='/products'><button>Cancel</button></NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Newproduct