import { useContext } from "react";
import { ProductsContext } from "../components/providers/products-context";
import { ProductsList } from "../components/products-list";
import { usePathname } from "../hooks/usePathname";
import { PageContainer } from "../components/page-container";

export default function CategoryPage() {
  const pathname = usePathname();
  const category = pathname.split("/")[2];
  const { getCategoryName } = useContext(ProductsContext);

  const categoryName = getCategoryName(category);

  return (
    <PageContainer>
      <div className="py-10">
        <h1 className="text-3xl">{categoryName}</h1>
      </div>
      <ProductsList categoryName={category} />
    </PageContainer>
  );
}
