
export const ProductDetailsLoader = async ({ params }) => {
  const { id } = params;
  // const res = await fetch('http://localhost:3000/movies/' + id);
  const res = await fetch('https://node-app-production-8f02.up.railway.app/movies/' + id);
  return await res.json();
}