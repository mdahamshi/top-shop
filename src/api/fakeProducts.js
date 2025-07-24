export async function fetchProducts({
  id = null,
  category = null,
  limit = null,
  userId = null,
  endpoint = 'products',
} = {}) {
  let baseURL = 'https://fakestoreapi.com';

  let path = `/${endpoint}`;

  if (endpoint === 'products' && id) {
    path += `/${id}`;
  } else if (endpoint === 'products' && category) {
    path += `/category/${category}`;
  } else if (endpoint === 'carts' && userId) {
    path += `?userId=${userId}`;
  } else if (endpoint === 'products' && limit) {
    path += `?limit=${limit}`;
  }

  const dataURL = `${baseURL}${path}`;

  try {
    const response = await fetch(dataURL, { mode: 'cors' });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Fetch error:', err);
    return null;
  }
}
