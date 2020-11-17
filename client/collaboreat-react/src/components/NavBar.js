import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import AuthContext from './AuthContext';
import RecipeCardsByFood from './RecipeCardsByFood';

export default function NavBar() {
  const [foodItem, setFoodItem] = useState('');

  const auth = useContext(AuthContext);
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    history.push(`/recipe/food/${foodItem}`);
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/">CollaborEat</Link>
        <form className="form-inline" onSubmit={handleSubmit}>
        <input className="form-control mr-sm-2" type="search" placeholder="Search By Food Item" aria-label="Search" value={foodItem} onChange={(event) => setFoodItem(event.target.value)} />
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
            <Link to={"/user/" + auth.appUser.userId}>Account Summary</Link>
            <button onClick={() => auth.logout()} className="btn btn-warning">Logout</button>
        </div>
        )}
    </nav>
  );
}

// onSubmit={history.push('/recipe/food')