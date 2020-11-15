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

    const auth = useContext(AuthContext);
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        const getUser = () => {
            fetch(`http://localhost:8080/user/${id}`)
            .then(response => response.json())
            .then(data => {
                setUser(data);
            })
            .then(
                setUserId(user.userId),
                setEmail(user.email),
                setPassword(user.password),
                setFirstName(user.firstName),
                setLastName(user.lastName),
            );
        };
        getUser();
    }, [id]);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setUserId(user.userId);
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
    
                // history.push(`/user/${userId}`)
            }
        } else if (response.status === 400) {
            setErrors(['Account Update failed.']);
        } else {
            setErrors(['Unknown error.']);
        }
    };

    return (
        <div>
            <h2>Update Your Information</h2>
            <Errors errors={errors} />
            <form onSubmit={handleSubmit}>
                <input type="hidden" value={userId}/>
                <div className="form-group">
                    <label>First Name:</label>
                    <input type="text" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
                </div>
                <div className="form-group">
                    <label>Last Name:</label>
                    <input type="text" value={lastName} onChange={(event) => setLastName(event.target.value)} />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>
                <input type="hidden" value={password} onChange={(event) => setPassword(event.target.value)} />
                <button type="submit" className="btn btn-primary">Update</button>
                <Link to={"/user/" + user.userId}>Cancel</Link>
            </form>
        </div>
    )
}