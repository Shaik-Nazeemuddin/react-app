export const ProductsLoader = async () => {
  const res = await fetch('http://localhost:3000/movies');
  return res.json();
}