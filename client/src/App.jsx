import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';

import { AuthComponents, Components } from './index';

import './App.css';

const App = () => {
  const [userDataAvailable, setUserDataAvailable] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('result');
    if (userData) {
      setUserDataAvailable(true);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading............</div>;
  }

  return (
    <Suspense fallback={<div>Loading............</div>}>
      <Routes>
        <Route path="/" element={userDataAvailable ? <Navigate to="/home" /> : <AuthComponents.Signup />} />
        <Route path="/login" element={<AuthComponents.Login />} />
        <Route path="/home" element={!userDataAvailable ? <Navigate to="/" /> : <Components.Home />} />
        <Route path='/about' element={<Components.About_Page />} />
        <Route path='/shop' element={<Components.Shop />} />
        <Route path='/contact' element={<Components.Contact />} />
        <Route path='/search' element={<Components.Search />} />
        <Route path='/cart' element={<Components.Cart />} />
        <Route path='/email_verification_message' element={<Components.Email_Verification_Message />} />
        <Route path='/email_verification/:token' element={<Components.Email_Verification />} />
        <Route path='/checkout' element={<Components.Checkout />} />
        <Route path='/orders' element={<Components.Orders_Page />} />
      </Routes>
    </Suspense>
  );
}

export default App;