import React from 'react'
import { register } from '../services/Api'
import { useState } from 'react'
import ToastNotification from './common/ToastNotification'

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUserName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [toastVariant, setToastVariant] = useState('');
    const [showToast, setShowToast] = useState(false);

    const registerHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await register({
                email: email,
                userName: username,
                password: password
            })
            console.log(JSON.stringify(response))
            setSuccessMessage("Registration Successfully!")
            setShowToast(true)
            setToastVariant('success')
        } catch (error) {
            if(error.response && error.response.data == "USERALREADYEXIST"){
                setErrorMessage("User Already Exist");
                setShowToast(true)
                setToastVariant('error')
            }else{
                setErrorMessage("Registration Failed!");
                setShowToast(true)
                setToastVariant('error')
            }
        }
        
    };

    const closeToast = () => {
        setShowToast(false);
      };

  return (
    <div className='container m-auto'>
        <div className="col-6 m-auto">
            <div className='card mt-5'>
                <h3 className='text-md-center mb-2'>Register</h3>
                <div className='card-body'>
                    <form onSubmit={registerHandler} autoComplete='off' autoCorrect='off'>
                        <div className='form-group'>
                            <label>User Name</label>
                            <input className='form-control' type='text' onChange={(e) => setUserName(e.target.value)} required 
                                placeholder='please enter user Name' value={username}
                            ></input>
                        </div>
                        <div className='form-group'>
                            <label>Email Address</label>
                            <input className='form-control' type='email' onChange={(e) => setEmail(e.target.value)} required 
                                placeholder='please enter email' value={email}
                            ></input>
                        </div>
                        <div className='form-group'>
                            <label>Password</label>
                            <input className='form-control' type='password' onChange={(e) => setPassword(e.target.value)} required 
                                placeholder='please enter Password' value={password}
                            ></input>
                        </div>
                        
                        
                        <div className="d-flex justify-content-lg-start">
                            <button type='submit' className='btn btn-success mt-3 me-3'>Register</button>
                          <a href="/"><button type="button" className="btn btn-primary mt-3">Login</button></a>
                        </div>
                        
                    </form>

                </div>

            </div>
        </div>
        <ToastNotification
            show={showToast}
            message={toastVariant === 'success' ? successMessage : errorMessage}
            variant={toastVariant}
            onClose={closeToast}
        />
    </div>


  )
}

export default Register
