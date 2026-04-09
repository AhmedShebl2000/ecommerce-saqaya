const BASE_URL = "https://dummyjson.com/products";

export async function getAllProducts(limit = 0, skip = 0) {
  try {
    const res = await fetch(`${BASE_URL}?limit=${limit}&skip=${skip}`);

    if (!res.ok) {
      throw new Error("There was an error fetching products.");
    }

    const data = await res.json();
    return { currentProducts: data.products, total: data.total };
  } catch (error) {
    throw new Error("Something went wrong fetching the products!");
  }
}
