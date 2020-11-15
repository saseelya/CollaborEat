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

    // const auth = useContext(AuthContext);
    const history = useHistory();
    const { id } = useParams();

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
        setUserId(user.userId);
        setEmail(user.email);
        setPassword(user.password);
        setFirstName(user.firstName);
        setLastName(user.lastName);
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
    };       

    return (
        <div>
            <h2>Close Account</h2>
            <form onSubmit={handleSubmit}>
                <input type="hidden" value={user.userId}/>
                <div className="form-group">
                    <label>First Name:</label>
                    <input type="text" value={user.firstName} />
                </div>
                <div className="form-group">
                    <label>Last Name:</label>
                    <input type="text" value={user.lastName} />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="text" value={user.email} />
                </div>
                <button href="/" type="submit" className="btn btn-danger">Close Account</button>
                <Link to={"/user/" + user.userId}>Cancel</Link>
            </form>
        </div>
    )
}