import { createSlice } from "@reduxjs/toolkit";
import { clearAll } from "../actions";
//import { removeAll } from "./StudentSlice";

const UserSlice = createSlice({
    name: 'users',
    initialState: [{ name: 'Shaik Muhammed Arham' }],
    reducers: {
        addUser(state, action) {
            state.push(action.payload);
        },
        deleteUser(state, action) {
            state.splice(action.payload, 1);
        },
        deleteAllUsers() {
            return [];
        }
    },
    extraReducers(builder) {
        builder.addCase(clearAll, () => {
            return [];
        })
        // builder.addCase(removeAll, () => {
        //     return [];
        // })
    }
});

//export default UserSlice;
export default UserSlice.reducer;
export const { addUser, deleteUser, deleteAllUsers } = UserSlice.actions;




function useFetchData(url) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            })
    });
    return { data, loading };
}

function UserList() {
    const { data, loading } = useFetchData('https://jsonplaceholder.typicode.com/users');
    if (loading) return <h1>Loading...</h1>;
    return (
        data.map((user) => {
            <div key={user.id}>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
            </div>
        })
    )
}