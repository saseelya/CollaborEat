import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import HealthInfo from './HealthInfo';

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
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/healthInfo">Health Info</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/add">
            <AddRecipe />
          </Route>
          <Route path="/healthInfo">
            <HealthInfo />
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