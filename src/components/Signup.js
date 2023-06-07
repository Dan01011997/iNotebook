import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [cred, setCred] = useState({ name: "", email: "", password: "",cpassword:"" })
    let history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
      const {name,email,password}=cred
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
           
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept':'application/json'
            },
            body: JSON.stringify({name,email,password })
        })

        const json = await response.json();
        console.log(json);
        if(json.success){
        
            localStorage.setItem('token', json.authtoken)
            history("/")
            props.showAlert("Account created successfully","success")
        }
            else{
            props.showAlert("Invalid Creds","danger")
         //save the auth token and redirect
            }
        
     
    }
    const onchange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value })
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" name="name" className="form-control" id="name" onChange={onchange} value={cred.name} />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={cred.email} onChange={onchange} />
                <div id="emailHelp"  className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" name="password" className="form-control" id="exampleInputPassword1" minLength={5} onChange={onchange} value={cred.password} />
            </div>
            <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                <input type="password" name="cpassword" className="form-control" id="cpassword" onChange={onchange} minLength={5} value={cred.cpassword} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default Signup