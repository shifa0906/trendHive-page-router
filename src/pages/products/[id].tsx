// pages/products/[id].tsx
import { GetServerSideProps } from "next";
import { Product } from "../../types";
import ProductDetail from "../../components/ProductDetail";

interface Props {
  product: Product;
}

export default function ProductDetailPage({ product }: Props) {
  return <ProductDetail product={product} />;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.params?.id as string;
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) {
    return { notFound: true };
  }
  const product: Product = await res.json();
  return { props: { product } };
};
