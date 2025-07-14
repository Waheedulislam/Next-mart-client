import { Button } from "@/components/ui/button";
import CategoryCard from "@/components/ui/core/CategoryCard";
import { getAllCategories } from "@/services/Category";
import { ICategory } from "@/types";
import Link from "next/link";

const Category = async () => {
  const { data: categories } = await getAllCategories();
  console.log(categories);
  return (
    <div className="container mx-auto my-20">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-3xl">Category</h2>
        <Link href="/products">
          <Button className="rounded full" variant="outline">
            View All
          </Button>
        </Link>
      </div>

      <div className=" grid grid-cols-6 gap-8 my-5">
        {categories.slice(0, 6).map((category: ICategory, index: number) => (
          <CategoryCard key={index} category={category} />
        ))}
        {/* {Array(12)
          .fill(categories) /// extra method added
          .map((category: ICategory, index: number) => (
            <CategoryCard key={index} category={category} />
          ))} */}
      </div>
    </div>
  );
};

export default Category;
