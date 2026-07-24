import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chance } from 'chance';
import './userDetails.css';
import close from '../../assets/delete.png';

import DeleteAll from "./DeleteAll";

const defaultUsers = [
    { name: "Muhammed Arham" },
    { name: "Hameed Ansari" },
    { name: "Abdul Kalaam Azad" },
    { name: "Qamaruddin" },
    { name: "Nazeemuddin" }
]

const UserDetails = () => {
    const [users, setUsers] = useState(defaultUsers);
    const chance = new Chance();
    const navigate = useNavigate();

    const addUser = (user) => {
        // const addUser = () => {
        // const user = getRandomElement(defaultUsers);
        // const user = chance.name();
        const newUser = { name: user };
        setUsers([...users, newUser]);
    }

    const deleteUser = (e) => {
        const id = parseInt(e.target.id);
        const updatedUsers = users.filter((user, index) => index !== id);
        setUsers([...updatedUsers]);
    }

    const deleteAllUsers = () => {
        setUsers([]);
    }

    // const getRandomElement = (arr) => {
    //     const randomIndex = Math.floor(Math.random() * arr.length);
    //     return arr[randomIndex];
    // }

    const getRandomUser = () => {
        return chance.name();
    }

    return (
        <div className="custom-component">
            <div className="main-content">
                <h2>Without ReduxToolkit</h2>
                <h3>Functionality using UseState ....</h3>
                <div className="content-top">
                    <div className="content-top-left">
                        <h3>List of all Users</h3>
                    </div>
                    <div className="content-top-right">
                        <button className="btn  btn-info btn-grad" onClick={() => addUser(getRandomUser())}>Add User</button>
                    </div>
                </div>
                <ul>
                    {users.map((user, index) => {
                        return (defaultUsers.find(defaultuser => defaultuser.name === user.name))
                            ? <li key={index}><span>{user.name} ( <b>Default-User</b> )</span><img src={close} id={index} alt="" onClick={deleteUser} /></li>
                            : <li key={index}>{user.name}<img src={close} id={index} alt="" onClick={deleteUser} /></li>

                    })}
                </ul>
                <div className="align-right">
                    <DeleteAll onDeleteAll={deleteAllUsers} />
                </div>
                <button className="btn btn-info" onClick={() => navigate('rtk')}>Details-RTK</button>
            </div>
        </div>
    )
}

export default UserDetails