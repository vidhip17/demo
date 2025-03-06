import React from "react";
import { Navigate, Route } from "react-router-dom";

const ProtectedRoute = ({ element, ...rest }) => {
    const role = JSON.parse(localStorage.getItem('role')); 
    const isAdmin = role && role.includes('ADMIN');

    if (!isAdmin) {
        return <Navigate to="/oops" />;
    }
    return element;
}

export const Dashboard = () => {
    const role = JSON.parse(localStorage.getItem('role')); 
    
    const isAdmin = role && (role === 'ADMIN' || (Array.isArray(role) && role.includes('ADMIN')));
    
    // Redirect based on role
    return isAdmin 
        ? <Navigate to="/adminDashboard" replace /> 
        : <Navigate to="/userPage" replace />;
}

export default ProtectedRoute;