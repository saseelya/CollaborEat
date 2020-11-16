import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import jwt_decode from "jwt-decode";

import HealthInfo from './HealthInfo';
import Feedback from './FeedBack';
import User from './User';
import MealType from './components/RecipeMealType';
import Recipe from './Recipe';
import ViewRecipe from './components/ViewRecipe';
import AddRecipe from './components/AddRecipe';
import AuthContext from './components/AuthContext';
import Login from './Login';
import Register from './Register';
import NavBar from './components/NavBar';
import EditUser from './EditUser';
import MainLayout from './mainLayout';
import DeleteUser from './DeleteUser';
import EditRecipe from './components/EditRecipe';
import DeleteRecipe from './components/DeleteRecipe';


function NotFound() {
  return <h1>Not Found</h1>;
}

// function AddRecipe() {
//   return <h1>Add Recipe</h1>;
// }

// function EditRecipe() {
//   return <h1>Edit Recipe</h1>;
// }


export default function App() {
  const [appUser, setAppUser] = useState(null);

  const login = (token) => {
    const { userId, firstName, authorities } = jwt_decode(token);

    const roles = authorities.split(',');
  
    const appUser = {
      userId: parseInt(userId, 10),
      firstName,
      roles,
      token,
      hasRole(role) {
        return this.roles.includes(role);
      }
    };
  
    console.log(appUser);

    setAppUser(appUser);

    return appUser;
  };

  const logout = () => {
    setAppUser(null);
  };

  const auth = {
    appUser,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={auth}>
        <Router>
        <div>
            <NavBar />
            <Switch>
            <Route exact path="/user/edit/:id">
              {appUser ? (
                <EditUser />) : (
                <Redirect to="/login" />
                )
              }
            </Route>
            <Route exact path="/user/delete/:id">
            {appUser ? (
                <DeleteUser />) : (
                <Redirect to="/login" />
                )
              }
            </Route>
            <Route path="/user/:id">
                <User />
            </Route>
            <Route exact path="/recipe/add">
            {appUser ? (
                <AddRecipe />) : (
                <Redirect to="/login" />
                )
              }
            </Route>
            <Route exact path="/recipe/edit/:id">
            {appUser ? (
                <EditRecipe />) : (
                <Redirect to="/login" />
                )
              }
            </Route>
            <Route exact path="/recipe/delete/:id">
            {appUser ? (
                <DeleteRecipe />) : (
                <Redirect to="/login" />
                )
              }
            </Route>
            <Route path="/healthInfo">
                <HealthInfo />
            </Route>
            <Route path="/feedback">
                <Feedback />
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
                <MainLayout />
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