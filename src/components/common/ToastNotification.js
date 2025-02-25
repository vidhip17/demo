import React from 'react'
import { Toast, ToastContainer } from 'react-bootstrap'

const ToastNotification = ({ show, message, variant, onClose }) => {

    const toastStyle = variant === 'success' ? 'bg-success text-white' : 'bg-danger text-white';

    return (
        <ToastContainer position="top-center" className="p-3">
        <Toast show={show} onClose={onClose} delay={3000} autohide className={toastStyle}>
            <Toast.Header>
            <strong className="me-auto">{variant === 'success' ? 'Success' : 'Error'}</strong>
            <small>Just now</small>
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
        </Toast>
        </ToastContainer>
    )
}

export default ToastNotification
