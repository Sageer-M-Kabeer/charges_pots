import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import SignupPage from './pages/SignupPage'
import Login from './pages/Login'
import Buy from './pages/Buy';
import Lease from './pages/Lease';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import PreRecharge from './pages/PreRecharge'
import Team from './pages/Team';
import BindCardPage from './pages/BindCardPage'
import Withdraw from './pages/Withdraw'
import Precautions from './pages/Precautions'
import GetApp from './pages/GetApp';
import InviteFriends from './pages/InviteFriends';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from './pages/HomePage';
import Mine from './pages/Mine';
import { createRoot } from 'react-dom/client';

import App from './App';
import RechargeRecordPage from './pages/RechargeRecordPage';
import WithdrawRecordPage from './pages/WithdrawRecordPage';
import CheckinRecordPage from './pages/CheckinRecordPage';
import WithdrawalProofUpload from './pages/WithdrawalProofUpload';
import Recharge from './pages/Recharge';
import UploadCashOutProof from './pages/UploadCashOutProof'


// 👇️ make sure to use the correct root element ID
// from your public/index.html file
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);


const router = createBrowserRouter([


  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/buy",
    element: <Buy />,
  },
  {
    path: "/lease",
    element: <Lease />,
  },
  {
    path: "/team",
    element: <Team />,
  },
  {
    path: "/mine",
    element: <Mine />,
  },
  {
    path: "signup/:ref?",
    element: <SignupPage />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "recharge-records",
    element: <RechargeRecordPage />,
  },
  {
    path: "withdraw-records",
    element: <WithdrawRecordPage />,
  },
  {
    path: "checkin-records",
    element: <CheckinRecordPage />,
  },
  {
    path: "withdrawal-proofs",
    element: <WithdrawalProofUpload />,
  },
  {
    path: "recharge/:amount",
    element: <Recharge />,
  },
  {
    path: "pre-recharge",
    element: <PreRecharge />,
  },
  {
    path: "bind-card",
    element: <BindCardPage />,
  },
  {
    path: "withdraw",
    element: <Withdraw />,
  },
  {
    path: "precautions",
    element: <Precautions />,
  },
  {
    path: "get-app",
    element:<GetApp/>
  },
  {
    path: "invite-friends",
    element:<InviteFriends/>
  },
  {
    path: "/upload-cashouts",
    element: <UploadCashOutProof/>
  }




]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

reportWebVitals();
