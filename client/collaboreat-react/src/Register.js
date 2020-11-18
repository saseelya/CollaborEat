import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import AuthContext from './components/AuthContext';
import Errors from './components/Errors';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [errors, setErrors] = useState([]);
    const auth = useContext(AuthContext);
    const history = useHistory();
    const userId = 0;
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('http://localhost:8080/user/create_account_user', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId,
                firstName,
                lastName,
                email,
                password
            })
        });

        if (response.status === 201) {
            const responseAuth = await fetch('http://localhost:8080/user/authenticate', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
            });
            
            if (responseAuth.status === 200) {
                const { jwt_token } = await responseAuth.json();
    
                auth.login(jwt_token);
    
                history.goBack();
            }
        } else if (response.status === 400) {
            setErrors(['Account creation failed.']);
        } else {
            setErrors(['Unknown error.']);
        }
    };

    return (
            <div>
                <Errors errors={errors} />
                <form className="" onSubmit={handleSubmit}>
                <center>
                    <h2>Join and CollaborEat!</h2>
                    <hr></hr>
                    <label>First Name:</label>
                    <div className="col-md-4">
                        <input type="text" placeholder="First Name" onChange={(event) => setFirstName(event.target.value)} />
                    </div>
                    <label>Last Name:</label>
                    <div className="col-md-4">
                        <input type="text" placeholder="Last Name" onChange={(event) => setLastName(event.target.value)} />
                    </div>
                    <label>Email:</label>
                    <div className="col-md-4">
                        <input type="text" placeholder="example@email.com" onChange={(event) => setEmail(event.target.value)} />
                    </div>
                    <label>Password:</label>
                    <div className="col-md-4">
                        <input type="password" placeholder="password" onChange={(event) => setPassword(event.target.value)} />
                    </div>
                    <hr></hr>
                    <button type="submit" className="btn btn-primary">Login</button>
                    &nbsp;
                    <Link to="/"><button className="btn btn-danger">Cancel</button></Link>
                    </center>
                </form>
            </div>
    )
}