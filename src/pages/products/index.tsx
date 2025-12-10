// pages/products/index.tsx
import { GetServerSideProps } from "next";
import { Product } from "../../types";
import ProductCard from "../../components/ProductCard";

interface ProductsPageProps {
  products: Product[];
  query: string;
  total: number;
}

export default function ProductsPage({ products, query, total }: ProductsPageProps) {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Products</h2>
        {query && (
          <span className="text-muted small">
            Search: <strong>{query}</strong> • Showing{" "}
            <strong>{products.length}</strong> of <strong>{total}</strong>
          </span>
        )}
      </div>
      <div className="row">
        {products.length === 0 && (
          <div className="col-12 text-center text-muted py-5">
            No products found for <strong>{query}</strong>.
          </div>
        )}
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const q = typeof ctx.query.q === "string" ? ctx.query.q : "";
  const res = await fetch("https://fakestoreapi.com/products");
  const all: Product[] = await res.json();

  const query = q.toLowerCase().trim();
  const filtered = query
    ? all.filter((p) => p.title.toLowerCase().includes(query))
    : all;

  return {
    props: {
      products: filtered,
      query,
      total: all.length,
    },
  };
};
