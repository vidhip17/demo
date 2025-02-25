import React from 'react'
import { logout } from '../../services/Api';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const username = localStorage.getItem('username'); // assuming 'username' is stored in localStorage
    const role = JSON.parse(localStorage.getItem('role'));
    const navigate = useNavigate();

    const logOut = async () => {
            const res = await logout();
            // localStorage.clear();
            navigate("/");
        }
  return (
    <div>
      <header className="d-flex justify-content-between align-items-center p-3 bg-dark text-white">
        <h3 className="m-0"></h3> {/* Replace with your app name */}
        <div className="d-flex align-items-center">
            <span className="me-3">Hello, {username}</span>
            <button className="btn btn-light btn-sm" onClick={logOut}>
            Logout
            </button>
        </div>
    </header>
    </div>
  )
}

export default Header
