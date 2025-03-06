// import react, { useState } from "react";
// import { useNavigate } from 'react-router-dom';
// import { login , setAuthHeader} from "../services/Api";
// import ToastNotification from "./common/ToastNotification";
// // import UserPage from "./UserPage.jsx";
// import './LoginForm.css'

// const Login = () => {
//     const navigate = useNavigate();
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');
//     const [successMessage, setSuccessMessage] = useState('');
//     const [toastVariant, setToastVariant] = useState('');
//     const [showToast, setShowToast] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);

//     const handleEmail = async (e) => {
//         e.preventDefault();
//         try {
//           const response = await login({ username :email, password: password });
          
//           // const token = response.data;
//           // setAuthHeader(token);

//           const { userId, message, token, username, role, currentRole } = response.data; 
//           setAuthHeader(token);
//           localStorage.setItem("token", token);
//           localStorage.setItem("username", username);
//           // localStorage.setItem("role", JSON.stringify([currentRole]));
//           const currentRoleArray = [currentRole];  
//           localStorage.setItem("role", JSON.stringify(currentRoleArray));
//           localStorage.setItem("roles", JSON.stringify(role));
//           localStorage.setItem("userId", userId);

//           localStorage.setItem("token", token);                                                                   
//           setSuccessMessage("Logged in Successfully!");
//           setShowToast(true)
//           setToastVariant('success')
//           // navigate('/itemList'); 
//           const isAdmin = JSON.stringify(currentRoleArray) && JSON.stringify(currentRoleArray).includes("ADMIN");
//           if (isAdmin) {
//             navigate('/adminDashboard');
//           } else {
//             navigate('/userPage');
//           }
//         } catch (error) {
//           if (error.response) {
            
//             const { message } = error.response.data;

//             if (message === "USERNOTFOUND") {
//                 setErrorMessage("User Not Exist!");
//                 setShowToast(true);
//                 setToastVariant('error');
//             } else if (message === "PASSWORDNOTMATCH") {
//                 setErrorMessage("Password Not Match!");
//                 setShowToast(true);
//                 setToastVariant('error');
//             } else {
//                 setErrorMessage("Login Failed!");
//                 setShowToast(true);
//                 setToastVariant('error');
//             }
//           } else{
//             setErrorMessage("Login Failed!");
//             setShowToast(true)
//             setToastVariant('error')
//           }
//         }
//     };

//     const closeToast = () => {
//       setShowToast(false);
//     };

//     const Button = ({value}) => {
//       return (
//         <button 
//           onClick={(e) => e.preventDefault()}
//           className="mt-6 transition transition-all block py-3 px-4 w-full text-white font-bold rounded cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-400 hover:from-indigo-700 hover:to-purple-500 focus:bg-indigo-900 transform hover:-translate-y-1 hover:shadow-lg">
//           {value}
//       </button>
//       )
//     }
    
//     const Input = ({type, id, name, label, placeholder, autofocus}) => {
//       return (
//         <label className="text-gray-500 block mt-3">{label}
//           <input
//             autoFocus={autofocus}
//             type={type} 
//             id={id} 
//             name={name} 
//             placeholder={placeholder}
//             className="rounded px-4 py-3 w-full mt-1 bg-white text-gray-900 border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-100"/>
//         </label>
//       )
//     }
    

//     return (
//         <div className="container m-auto" style={{paddingTop: '100px'}}>
//             <div className="m-auto">

//               <div className="card mt-5" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} id="login-form">
//                   <h2 className="text-lg-center mt-3">Login</h2>
//                   <div className="card-body">
//                     <form onSubmit={handleEmail} autoComplete="off">
//                       <div className="form-group m-auto">
//                         <label>Email Address or User Name</label>
//                         <input className="form-control"
//                           type="text"
//                           placeholder="Email"
//                           value={email}
//                           onChange={(e) => setEmail(e.target.value)}
//                           autoComplete="off" 
//                           name="new-user"
//                           required
//                           />
//                       </div>
//                       <div className="form-group m-auto">
//                         <label>Password</label>
//                         <input
//                           className="form-control"
//                           type="password"
//                           placeholder="Password"
//                           value={password}
//                           onChange={(e) => setPassword(e.target.value)}
//                           autoComplete="off"
//                           name="new-password"
//                           required
//                           />
//                       </div>
                        
//                         <div className="d-flex justify-content-lg-start">
//                           <button type="submit" className="btn btn-primary mt-3 me-3">Login</button>
//                           <a href="/register"><button type="button" className="btn btn-success mt-3">Register</button></a>
//                         </div>
//                     </form>
//                   </div>
//               </div>
              
//             </div>
//             <ToastNotification 
//               show={showToast}
//               message={toastVariant === 'success' ? successMessage : errorMessage}
//               variant={toastVariant}
//               onClose={closeToast}>

//             </ToastNotification>
//           </div>


          
//       );
// };

// export default Login

import react, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { login, setAuthHeader } from "../services/Api";
import ToastNotification from "./common/ToastNotification";
import './LoginForm.css';
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, loginFailure } from "../redux/reducers/authReducer";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [toastVariant, setToastVariant] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const authState = useSelector((state) => state.auth);
    const handleEmail = async (e) => {
        e.preventDefault();
        
        try {
            const response = await login({ username: email, password: password });
            
            const { userId, message, token, username, role, currentRole } = response.data; 
            setAuthHeader(token);

            dispatch(loginSuccess({ userId, username, token, role, currentRole }));

            localStorage.setItem("token", token);
            localStorage.setItem("username", username);
            const currentRoleArray = [currentRole];  
            localStorage.setItem("role", JSON.stringify(currentRoleArray));
            localStorage.setItem("roles", JSON.stringify(role));
            localStorage.setItem("userId", userId);
            
            localStorage.setItem("token", token);                                                                   
            setSuccessMessage("Logged in Successfully!");
            setShowToast(true)
            setToastVariant('success')
            
            const isAdmin = JSON.stringify(currentRoleArray) && JSON.stringify(currentRoleArray).includes("ADMIN");
            if (isAdmin) {
                navigate('/adminDashboard');
            } else {
                navigate('/userPage');
            }
        } catch (error) {
            if (error.response) {
                
                const { message } = error.response.data;

                if (message === "USERNOTFOUND") {
                    setErrorMessage("User Not Exist!");
                    setShowToast(true);
                    setToastVariant('error');
                } else if (message === "PASSWORDNOTMATCH") {
                    setErrorMessage("Password Not Match!");
                    setShowToast(true);
                    setToastVariant('error');
                } else {
                    setErrorMessage("Login Failed!");
                    setShowToast(true);
                    setToastVariant('error');
                }
            } else {
                setErrorMessage("Login Failed!");
                setShowToast(true)
                setToastVariant('error')
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
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Sign in to your account
                    </p>
                </div>
                
                <div className="mt-8 bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleEmail} autoComplete="off">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email Address or User Name
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="new-user"
                                    type="text"
                                    autoComplete="off"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Enter your email or username"
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

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center justify-between space-x-4">
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Sign in
                            </button>
                            <a 
                                href="/register"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                            >
                                Register
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
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <div>
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                                    </svg>
                                </button>
                            </div>

                            <div>
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
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

export default Login;