const Products = () => {
  const getProducts = async () => {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "url_not_defined";
    const response = await fetch(baseURL);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch products: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    return data.products ?? [];
  };

  return {
    getProducts,
  };
};

export default Products;
