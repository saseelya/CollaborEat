import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import AuthContext from './components/AuthContext';
import Errors from './components/Errors';

export default function EditUser() {
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const auth = useContext(AuthContext);
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        const getUser = () => {
            fetch(`http://localhost:8080/user/${id}`)
            .then(response => response.json())
            .then(data => {
                setUser(data);
                setUserId(data.userId);
                setEmail(data.email);
                setPassword(data.password);
                setFirstName(data.firstName);
                setLastName(data.lastName);
            });
        };
        getUser();
    }, [id]);
    
    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`http://localhost:8080/user/delete/${user.userId}`, {
            method: 'DELETE',
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
        })
        .then(response => {
            if (response.status === 204) {
                auth.logout();
                history.push('/');
            }
        });
    };       

    return (
        <div>
            <h2>Close Account</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>First Name:</label>
                    <input type="text" value={firstName} readOnly />
                </div>
                <div className="form-group">
                    <label>Last Name:</label>
                    <input type="text" value={lastName} readOnly />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="text" value={email} readOnly />
                </div>
                <button type="submit" className="btn btn-danger">Close Account</button>
                <Link to={"/user/" + userId}>Cancel</Link>
            </form>
        </div>
    )
}