import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect} from 'react';
import { Chance } from 'chance';
import './userDetails.css';
import close from '../../assets/delete.png';

import DeleteAll from "./DeleteAll";
import { addUser, deleteUser } from '../../reduxtoolkitstore/slices/UserSlice';
// import { addUser, deleteUser, deleteAllUsers } from '../../reduxtoolkitstore/slices/UserSlice';
import { addStudent, removeStudent } from '../../reduxtoolkitstore/slices/StudentSlice';
// import { addStudent, removeStudent, removeAllStudent, removeAll } from '../../reduxtoolkitstore/slices/StudentSlice';
import { clearAll } from '../../reduxtoolkitstore/actions';
import { fetchUsers } from "../../reduxtoolkitstore/slices/RegisteredUserSlice";

const defaultBranches = [
    { name: "CSE" },
    { name: "ECE" },
    { name: "EEE" },
    { name: "IT" },
    { name: "Mechanical" }
]
const UserDetailsRTK = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector(state => state.users);
    const studentsData = useSelector(state => state.students);
    const chance = new Chance();
    const {registeredusers,loading,error} = useSelector((state) => state.registeredusers);
    
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);



    // adding a user 
    const handleAddUser = (user) => {
        const newUser = { name: user };
        dispatch(addUser(newUser));
    }

    // adding a student object
    const handleAddStudent = (student) => {
        const studentId = studentsData.length ? (studentsData[studentsData.length - 1].id + 1) : 101;
        const studentBranchName = getRandomBranchName(defaultBranches).name;
        const newStudent = { id: studentId, name: student, department: studentBranchName };
        dispatch(addStudent(newStudent));
    }

    // deleting a user
    const handleDeleteUser = (e) => {
        dispatch(deleteUser(parseInt(e.target.id)));
    }

    // deleting a student object
    const handleDeleteStudent = (e) => {
        const studentIndex = studentsData.findIndex(student => student.id === parseInt(e.target.id))
        dispatch(removeStudent(studentIndex));
    }

    // delete all users and students
    const handleDeleteAll = () => {
        // dispatch(deleteAllUsers());
        // dispatch(removeAllStudent());
        // dispatch(removeAll()); // extra reducer method 
        dispatch(clearAll());     // action method 

    }

    const getRandomBranchName = (arr) => {
        const randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
    }

    return (
        <div className="custom-component">
            <div className="main-content">
                <h2>Redux Toolkit</h2>
                <h3>Functionality using createSlice,configureStore,Provider,UseDispatch & UseSelector</h3>
                <div className="content-top">
                    <div className="content-top-left">
                        <h3>List of all Users & Students</h3>
                    </div>
                    <div className="content-top-right">
                        <button className="btn  btn-info btn-space btn-grad btn-top-bottom" onClick={() => handleAddUser(chance.name())}>Add User<span className="item-count">{userData.length > 0 && userData.length}</span></button>
                        <button className="btn  btn-info btn-grad btn-top-bottom" onClick={() => handleAddStudent(chance.name())}>Add Student<span className="item-count">{studentsData.length > 0 && studentsData.length}</span></button>
                    </div>
                </div>
                <ul>
                    {userData.map((item, index) => {
                        return (<li key={index}>
                            <span>{index+1}. {item.name} ( <b>User</b> )</span>
                            <img src={close} id={index} alt="" onClick={handleDeleteUser} />
                        </li>)
                    })} 
                    {studentsData.map((item,index) => {
                        return (<li key={item.id}>
                            <span>{index+1}. {item.name} ( <b>Student</b> )</span>
                            <img src={close} id={item.id} alt="" onClick={handleDeleteStudent} />
                        </li>)
                    })} 
                </ul>
                <div className="align-right">
                    <DeleteAll onDeleteAll={handleDeleteAll} />
                </div>
                <button className="btn btn-info btn-top-bottom" onClick={() => navigate('/userdetails')}>UserDetails</button>
                <div className="content-top-left">
                    <h2>List of all Registered Users </h2>
                    <h3 style={{ marginBottom:'50px'}}>Display Users using (Async Thunk)</h3>
                </div>
                {loading && <h4>Loading...</h4>}
                {error && <h4>{error}</h4>}
                <ul>
                    {registeredusers.map((user,index) => {
                        return(<li key={user.firstname} style={{minHeight:'46px',textAlign:'left'}}>
                            <span>{index+1}. {user.firstname} {(user.firstname === user.lastname) ? '' : user.lastname} ( <b>RegisteredUser</b> )</span>
                        </li>)
                    })}
                </ul>
            </div>
        </div>
    )
}

export default UserDetailsRTK;