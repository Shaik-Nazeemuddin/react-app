import { Link, useLoaderData } from "react-router-dom";

const Products = () => {
  const productsData = useLoaderData();

  return (
    <div className="custom-component">
      <h2>List of all products</h2>
      <div className="product-list">
        {productsData && productsData.map((product, index) => {
          return (
            <Link to={(index + 1).toString()} key={index + 1} className="products">
              <span>{product.original_title} , {product.id} </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Products;