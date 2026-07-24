import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const SigninFailure = () => {
    const navigate = useNavigate();

    return (
        <div className="align-center">
            <h2 style={{ color: '#e63946' }}>SignIn Failure</h2>
            <p>"Enter your currect credentials to Login, if not do registration in Signup page"</p>
            <button
                className="btn btn-info btn-space"
                onClick={() => navigate("/registration")}
            >
                <ArrowLeft className="margin-right-5" /> Back to SignIn Page
            </button>
        </div>
    )
}

export default SigninFailure