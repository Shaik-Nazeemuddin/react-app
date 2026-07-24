
export const ProductDetailsLoader = async ({ params }) => {
  const { id } = params;
  const res = await fetch('http://localhost:3000/movies/' + id);
  return res.json();
}