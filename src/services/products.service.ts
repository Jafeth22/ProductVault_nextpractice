import { IProducts } from "@/types/products";

const Products = () => {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "url_not_defined";

  const getProducts = async () => {
    const response = await fetch(baseURL);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch products: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    return data.products ?? [];
  };

  const getProductById = async (id: number) => {
    const response = await fetch(`${baseURL}/${id}`);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch product with id ${id}: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    return data;
  };

  const addNewProduct = async (newProduct: IProducts) => {
    console.log(["New product", newProduct]);
    const newProductResp = await fetch(`${baseURL}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });
    console.log(["new product create", newProductResp]);
    return newProductResp;
  };

  return {
    getProducts,
    getProductById,
    addNewProduct,
  };
};

export default Products;
