import { ProductsResponse } from "@/types";
import api from "./http";

export async function getAllProducts(limit = 0, skip = 0) {
  try {
    const res = await api.get<ProductsResponse>("/products", {
      params: { limit, skip },
    });

    return { currentProducts: res.data.products, total: res.data.total };
  } catch (error) {
    throw new Error("Something went wrong fetching the products!");
  }
}

export async function getProductsByCategory(
  limit = 0,
  skip = 0,
  category: string
) {
  try {
    const res = await api.get<ProductsResponse>(
      `/products/category/${category}`,
      {
        params: { limit, skip },
      }
    );

    return { currentProducts: res.data.products, total: res.data.total };
  } catch (error) {
    throw new Error("Something went wrong fetching the products!");
  }
}

export async function getProductBySearchQuery(search: string) {
  try {
    const res = await api.get<ProductsResponse>("/products/search", {
      params: { q: search },
    });

    return { currentProducts: res.data.products, total: res.data.total };
  } catch (error) {
    throw new Error("Something went wrong fetching the products!");
  }
}

export async function getProductById(id: number) {
  try {
    const res = await api.get(`/products/${id}`);

    return res.data;
  } catch (error) {
    throw new Error("Something went wrong fetching the products!");
  }
}
