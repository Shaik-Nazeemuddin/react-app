import { Outlet } from "react-router-dom"

const TodoLayout = () => {
    return (
        <div>
            <h1>Todos </h1>
            <Outlet />
        </div>
    )
}

export default TodoLayout;
