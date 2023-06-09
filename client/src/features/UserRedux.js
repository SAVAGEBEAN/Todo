import {createSlice} from '@reduxjs/toolkit';
// import {createStore} from 'redux';
const userSlice = createSlice({
    name : 'user',
    initialState : {
        token : localStorage.getItem('token') || null,
        email : null
    },
    reducers:{
        verify:(state,action)=>{
            state.email = action.payload;
        },
        login : (state,action)=>{
            state.token = action.payload;
        },
        logout : (state)=>{
            state.token = null;
            state.email = null;
        }
    }
});

// export const store = configureStore(userSlice.reducer);
export const {verify,login,logout} = userSlice.actions
export const selectToken = (state) => state.user.token;
export const selectEmail = (state) => state.user.email;

export default userSlice.reducer;