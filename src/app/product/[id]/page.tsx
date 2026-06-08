import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import ProductDetailsClient from "../ProductDetailsClient";
import Products from "@services/products.service";

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
  const queryClient = new QueryClient();

  // Prefetch the product data to have it ready for the client component
  // Prefetching the product data to have it ready for the client component, this will
  // populate the cache with the product data before the client component tries to access it.
  await queryClient.prefetchQuery({
    queryKey: ["product", id],
    queryFn: await Products().getProductById(Number(id)),
  });

  return (
    // Wrapping the client component with HydrationBoundary to pass the prefetched data to the client component, this will allow the client component to access the prefetched data from the cache without needing to refetch it
    // dehydrate is used to serialize the query client's state, which includes the prefetched data, and pass it to the client component through the HydrationBoundary. This allows the client component to access the prefetched data from the cache without needing to refetch it, improving performance and providing a better user experience.+
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductDetailsClient id={id} />
    </HydrationBoundary>
  );
};

export default ProductDetailsPage;
