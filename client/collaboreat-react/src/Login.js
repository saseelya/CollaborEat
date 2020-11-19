import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import AuthContext from './components/AuthContext';
import Errors from './components/Errors';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const history = useHistory();
    const auth = useContext(AuthContext);
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch(`${process.env.REACT_APP_API_URL}/user/authenticate`, {
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
            setErrors(['Login failed.']);
        } else {
            setErrors(['Unknown error.']);
        }
    };

    return (
        <center>
            <h2>Login</h2>
            <hr></hr>
                <Errors errors={errors} />
                <form onSubmit={handleSubmit}>
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
                    <div>
                        <Link to='/register'>Not a User? Sign up Today!</Link>
                    </div>
                </form>
        </center>
    )
}