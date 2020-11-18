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
        <nav className="navbar sticky-top navbar-light" style={{ backgroundColor: '#e3f2fd' }}>
         <Link to="/"><img className="d-block w-100" src="collaborEatLogoSmall.png?text=Second slide&bg=282c34" alt="Second slide" /></Link>
         <button className="btn btn-success"><Link to="/recipe" className="text-dark">View All Recipes</Link></button>
          <form className="form-inline" onSubmit={handleSubmit}>
          <input className="form-control mr-sm-2 navBarSearchForm" type="search" placeholder="Search By Food Item" aria-label="Search" value={foodItem} onChange={(event) => setFoodItem(event.target.value)} />

          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>

        <button className="text-dark btn btn-primary"><Link to="/recipe/add" className="text-light">Click here to add a recipe!</Link></button>

        {!auth.appUser && (
    <>
        <button className="btn btn-warning my-2 my-lg-0"><Link to="/login">Sign In</Link></button>
        <button className="btn btn-warning my-2 my-lg-0"><Link to="/register">Sign Up</Link></button>
    </>
        )}
        {auth.appUser && (
        <div className="mr-sm-2">
            Welcome Back, {auth.appUser.firstName}!&nbsp;
            <Link to={"/user/" + auth.appUser.userId} className="mr-sm-5">Account Summary&nbsp;</Link>
            <button onClick={() => auth.logout()} className="btn btn-warning">Logout</button>
        </div>
        )}
    </nav>
  );
}