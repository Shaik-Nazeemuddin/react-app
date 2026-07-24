
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';


function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="align-center pagenotfound">
      <span className="text-404">404</span>
      <h1 style={{ marginBottom: '10px', marginTop: '20px' }}>Page not found </h1>
      <p>Sorry, we couldn’t find the page you’re looking for.</p>
      <button type="button" className="btn btn-info btn-space margin-top-15" onClick={() => navigate('/')}><ArrowLeft className="margin-right-5" />  Back to Home </button>
    </div>
  )
}

export default NotFound