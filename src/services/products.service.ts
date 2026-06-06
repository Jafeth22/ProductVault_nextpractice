const Products = () => {
  const getProducts = async () => {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "test";
    let products = [];
    try {
      const response = await fetch(baseURL);
      const data = await response.json();
      products = data.products || [];
    } catch (error) {
      console.error("Error fetching products:", error);
    }

    return products;
  };

  return {
    getProducts,
  };
};

export default Products;
