import React, { useState, useEffect } from 'react';
import Form from './../components/Form';
import { Navigate, useLocation } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import api from '../js/api';
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../js/constants";

function Login() {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const location = useLocation();
  const from = location.state?.from?.pathname || '/'; // Default to /dashboard if no from location

  useEffect(() => {
    auth().catch(() => setIsAuthorized(false));
  }, []);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = await api.post("/api/token/refresh/", { refresh: refreshToken });
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.log(error);
      setIsAuthorized(false);
    }
  };

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false);
      return;
    }
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;

    if (tokenExpiration < now) {
      await refreshToken();
    } else {
      setIsAuthorized(true);
    }
  };

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isAuthorized ? (
        <Navigate to={from} replace /> // Redirect to `from` location after login
      ) : (
        <div className='container mx-auto min-w-full min-h-screen flex justify-center items-center text-white '>
          <div className='absolute inset-0 z-0 bg-grey'></div>
          <Form route='api/token/' method='login' login={true} /> 
        </div>
      )}
    </>
  );
}

export default Login;
