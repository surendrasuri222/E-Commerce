import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

const Mail = () => {
    const [mailData, setMailData] = useState({
        email: '',
        subject: '',
        offers: '',
        message: ''
    });
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    useEffect(() => {
        if (!token) {
            navigate('/')
        }
        if (token) {
            const isAdmin = jwtDecode(token).role;
            if (isAdmin === "Registered") {
                navigate('/dashboard')
            }
        }

    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:4000/api/sendmail', {
                method: 'post',
                headers: {
                    "content-type": 'application/json'
                },
                body: JSON.stringify(mailData)
            });

            const dataResponse = await response.json();
            console.log("dataResponse", dataResponse);
            setMailData({
                email: '',
                subject: '',
                offers: '',
                message: ''
            });
            alert('Email sent successfully!');

        } catch (error) {
            console.error('Error sending email:', error);
            alert('Failed to send email. Please try again later.');
        }
    };



    const handleChange = (e) => {
        setMailData((prevForm) => ({
            ...prevForm,
            [e.target.name]: e.target.value
        }));
    };



    return (
        <div className='border border dark rounded container-fluid w-50 shadow-lg p-3 mb-5 bg-white rounded'>
            <h3 className="text-center mb-4">Send Mail To user</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email" className="col-form-label">Email:</label>
                    <input type="email" className="form-control" value={mailData.email} id="email" onChange={handleChange} name="email" />
                </div>
                <div className="form-group">
                    <label htmlFor="subject" className="col-form-label">Subject:</label>
                    <input type="text" className="form-control" value={mailData.subject} id="subject" onChange={handleChange} name="subject" />
                </div>
                <div className="form-group">
                    <label htmlFor="offers" className="col-form-label">Offers Available:</label>
                    <select className="form-control" value={mailData.offers} id="offers" onChange={handleChange} name="offers">
                        <option value="Upto 50% off on Electronics">Upto 50% off on Electronics</option>
                        <option value="Buy 2 Get 3">Buy 2 Get 3</option>
                        <option value="10% Instant Discount* on Credit Card EMI Txns">10% Instant Discount* on Credit Card EMI Txns  </option>
                        <option value="Flat 2,000rs Instant Discount on SBI Credit Card ">Flat 2,000rs Instant Discount on SBI Credit Card </option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="message" className="col-form-label">Message:</label>
                    <input type="text" className="form-control" value={mailData.message} id="message" onChange={handleChange} name="message" />
                </div>

                <div className="text-center d-flex flex-row-reverse">
                    <button type="submit" className="button">Send Mail</button>
                    <NavLink to='/dashboard'><button type="button" className="button me-2" data-dismiss="modal">Cancel</button></NavLink>
                </div>
            </form>
        </div>
    );
}

export default Mail;
