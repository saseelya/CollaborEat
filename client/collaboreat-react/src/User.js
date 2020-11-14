import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import UserRecipes from './components/UserRecipes';
import EditUser from './EditUser';

export default function User() {
  const [user, setUser] = useState('');
  const {id} = useParams();

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

  return (
    <>
      <h1>{user.firstName} {user.lastName}</h1>
      <div>
        <p>Email: {user.email}</p>
      </div>
      {/* <div>
        <UserRecipes userId={user.userId} />
      </div> */}
      <div>
        <button onClick={<EditUser userId={user.userId}/>}>Edit Info</button>  
      </div>
    </>
  );
}