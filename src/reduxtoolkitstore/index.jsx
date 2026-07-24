import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./slices/UserSlice";
import StudentSlice from './slices/StudentSlice';

const store = configureStore({
    reducer: {
        // users: UserSlice.reducer,
        users: UserSlice,
        students: StudentSlice,
    }
})

export default store;