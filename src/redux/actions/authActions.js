import { login, logout } from "../../services/Api";
import { loginSuccess, loginFailure, logoutM } from "../reducers/authReducer";

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export const loginUser = (userData) => async (dispatch) => {
    const response = await login(userData);

    try{
        const { userId, token, username, role, currentRole } = response.data;
        const user = { userId, username, role, currentRole };

        dispatch(loginSuccess({user, token}));
    }catch(error) {
        dispatch(loginFailure({ error: error.message || 'Login failed' }));
    }
    
}

export const logoutUser = () => (dispatch) => {
    dispatch(logoutM());
  };