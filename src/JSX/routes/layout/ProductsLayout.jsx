import { Outlet } from "react-router-dom"
//import Products from "../pages/Products"

const ProductsLayout = () => {
  return (
    <div>
      <h1>Products </h1>
      <Outlet />
    </div>
  )
}

export default ProductsLayout