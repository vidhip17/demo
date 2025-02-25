import react, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { login , setAuthHeader} from "../services/Api";
import ToastNotification from "./common/ToastNotification";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [toastVariant, setToastVariant] = useState('');
    const [showToast, setShowToast] = useState(false);

    const handleEmail = async (e) => {
        e.preventDefault();
        try {
          const response = await login({ username :email, password: password });
          
          // const token = response.data;
          // setAuthHeader(token);

          const { message, token, username, role } = response.data; // Destructure the response
          setAuthHeader(token);
          // Store the token, username, and role in localStorage
          localStorage.setItem("token", token);
          localStorage.setItem("username", username);
          localStorage.setItem("role", JSON.stringify(role));

          localStorage.setItem("token", token);                                                                   
          setSuccessMessage("Logged in Successfully!");
          setShowToast(true)
          setToastVariant('success')
          navigate('/itemList'); 
        } catch (error) {
          if (error.response) {
            // setErrorMessage("User Not Exist!");
            // setShowToast(true)
            // setToastVariant('error')
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
          } else{
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
        <div className="container m-auto">
            <div className="col-6 m-auto">

              <div className="card mt-5">
                  <h2 className="text-lg-center">Login</h2>
                  <div className="card-body">
                    <form onSubmit={handleEmail} autoComplete="off">
                      <div className="form-group m-auto">
                        <label>Email Address or User Name</label>
                        <input className="form-control"
                          type="text"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          autoComplete="off" 
                          name="new-user"
                          required
                          />
                      </div>
                      <div className="form-group m-auto">
                        <label>Password</label>
                        <input
                          className="form-control"
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          autoComplete="off"
                          name="new-password"
                          required
                          />
                      </div>
                        
                        
                        <button type="submit" className="btn btn-primary mt-3">Login</button>
                    </form>
                  </div>
              </div>
              
            </div>
            <ToastNotification 
              show={showToast}
              message={toastVariant === 'success' ? successMessage : errorMessage}
              variant={toastVariant}
              onClose={closeToast}>

              </ToastNotification>
          </div>
      );
};

export default Login