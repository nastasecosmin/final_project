import { PageContainer } from "./components/page-container";
import { ProductsList } from "./components/products-list";

function App() {
  return (
    <PageContainer>
      <div className="py-10">
        <h1 className="text-3xl">All</h1>
      </div>
      <ProductsList categoryName={"all"} />
    </PageContainer>
  );
}

export default App;
