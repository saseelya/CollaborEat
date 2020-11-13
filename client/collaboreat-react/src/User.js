import React, { useState, useEffect } from 'react';

export default function User() {
  const [Users, setUser] = useState([]);

  const getUsers = () => {
    fetch('http://localhost:8080/user')
      .then(response => response.json())
      .then(data => {
        setUser(data);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <h2>User</h2>

      <table className="table table-dark table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">User Id</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
            <th scope="col">Disabled</th>
          </tr>
        </thead>
        <tbody>
          {Users.map(user => (
            <tr key={user.userId}>
                <td>{user.userId}</td> 
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.disabled}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}