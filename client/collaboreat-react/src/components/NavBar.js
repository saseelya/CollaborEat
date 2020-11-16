import { useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from './AuthContext';

export default function NavBar() {
  const auth = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/">CollaborEat</Link>
        <form className="form-inline">
        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
        <Link to="/recipe">Recipe</Link>
        {!auth.appUser && (
    <>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
    </>
        )}
        {auth.appUser && (
        <div>
            <p>Welcome Back {auth.appUser.firstName}!</p>
            <a href={"/user/" + auth.appUser.userId}>Account Summary</a>
            <button onClick={() => auth.logout()} className="btn btn-warning">Logout</button>
        </div>
        )}
    </nav>
  );
}