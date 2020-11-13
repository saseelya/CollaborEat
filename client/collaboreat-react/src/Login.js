import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

export default function Login({ auth }) {
    const [username, setUsername] = userState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = "notatoken";
        
        auth.login();
        history.pushState('/');
    };

    return (
        <div>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" onChange={(event) => setUsername(event.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" onChange={(event) => setPassword(event.target.value)} />
                </div>
                <a href='/' type="submit" class="button">Login</a>
                <a href='/register'>Register an account</a>
            </form>
        </div>
    )
}