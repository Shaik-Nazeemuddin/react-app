import { useNavigate } from 'react-router-dom'

const Error = () => {
    const navigation = useNavigate();

    return (
        <div>
            <h1>Products Page Error </h1>
            <p>Product not Found</p>
            <button type='button' className="btn btn-info" onClick={() => navigation('/products', { replace: true })}>Back to Products</button>
        </div>
    )
}

export default Error