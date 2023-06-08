import {createSlice, createAction, configureStore} from '@reduxjs/toolkit';
// import {createStore} from 'redux';
const userSlice = createSlice({
    name : 'user',
    initialState : {
        email : null
    },
    reducers:{
        login : (state,action)=>{
            state.email = action.payload;
        },
        logout : (state)=>{
            state.email = null;
        }
    }
});

// export const store = configureStore(userSlice.reducer);

export const selectUser = (state) => state.user.email;

export default userSlice.reducer;