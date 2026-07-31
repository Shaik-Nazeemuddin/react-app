export const ProductsLoader = async () => {
  // const res = await fetch('http://localhost:3000/movies');
  const res = await fetch('https://node-app-production-8f02.up.railway.app/movies');
  return res.json();
}