import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import AuthContext from './components/AuthContext';

import User from './User';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const history = useHistory();
    const auth = useContext(AuthContext);
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('http://localhost:8080/user/authenticate', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        if (response.status === 200) {
            const { jwt_token } = await response.json();

            auth.login(jwt_token);

            history.push('/');
        } else if (response.status === 403) {
            console.log('Login failed.');
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
                    <label>Email:</label>
                    <input type="text" onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" onChange={(event) => setPassword(event.target.value)} />
                </div>
                <button type="submit">Login</button>
                <Link to='/register'>Register an account</Link>
            </form>
        </div>
    )
}