import AllProducts from "@/components/modules/products";
import ProductBanner from "@/components/modules/products/banner";
import CategoryCard from "@/components/ui/core/CategoryCard";
import NMContainer from "@/components/ui/core/NMContainer/NMContainer";
import { getAllCategories } from "@/services/Category";
import { getAllProducts } from "@/services/Product";
import { ICategory } from "@/types";

const AllProductPage = async () => {
  const { data: categories } = await getAllCategories();
  const { data: products } = await getAllProducts();
  return (
    <NMContainer>
      <ProductBanner title="All Products" path="Home - Products" />
      <h2 className="text-xl font-bold my-5">Featured Collection</h2>
      <div className=" grid grid-cols-6 gap-8 ">
        {categories.slice(0, 6).map((category: ICategory, index: number) => (
          <CategoryCard key={index} category={category} />
        ))}
      </div>
      <AllProducts products={products} />
    </NMContainer>
  );
};

export default AllProductPage;
