import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    userId: null,
    username: null,
    token: null,
    roles: [],
    role: [],
    isAuthenticated: false,
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        loginSuccess(state, action) {
            const { userId, username, token, role, currentRole } = action.payload;
            state.userId = userId;
            state.username = username;
            state.token = token;
            state.roles = role; 
            state.role = currentRole;
            state.isAuthenticated = true;
            state.error = null;
        },
        loginFailure(state, action) {
          state.error = action.payload.message;
        },
        logoutM(state) {
            state.username = null;
            state.token = null;
            state.userId = null;
            state.roles = null;
            state.role = null;
            state.error = null;
            state.isAuthenticated = false;
        },
    }
})

export default authSlice.reducer;

export const { loginSuccess, loginFailure, logoutM } = authSlice.actions;



// const authReducer = ({state = initialState, action}) => {
//     switch(action.type){
//         case 'LOGIN_SUCCESS':
//             return {
//                 ...state,
//                 username: action.payload.username,
//                 token: action.payload.token,
//                 userId: action.payload.userId,
//                 roles: action.payload.role,
//                 role: action.payload.currentRole,
//                 isAuthenticated: true,
//                 error: null,
//             };
//         case 'LOGIN_FAILURE':
//             return {
//                 ...state,
//                 error: action.payload.message,
//             };
//         case 'LOGOUT':
//             return {
//                 ...state,
//                 userId: null,
//                 token: null,
//                 username: null,
//                 role: [],
//                 roles: [],
//                 isAuthenticated: false,
//             };
//         default:
//             return state;
//     }
// };

// export default authReducer;