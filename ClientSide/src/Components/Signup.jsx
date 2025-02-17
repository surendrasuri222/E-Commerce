
import { NavLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { toast } from 'react-toastify'


function Signup() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmpassword: ""
    })

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }
    console.log("data", data)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (data.password !== data.confirmpassword) {
            toast.error("Password and confirm password must be same !")
            return
        }
        if (!data.name) {
            toast.error("Please provide UserName !")
            return
        }
        if (!data.email) {
            toast.error("Please provide Email !")
            return
        }
        if (!data.password) {
            toast.error("Please provide Password !")
            return
        }

        setLoading(true)
        const response = await fetch("http://localhost:4000/api/signup", {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const dataResponse = await response.json()
        setLoading(false)
        console.log("dataResponse", dataResponse)

        if (dataResponse.error) {
            toast.error(dataResponse.message)
        }

        if (dataResponse.success) {
            toast.success(dataResponse.message)
            setData({
                name: "",
                email: "",
                password: "",
                confirmPassword: ""
            })
            navigate('/')
        }

    }

    return (
        <div className="h-screen-center">
            <div className="card-form">
                <div className='card-header'>
                    <p className="name">Signup</p>
                </div>
                <form className='form' onSubmit={handleSubmit}>
                    <div className='form-element'>
                        <label htmlFor="name">Full Name :</label>
                        <div className="input-container">
                            <input type='text' placeholder="Enter your Full Name" value={data.name} name="name" id="name" disabled={loading} onChange={handleOnChange} />
                        </div>
                    </div>
                    <div className='form-element'>
                        <label htmlFor="email">Email :</label>
                        <div className="input-container">
                            <input type='email' placeholder="Enter your Email" value={data.email} name="email" id="email" disabled={loading} onChange={handleOnChange} />
                        </div>
                    </div>
                    <div className='form-element'>
                        <label htmlFor="password">Password :</label>
                        <div className="input-container">
                            <input
                                type='password'
                                id="password"
                                name="password"
                                value={data.password}
                                disabled={loading}
                                onChange={handleOnChange}
                                placeholder="Enter your password"
                            />
                        </div>
                    </div>
                    <div className='form-element'>
                        <label htmlFor="confirmpassword">Confirm Password :</label>
                        <div className="input-container">
                            <input
                                type='password'
                                id="confirmpassword"
                                name="confirmpassword"
                                value={data.confirmpassword}
                                disabled={loading}
                                onChange={handleOnChange}
                                placeholder="Enter your Confirm Password"
                            />
                        </div>
                    </div>

                    <button className="btn-sign" >{loading ? "Loading..." : "Sign Up"}</button>
                    <p>Already have an account?<NavLink to="/" className="link"> Sign In</NavLink></p>

                </form>
            </div>
        </div>
    );
}

export default Signup;

