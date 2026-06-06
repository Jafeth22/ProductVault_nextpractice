import { Button } from "@chakra-ui/react";
import Link from "next/link";

export async function generateStaticParams() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}`, {
    cache: "force-cache",
  });
  const data = await response.json();

  return data.products.map((product: any) => ({
    id: String(product.id),
  }));
}

interface ProductDetailsPageProps {
  params: {
    id: string;
  };
}

const ProductDetailsPage = async ({ params }: ProductDetailsPageProps) => {
  const { id } = await params;
  const productResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/${id}`,
    {
      cache: "force-cache",
    },
  );
  const currentProduct = await productResponse.json();
  return (
    <div>
      <Button asChild>
        <Link href="/">Back to Products</Link>
      </Button>
      <br />
      Product Details Page, ID: {`${id}`}
      <br />
      <pre>{JSON.stringify(currentProduct, null, 2)}</pre>
    </div>
  );
};

export default ProductDetailsPage;
