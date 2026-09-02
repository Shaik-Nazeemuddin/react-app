import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

const ProductDetails = () => {
  // const productDetails = useLoaderData();
  const navigation = useNavigate();
  const { id } = useParams();
 
  const [productDetails, setProductDetails] = useState([]);
 
  useEffect(() => {
      const fetchProducts = async () => {
        try {
          const res = await fetch('https://node-app-production-8f02.up.railway.app/movies/' + (id && id));
          if (!res.ok) {
            throw new Error('Failed to fetch products');
          }
          const data = await res.json();
          setProductDetails(data);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
  
      fetchProducts();
    }, [id]);

  return (
    <div className='custom-component extrapadding'>
      <h2>Product Details {id && id}</h2>
      <div className="text-left">
        {productDetails && (
          <>
            <p><b>Product Titel :</b>   {productDetails.original_title}</p>
            <p><b>Product Task :</b>    {productDetails.release_date} </p>
            <p><b>popularity :</b>      {productDetails.popularity}</p>
            <p><b>release_date :</b>    {productDetails.release_date}</p>
            <p><b>vote_average :</b>    {productDetails.vote_average}</p>
            <p><b>vote_count :</b>      {productDetails.vote_count}</p>
            <p><b>Product Status :</b>  {productDetails.overview}</p>
          </>
         )}
      </div>
      <div className="align-center">
        <button type='button' className="btn btn-info" onClick={() => navigation('/products', { replace: true })}><ArrowLeft className="margin-right-5" /> Back to Products</button>
      </div>
    </div>
  )
}

export default  ProductDetails;

