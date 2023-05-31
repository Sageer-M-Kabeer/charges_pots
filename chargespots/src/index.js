import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import SignupPage from './pages/SignupPage'
import Login from './pages/Login'
import Buy from './pages/Buy';
import Lease from './pages/Lease';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import Team from './pages/Team';
import {
  createBrowserRouter,
  RouterProvider,
 } from "react-router-dom";
import HomePage from './pages/HomePage';
import Mine from './pages/Mine';

 const router = createBrowserRouter([
 

  {
    path:"/",
    element:<HomePage/> , 
    },
  {
    path:"/buy",
    element:<Buy/>  ,
    },
  {
    path:"/lease",
    element:<Lease/>  ,
   },
   {
    path:"/team",
    element:<Team/>  ,
   },
   {
    path:"/mine",
    element:<Mine/>  ,
   },      
   {
    path: "signup",
    element: <SignupPage/>,
   },
 {
   path: "login",
   element:<Login/>,
   },
 {
   path: "forgot-password",
   element:<ForgotPasswordPage/>,
   },

 ]);
  
 ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
 );

// reportWebVitals();
