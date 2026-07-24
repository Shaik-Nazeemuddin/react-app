import { Outlet } from "react-router-dom"

const UserDetailsLayout = () => {
    return (
        <div>
            <h1>User Details</h1>
            <Outlet />
        </div>
    )
}
export default UserDetailsLayout
