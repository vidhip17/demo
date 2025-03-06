import { useState } from 'react';
import React from 'react'
import { logout, updateUserRole } from '../../services/Api';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutM } from '../../redux/reducers/authReducer';

const Header = () => {
    const dispatch = useDispatch();
    const username = localStorage.getItem('username'); 
    const role = JSON.parse(localStorage.getItem('role'));
    const rolesString  = JSON.parse(localStorage.getItem('roles'));
    let roles;
    try {
      roles = JSON.parse(rolesString) || [];
    } catch (error) {
      if (typeof rolesString === 'string') {
        roles = rolesString.replace(/^\[|\]$/g, '').split(',').map(role => role.trim());
      }
    }
    const userId = localStorage.getItem('userId');
    const [currentRole, setCurrentRole] = useState(role);
    const navigate = useNavigate();
    const isAdmin = JSON.stringify(role) && JSON.stringify(role).includes("ADMIN");

    const logOut = async () => {
      const res = await logout();
      // localStorage.clear();
      dispatch(logoutM());
      navigate("/");
    }

    const handleNavigateHome = () => {
      if (isAdmin) {
          navigate('/adminDashboard'); 
      } else {
          navigate('/userPage'); 
      }
    }

    const handleRoleChange = async (event) => {
      const newRole = event.target.value;
      setCurrentRole(newRole);
      const updatedUser = await updateUserRole(userId, newRole);
      if(updatedUser && updatedUser.data){
        console.log('Role updated:', updatedUser);
        localStorage.setItem('role', JSON.stringify(newRole)); 
        navigate('/dashboard');
      }
      
    };
  return (
    <div>
      <header className="d-flex justify-content-between align-items-center p-3 bg-dark text-white">
        <a onClick={handleNavigateHome}><h3 className="m-0">CMS</h3></a>
        <div className="d-flex align-items-center">
            <span className="me-3">Hello, {username}</span>
            <select
              className="form-select form-select-sm me-3"
              value={currentRole}
              onChange={handleRoleChange}
            >
              {roles && roles.length > 0 ? (
                roles.map((role, index) => (
                  <option key={index} value={role}>
                    {role}
                  </option>
                ))
              ) : (
                <option disabled>No roles available</option>
              )}
            </select>
            <button className="btn btn-light btn-sm" onClick={logOut}>
            Logout
            </button>
        </div>
    </header>
    </div>
  )
}

export default Header
