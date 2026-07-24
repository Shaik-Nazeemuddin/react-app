import { createSlice } from "@reduxjs/toolkit";
import { clearAll } from "../actions";

const StudentSlice = createSlice({
    name: 'students',
    initialState: [
        { id: 101, name: 'Shaik Nazeemuddin', department: 'CSE' },
        { id: 102, name: 'Shaik Humaira', department: 'CSE' },
        { id: 103, name: 'Shaik Noorjahan', department: 'EEE' },
        { id: 104, name: 'Shaik Khadar Basha', department: 'ECE' }
    ],
    reducers: {
        addStudent(state, action) {
            state.push(action.payload);
        },
        removeStudent(state, action) {
            state.splice(action.payload, 1);
        },
        removeAllStudent() {
            return [];
        },
        // removeAll() {
        //     return [];
        // }
    },
    extraReducers(builder) {
        // builder.addCase(StudentSlice.actions.removeAll, () => {
        //     return [];
        // }),
        builder.addCase(clearAll, () => {
            return [];
        })
    }

})

export default StudentSlice.reducer;
export const { addStudent, removeStudent, removeAllStudent, removeAll } = StudentSlice.actions;
