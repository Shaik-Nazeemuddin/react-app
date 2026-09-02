import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from "lucide-react";

const ErrorPage = () => {
    const navigation = useNavigate();

    return (
        <div className="align-center"> 
            <span className="text-404">404</span>
            <h1 style={{ marginBottom: '10px', marginTop: '20px' }}>Products Page Error </h1>
            <p>Product not Found. Sorry, we couldn’t find the product you’re looking for.</p>
            <button type='button' className="btn btn-info btn-space margin-top-15" onClick={() => navigation('/products', { replace: true })}><ArrowLeft className="margin-right-5" /> Back to Products</button>
        </div>
    )
}

export default ErrorPage