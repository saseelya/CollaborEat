import React, { useState } from 'react';
import {
  HashRouter as Router,
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
import HealthInfoByRecipe from './components/HealthInfoByRecipe';
import RecipeHealthInfo from './components/RecipeHealthInfo';
import RecipeCardsByFood from './components/RecipeCardsByFood';
import RecipeCardsByType from './components/RecipeCardsByType';


function NotFound() {
  return <h1>Not Found</h1>;
}

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
// this comment for change again
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
            <Route exact path="/user/:id">
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
            <Route exact path="/recipe/food/:food">
              <RecipeCardsByFood />
            </Route>
            <Route exact path="/recipe/mealType/all/:id">
              <RecipeCardsByType />
            </Route>
            <Route exact path="/recipe/:id">
                <ViewRecipe />
            </Route>
            <Route exact path="/recipe/healthInfo/:id">
                <RecipeHealthInfo />
            </Route>
            <Route exact path="/recipe">
                <Recipe />
            </Route>
            <Route exact path="/login">
                <Login />
            </Route>
            <Route exact path="/register">
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