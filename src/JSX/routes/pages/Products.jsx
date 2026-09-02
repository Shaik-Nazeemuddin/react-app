import { useEffect,useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const Products = () => {
  // const productsData = useLoaderData();
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://node-app-production-8f02.up.railway.app/movies');
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await res.json();
        setProductsData(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  
  return (
    <div className="custom-component">
      <h2>List of all products</h2>
      <div className="product-list">
        {productsData && productsData.map((product, index) => {
          return (
            <Link to={(index + 1).toString()} key={product.id} className="products">
              <span>{product.original_title} , {product.id} </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Products;