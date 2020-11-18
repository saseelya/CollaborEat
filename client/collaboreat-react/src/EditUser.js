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
                setUserId(data.userId);
                setEmail(data.email);
                setPassword(data.password);
                setFirstName(data.firstName);
                setLastName(data.lastName);
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
                // history.push(`/user/${userId}`)
            const responseAuth = await fetch('http://localhost:8080/user/refresh_token', {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + auth.appUser.token
            }
            })

            if (responseAuth.status === 200) {
                const { jwt_token } = await responseAuth.json();
    
                auth.login(jwt_token);
                history.push(`/user/${userId}`)
                
            } else {
                throw "Automatic token refresh failed.";
            }
         
        } else if (response.status === 400) {
            setErrors(['Account Update failed.']);
        } else {
            setErrors(['Unknown error.']);
        }
    };

    return (
        <div>
            <center>
            <h2>Update Your Information</h2>
            <hr></hr>
            <Errors errors={errors} />
            <form onSubmit={handleSubmit}>
            <label>First Name:</label>

                <div className="col-md-4">
                    <input type="text" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
                </div>
                <label>Last Name:</label>
                <div className="col-md-4">
                    <input type="text" value={lastName} onChange={(event) => setLastName(event.target.value)} />
                </div>
                <label>Email:</label>
                <div className="col-md-4">
                    <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>
                <input type="hidden" value={password} onChange={(event) => setPassword(event.target.value)} />
                <hr></hr>
                <div className="">
                    <button type="submit" className="btn btn-primary mr-sm-4">Update</button>
                    &nbsp;
                    <Link to={"/user/" + userId}><button className="btn btn-danger">Cancel</button></Link>
                </div>
            </form>
            </center>
        </div>
    )
}