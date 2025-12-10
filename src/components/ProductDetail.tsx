// components/ProductDetail.tsx
import { Product } from "../types";
import { useCart } from "../context/CartContext";

export default function ProductDetail({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div className="row">
      <div className="col-md-6">
        <img
          src={product.image}
          className="img-fluid p-3"
          style={{ maxHeight: "400px", objectFit: "contain" }}
          alt={product.title}
        />
      </div>
      <div className="col-md-6">
        <h2>{product.title}</h2>
        <p className="text-muted">{product.category}</p>
        <p>{product.description}</p>
        <h4 className="mb-3">${product.price.toFixed(2)}</h4>
        <button
          className="btn btn-success"
          onClick={() =>
            addToCart({
              id: product.id,
              title: product.title,
              price: product.price,
              image: product.image,
              quantity: 1,
            })
          }
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
