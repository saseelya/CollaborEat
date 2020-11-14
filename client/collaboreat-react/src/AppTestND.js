import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import jwt_decode from "jwt-decode";

import HealthInfo from './HealthInfo';
import Feedback from './FeedBack';
import User from './User';
import MealType from './MealType';
import Recipe from './Recipe';
import ViewRecipe from './components/ViewRecipe';
import AuthContext from './components/AuthContext';
import Login from './Login';
import Register from './Register'

function About() {
  return <h1>About</h1>;
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


export default function AppTestND() {
  const [user, setUser] = useState(null);

  const login = (token) => {
    const { userId, firstName, authorities } = jwt_decode(token);

    const roles = authorities.split(',');
  
    const user = {
      userId: parseInt(userId, 10),
      firstName,
      roles,
      token,
      hasRole(role) {
        return this.roles.includes(role);
      }
    };
  
    console.log(user);

    setUser(user);

    return user;
  };

  const logout = () => {
    setUser(null);
  };

  const auth = {
    user,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={auth}>
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
            <Switch>
            <Route path="/about">
                <About />
            </Route>
            <Route path="/user/:id">
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
            <Route path="/recipe/:id">
                <ViewRecipe />
            </Route>
            <Route path="/recipe">
                <Recipe />
            </Route>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/register">
                <Register />
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
    </AuthContext.Provider>
  );
}