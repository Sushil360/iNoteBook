import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const SignUp = (props) => {

    const [credentials, setCredentials] = useState({name: "", email: "", password: "", confirmpassword: ""})
    let history = useHistory();

    const handleSignUp = async (e) => {
        e.preventDefault();
        const {name,email,password} = credentials;
        const response = await fetch("http://localhost:5000/api/authorization/createnewuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name,email,password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authorizationToken);
            history.push("/");
            props.showAlert("Account Created Successfully","success");

        }
        else {
            //alert("Invalid credentials");
            props.showAlert("Invalid credentials","danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <form onSubmit={handleSignUp}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="confirmpassword" name="confirmpassword" onChange={onChange} minLength={5} required/>
                </div>
                <button type="submit" className="btn btn-primary">SignUp</button>
            </form>
        </div>
    )
}

export default SignUp
