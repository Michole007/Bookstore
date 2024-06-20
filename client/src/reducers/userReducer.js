import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {},
    message: ''
}

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        register: (state, action) => {
            return { ...state, message: action.payload.msg };
        },
        register_status: (state, action) => {
            localStorage.setItem('result', JSON.stringify(action.payload));
            return { ...state, user: action.payload.result, message: action.payload.msg };
        },
        login: (state, action) => {
            localStorage.setItem('result', JSON.stringify(action.payload));
            return { ...state, user: action.payload.data };
        },
        logout_user: () => {
            localStorage.removeItem('result');
        },
        error_status: (state, action) => {
            return { ...state, message: action.payload }
        }
    },
})

// Action creators are generated for each case reducer function
export const { register, login, register_status, logout_user, error_status } = userSlice.actions;

export default userSlice.reducer;