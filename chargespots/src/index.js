import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import SignupPage from './pages/SignupPage'
import Login from './pages/Login'
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import {
  createBrowserRouter,
  RouterProvider,
 } from "react-router-dom";
import HomePage from './pages/HomePage';

 const router = createBrowserRouter([
 
  {
     path: "/",
     element: <SignupPage/>,
    },
  {
    path: 'login',
    element:<Login/>,
    },
  {
    path: 'forgot-password',
    element:<ForgotPasswordPage/>,
    },
  {
    path:'home',
    element:<HomePage/>  
    },
  

 ]);
  
 ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
 );

reportWebVitals();
