import logo from './logo.svg';
import './App.css';
import Login from './components/Login.js'; // Correct case
import Register from './components/Register.js';
import ItemList from './components/ItemList.js';
import Oops from './components/common/Oops.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // This includes both Bootstrap JS and Popper.js (needed for dropdowns, modals, etc.)



import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element = {<Login/>} ></Route>
        <Route path='/register' element={<Register/>} ></Route>
        <Route path='/itemList' element={<ItemList/>} ></Route>
        <Route path='/oops' element={<Oops/>} ></Route>
      </Routes>
    </Router>
  );
}

export default App;
