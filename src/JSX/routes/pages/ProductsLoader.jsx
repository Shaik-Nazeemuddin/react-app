export const ProductsLoader = async () => {
  const res = await fetch('http://localhost:8080/movies');
  return res.json();
}