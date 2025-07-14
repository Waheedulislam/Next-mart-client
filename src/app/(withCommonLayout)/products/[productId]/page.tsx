import ProductBanner from "@/components/modules/products/banner";
import ProductsDetails from "@/components/modules/products/ProductsDetails";
import NMContainer from "@/components/ui/core/NMContainer/NMContainer";
import { getSingleProduct } from "@/services/Product";

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;
  const { data: product } = await getSingleProduct(productId);
  return (
    <NMContainer>
      <ProductBanner
        title="Product Details"
        path="Home - Products - Product Details"
      />
      <ProductsDetails product={product} />
    </NMContainer>
  );
};

export default ProductDetailsPage;
