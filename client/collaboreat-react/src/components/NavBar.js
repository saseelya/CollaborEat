import { useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from './AuthContext';

export default function NavBar() {
  const auth = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/">CollaborEat</Link>
        <Link to="/healthInfo">Health Info</Link>
        <Link to="/feedback">Feedback</Link>
        <Link to="/mealType">Meal Type</Link>
        <Link to="/recipe">Recipe</Link>
        {!auth.user && (
    <>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
    </>
        )}
        {auth.user && (
        <div>
            <p>Welcome Back {auth.user.firstName}!</p>
            <a href={"/user/" + auth.user.userId}>Account Summary</a>
            <button onClick={() => auth.logout()} className="btn btn-warning">Logout</button>
        </div>
        )}
    </nav>
  );
}