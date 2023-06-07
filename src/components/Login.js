import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [cred, setCred] = useState({ email: "", password: "" })
    let history=useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email:cred.email, password:cred.password })
        })

        const json = await response.json();
        console.log(json);
        if(json.success){
            localStorage.setItem('token',json.authtoken)
            history("/")
            props.showAlert("Logged in successfully","success")
         } //save the auth token and redirect
            else{
                props.showAlert("Invalid creds","danger")
            }
        

    }
   
    const onchange = (e) => {
        setCred({...cred,[e.target.name]: e.target.value })}
        return (
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" onChange={onchange} name="email" value={cred.email} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="password">Password</label>
                    <input type="password" className="form-control" name="password" onChange={onchange} value={cred.password} id="exampleInputPassword1" />
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        )
    }

    export default Login