import { configureStore } from "@reduxjs/toolkit";
// import UserSlice from "./slices/UserSlice";
// import StudentSlice from './slices/StudentSlice';

// const store = configureStore({
//     reducer: {
//         // users: UserSlice.reducer,
//         users: UserSlice,
//         students: StudentSlice,
//     }
// })

import users from "./slices/UserSlice";
import students from './slices/StudentSlice';
import registeredusers from "./slices/RegisteredUserSlice";
import contacts from "./slices/ContactSlice";

const store = configureStore({
    reducer: {
        users,
        students,
        registeredusers,
        contacts
    }
});

export default store;