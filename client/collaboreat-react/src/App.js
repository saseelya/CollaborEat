import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import HealthInfo from './HealthInfo';
import Feedback from './FeedBack';
import User from './User';
import MealType from './MealType';
import Recipe from './Recipe';
import ViewRecipe from './components/ViewRecipe';

function About() {
  return <h1>About</h1>;
}

function Users() {
  return <h1>Users</h1>;
}

function NotFound() {
  return <h1>Not Found</h1>;
}

function AddRecipe() {
  return <h1>Add Recipe</h1>;
}

function EditRecipe() {
  return <h1>Edit Recipe</h1>;
}


function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/user">Users</Link>
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
            <li>
              <Link to="/recipe/1">View Recipe</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/user">
            <User />
          </Route>
          <Route path="/add">
            <AddRecipe />
          </Route>
          <Route path="/healthInfo">
            <HealthInfo />
          </Route>
          <Route path="/feedback">
            <Feedback />
          </Route>
          <Route path="/mealType">
            <MealType />
          </Route>
          <Route path="/recipe/1">
            <ViewRecipe displayText="View Recipe" />
          </Route>
          <Route exact path="/recipe">
            <Recipe />
          </Route>
          <Route exact path="/">
            <h1>Home Page</h1>
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default App;