import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import AuthContext from './components/AuthContext';
import Errors from './components/Errors';

export default function EditUser() {
    const [user, setUser] = useState('');
    const [userId, setUserId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [errors, setErrors] = useState([]);

    const {id} = useParams();
    const auth = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        const getUser = () => {
          fetch(`http://localhost:8080/user/${id}`)
            .then(response => response.json())
            .then(data => {
              setUser(data);
            });
        };
        getUser();
      }, [id]);
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch(`http://localhost:8080/user/edit/${userId}`, {
            method: 'PUT',
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
            }
        } else if (response.status === 400) {
            setErrors(['Account creation failed.']);
        } else {
            setErrors(['Unknown error.']);
        }
    };

    return (
        <div>
            <h2>Join and Collabor-EAT!</h2>
            <Errors errors={errors} />
            <form onSubmit={handleSubmit}>
                <input type="hidden" value={user.userId}/>
                <div className="form-group">
                    <label>First Name:</label>
                    <input type="text" value={user.firstName} onChange={(event) => setFirstName(event.target.value)} />
                </div>
                <div className="form-group">
                    <label>Last Name:</label>
                    <input type="text" value={user.lastName} onChange={(event) => setLastName(event.target.value)} />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="text" value={user.email} onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" value={user.password} onChange={(event) => setPassword(event.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                <Link to="/">Cancel</Link>
            </form>
        </div>
    )
}