import { configureStore } from "@reduxjs/toolkit";
import userReducer from './UserRedux';

export default configureStore({
    reducer:{
        user:userReducer
    }
})