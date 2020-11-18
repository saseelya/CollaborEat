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
        <nav className="navbar sticky-top navbar-light form-inline" style={{ backgroundColor: '#e3f2fd' }}>
         <Link to="/"><img className="d-block w-100 form-inline" src="collaborEatLogoSmall.png?text=Second slide&bg=282c34" alt="Second slide" /></Link>

         <div class="text-right form-inline">
          <form className="form-inline" onSubmit={handleSubmit}>
          <input className="form-control navBarSearchForm" type="search" placeholder="Search CollaborEat!" aria-label="Search" value={foodItem} onChange={(event) => setFoodItem(event.target.value)} />

          <button className="btn btn-success mr-sm-2" type="submit">
            <img className="d-block w-100" src="search.png?text=Second slide&bg=282c34" alt="Second slide" />
          </button>
          <Link to="/recipe/add" className="text-light text-left mr-sm-2"><button className="text-dark btn btn-primary">Click here to add a recipe!</button></Link>
        </form>

        {!auth.appUser && (
    <>
        <Link to="/login"><button className="btn btn-warning mr-sm-2">Sign In</button></Link>
        <Link to="/register"><button className="btn btn-warning">Sign Up</button></Link>
    </>
        )}
        {auth.appUser && (
        <div className="mr-sm-2">
            Welcome Back, {auth.appUser.firstName}!&nbsp;
            <Link to={"/user/" + auth.appUser.userId} className="mr-sm-5">Account Summary&nbsp;</Link>
            <button onClick={() => auth.logout()} className="btn btn-warning">Logout</button>
        </div>
        )}
        </div>
    </nav>
  );
}