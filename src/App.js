import logo from './logo.svg';
import './App.css';
import Login from './components/Login.js'; // Correct case
import Register from './components/Register.js';
import ItemList from './components/ItemList.jsx';
import Oops from './components/common/Oops.jsx';
import AdminDashboard from './components/AdminDashboard/AdminDashboard.jsx';
import Announcement from './components/Announcement/Announcement.jsx';
import UserPage from './components/UserPage.jsx';
import UserAnnouncement from './components/UserAnnouncement.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ProtectedRoute from './components/common/ProtectedRoute.jsx';
import { Dashboard } from './components/common/ProtectedRoute.jsx';



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
        <Route path="/adminDashboard" element={<ProtectedRoute element={<AdminDashboard />} />} />
        <Route path="/announcement" element={<ProtectedRoute element={<Announcement />} />} />
        
        <Route path='/userAnnouncement' element={<UserAnnouncement/>} ></Route>
        <Route path='/userPage' element={<UserPage/>} ></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
