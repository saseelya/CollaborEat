import { useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from './AuthContext';

export default function NavBar() {
  const auth = useContext(AuthContext);

  return (
    <nav>
    <ul>
        <li>
        <Link to="/">Home</Link>
        </li>
        <li>
        <Link to="/about">About</Link>
        </li>
        <li>
        <Link to="/healthInfo">Health Info</Link>
        </li>
        <li>
        <Link to="/feedback">Feedback</Link>
        </li>
        <li>
        <Link to="/mealType">Meal Type</Link>
        </li>
        <li>
        <Link to="/recipe">Recipe</Link>
        </li>
        {!auth.user && (
    <>
        <li>
        <Link to="/login">Login</Link>
        </li>
        <li>
        <Link to="/register">Register</Link>
        </li>
    </>
        )}
    </ul>
    {auth.user && (
        <div>
            <p>Hello {auth.user.firstName}!</p>
            <a href={"/user/" + auth.user.userId}>Account Summary</a>
            <button onClick={() => auth.logout()}>Logout</button>
        </div>
        )}
    </nav>
  );
}