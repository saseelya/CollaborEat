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
            <center>
            <h2>Close Account</h2>
            <hr></hr>
            <form onSubmit={handleSubmit}>
            <label>First Name:</label>
                <div className="col-md-4">
                    <input type="text" value={firstName} readOnly />
                </div>
                <label>Last Name:</label>
                <div className="col-md-4">
                    <input type="text" value={lastName} readOnly />
                </div>
                <label>Email:</label>
                <div className="col-md-4">
                    <input type="text" value={email} readOnly />
                </div>
                <hr></hr>
                <button type="submit" className="btn btn-danger">Close Account</button>
                &nbsp;
                <Link to={"/user/" + userId}><button className="btn btn-danger mr-4">Cancel</button></Link>
            </form>
            </center>
        </div>
    )
}