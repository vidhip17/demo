// import React from 'react'
// import { register } from '../services/Api'
// import { useState } from 'react'
// import ToastNotification from './common/ToastNotification'
// import './LoginForm.css'

// const Register = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [username, setUserName] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');
//     const [successMessage, setSuccessMessage] = useState('');
//     const [toastVariant, setToastVariant] = useState('');
//     const [showToast, setShowToast] = useState(false);

//     const registerHandler = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await register({
//                 email: email,
//                 userName: username,
//                 password: password
//             })
//             console.log(JSON.stringify(response))
//             setSuccessMessage("Registration Successfully!")
//             setShowToast(true)
//             setToastVariant('success')
//         } catch (error) {
//             if(error.response && error.response.data == "USERALREADYEXIST"){
//                 setErrorMessage("User Already Exist");
//                 setShowToast(true)
//                 setToastVariant('error')
//             }else{
//                 setErrorMessage("Registration Failed!");
//                 setShowToast(true)
//                 setToastVariant('error')
//             }
//         }
        
//     };

//     const closeToast = () => {
//         setShowToast(false);
//       };

//   return (
//     <div className='container m-auto' style={{paddingTop: '100px'}}>
//         <div className="m-auto">
//             <div className='card mt-5' style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} id="login-form">
//                 <h3 className='text-md-center mb-2 mt-3'>Register</h3>
//                 <div className='card-body'>
//                     <form onSubmit={registerHandler} autoComplete='off' autoCorrect='off'>
//                         <div className='form-group'>
//                             <label>User Name</label>
//                             <input className='form-control' type='text' onChange={(e) => setUserName(e.target.value)} required 
//                                 placeholder='please enter user Name' value={username} autoComplete="off" 
//                                 name="new-user"
//                             ></input>
//                         </div>
//                         <div className='form-group'>
//                             <label>Email Address</label>
//                             <input className='form-control' type='email' onChange={(e) => setEmail(e.target.value)} required 
//                                 placeholder='please enter email' value={email} autoComplete="off" 
//                                 name="new-email"
//                             ></input>
//                         </div>
//                         <div className='form-group'>
//                             <label>Password</label>
//                             <input className='form-control' type='password' onChange={(e) => setPassword(e.target.value)} required 
//                                 placeholder='please enter Password' value={password} autoComplete="off" 
//                                 name="new-password"
//                             ></input>
//                         </div>
                        
                        
//                         <div className="d-flex justify-content-lg-start">
//                             <button type='submit' className='btn btn-success mt-3 me-3'>Register</button>
//                           <a href="/"><button type="button" className="btn btn-primary mt-3">Login</button></a>
//                         </div>
                        
//                     </form>

//                 </div>

//             </div>
//         </div>
//         <ToastNotification
//             show={showToast}
//             message={toastVariant === 'success' ? successMessage : errorMessage}
//             variant={toastVariant}
//             onClose={closeToast}
//         />
//     </div>


//   )
// }

// export default Register

import React, { useState } from 'react';
import { register } from '../services/Api';
import ToastNotification from './common/ToastNotification';
import './LoginForm.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUserName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [toastVariant, setToastVariant] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const registerHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await register({
                email: email,
                userName: username,
                password: password
            });
            console.log(JSON.stringify(response));
            setSuccessMessage("Registration Successfully!");
            setShowToast(true);
            setToastVariant('success');
            
        } catch (error) {
            if(error.response && error.response.data === "USERALREADYEXIST"){
                setErrorMessage("User Already Exist");
                setShowToast(true);
                setToastVariant('error');
            } else {
                setErrorMessage("Registration Failed!");
                setShowToast(true);
                setToastVariant('error');
            }
        }
    };

    const closeToast = () => {
        setShowToast(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create an Account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Join our platform today
                    </p>
                </div>
                
                <div className="mt-8 bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={registerHandler} autoComplete="off" autoCorrect="off">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                User Name
                            </label>
                            <div className="mt-1">
                                <input
                                    id="username"
                                    name="new-user"
                                    type="text"
                                    required
                                    value={username}
                                    onChange={(e) => setUserName(e.target.value)}
                                    autoComplete="off"
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Enter your username"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="new-email"
                                    type="email"
                                    autoComplete="off"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    id="password"
                                    name="new-password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="off"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                            <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div>
                            <div className="text-sm mt-1">
                                <p className="text-gray-500">
                                    Password must be at least 8 characters long and include numbers and special characters.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between space-x-4">
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                            >
                                Register
                            </button>
                            <a 
                                href="/"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Back to Login
                            </a>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    By registering, you agree to our
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 text-center text-sm">
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Terms of Service
                            </a>
                            {" and "}
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Privacy Policy
                            </a>
                        </div>
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
    );
};

export default Register;
