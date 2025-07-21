import React from 'react';
import './App.css';
import Products from './components/Products';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import About from './components/About';
import Contact from './components/Contact';
import { Toaster } from 'react-hot-toast';
import Cart from './components/Cart';
import LogIn from './components/LogIn';
import PrivateRoute from './components/PrivateRoute';
import Profile from './components/Profile'; // Assuming you have this
import { Register } from './components/Register';
import Checkout from './components/Checkout';
import PaymentConfirmation from './components/PaymentConfirmation';

function App() {
  return (
    <React.Fragment>
      <Router>
        <NavBar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<PrivateRoute publicPage={true} />}>
            <Route index element={<LogIn />} />
          </Route>
          {/* Private Routes */}
          <Route element={<PrivateRoute publicPage={false} />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirm" element={<PaymentConfirmation />} />
          </Route>
        </Routes>
      </Router>
      <Toaster position="bottom-center" />
    </React.Fragment>
  );
}

export default App;