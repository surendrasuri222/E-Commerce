
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useParams, useNavigate, NavLink } from "react-router-dom";
import axios from 'axios';

const MyProfileEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        age: '',
        gender: '',
        profession: '',
        country: '',
        state: '',
        city: '',
    });
    const baseUrl = 'http://localhost:4000/api/userprofile/editdata';


    // getting the user details from Back_End
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    const response = await axios.get(`${baseUrl}/${id}`);
                    setUserData(response.data);
                }
            } catch (error) {
                console.error('Error While fetching user data :', error.message);
            }
        };
        fetchData()
    }, [])


    const handleChange = (e) => {
        setUserData((prevForm) => ({
            ...prevForm,
            [e.target.name]: e.target.value
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        await axios.put(`${baseUrl}/${id}`, userData);
        toast.success("Details Updated succesfully")
        navigate('/userprofile');
    };

    return (
        <div className='border border dark rounded container-fluid w-50 shadow-lg p-3 mb-5 bg-white rounded'>
            <h3 className="text-center mb-4">Edit Profile</h3>
            <form>
                <div className="form-group">
                    <label htmlFor="name" className="col-form-label">Full Name:</label>
                    <input type="text" className="form-control" value={userData.name} id="name" onChange={handleChange} name="name" />
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="col-form-label">Email:</label>
                    <input type="email" className="form-control" value={userData.email} id="email" onChange={handleChange} name="email" disabled />
                </div>
                <div className="form-group">
                    <label htmlFor="age" className="col-form-label">Age:</label>
                    <input type="number" className="form-control" value={userData.age} id="age" onChange={handleChange} name="age" />
                </div>
                <div className="form-group">
                    <label htmlFor="gender" className="col-form-label">Gender:</label>
                    <select className="form-control" value={userData.gender} id="gender" onChange={handleChange} name="gender">
                        <option>Select</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Others</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="profession" className="col-form-label">Profession:</label>
                    <input type="text" className="form-control" value={userData.profession} id="profession" onChange={handleChange} name="profession" />
                </div>
                <div className="form-group">
                    <label htmlFor="country" className="col-form-label">Country:</label>
                    <input type="text" className="form-control" value={userData.country} id="country" onChange={handleChange} name="country" />
                </div>
                <div className="form-group">
                    <label htmlFor="state" className="col-form-label">State:</label>
                    <input type="text" className="form-control" value={userData.state} id="state" onChange={handleChange} name="state" />
                </div>
                <div className="form-group">
                    <label htmlFor="city" className="col-form-label">City:</label>
                    <input type="text" className="form-control" value={userData.city} id="city" onChange={handleChange} name="city" />
                </div>

                <div className="text-center d-flex flex-row-reverse">
                    <button type="submit" onClick={handleUpdate} className="button">Update</button>
                    <NavLink to='/userprofile'><button type="button" className="button me-2" data-dismiss="modal">Cancel</button></NavLink>

                </div>
            </form>
        </div>
    );
}

export default MyProfileEdit;
