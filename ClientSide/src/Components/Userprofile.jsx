import React, { useEffect, useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'

function Userprofile() {
    const [data, setData] = useState({
        name: "",
        email: "",
        role: "",
        gender: "",
        age: 0
    })
    const navigate = useNavigate()
    const token = localStorage.getItem("token")

    const handleUserProfile = async () => {
        const response = await fetch('http://localhost:4000/api/userprofile', {
            method: "post",
            headers: {
                "content-type": "application/json",
                authorization: `jwt ${localStorage.getItem('token')}`
            }
        })

        const dataResponse = await response.json()
        setData(dataResponse.data)
    }

    useEffect(() => {
        if (token) {
            handleUserProfile()
        }
        else {
            navigate("/")
        }
    }, [])

    return (
        <div>
            <div className='username'>
                <h1>Hello {data?.name} !!</h1>
            </div>
            <div>
                <NavLink to={`/userprofile/editdata/${data._id}`}><button><i className="fa-solid fa-user-pen"></i>Edit Profile</button></NavLink>
            </div>
            <h3 className='head-one'>My Profile data</h3>
            <div className='user-details'>
                <p><strong>Name:</strong> {data?.name}</p>
                <p><strong>Email:</strong> {data?.email}</p>
                <p><strong>Role:</strong> {data?.role}</p>
                <p><strong>Gender:</strong> {data?.gender}</p>
                <p><strong>Age:</strong> {data?.age}</p>
                <p><strong>Profession:</strong> {data?.profession}</p>
                <p><strong>Country:</strong> {data?.country}</p>
                <p><strong>State:</strong> {data?.state}</p>
                <p><strong>City:</strong> {data?.city}</p>
            </div>
        </div>
    )
}

export default Userprofile



