import { useState } from 'react';

const DisplayF = () => {
    const [user,setUser] = useState('');

    const handleChange = (event:any) => {
        setUser(event.target.value);
    }

    return(
        <div className="custom-component">
            <h3>ChildsDisplayF Component </h3>
            <form>
                <label>
                    Name: <input type="text" placeholder="Enter Username" value={user} onChange={handleChange}/>
                </label>
                <p>Current Username: {user}</p>
            </form>
        </div>
    )
}

export default DisplayF;