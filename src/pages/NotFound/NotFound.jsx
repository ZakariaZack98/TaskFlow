import React from 'react';
import { useNavigate } from 'react-router-dom';


const NotFound = () => {
  const navigate = useNavigate();
  return <div>
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <p onClick={() => navigate('/')}>Go back to the home page</p>
  </div>
};

export default NotFound;