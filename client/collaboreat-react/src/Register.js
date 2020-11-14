import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import AuthContext from './components/AuthContext';

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
    
                history.push('/')
            } else if (responseAuth.status === 403) {
                console.log('Login failed.');
            } else {
                console.log('Unknown error.');
            }
        } else if (response.status === 400) {
            console.log('Account creation failed.');
        } else {
            console.log('Unknown error.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {/* <Errors errors={errors} /> */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input type="text" onChange={(event) => setFirstName(event.target.value)} />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" onChange={(event) => setLastName(event.target.value)} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="text" onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" onChange={(event) => setPassword(event.target.value)} />
                </div>
                <button type="submit">Login</button>
                <Link to="/">Cancel</Link>
            </form>
        </div>
    )
}