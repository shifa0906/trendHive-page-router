// components/Navbar.tsx
import Link from "next/link";
import { useRouter } from "next/router";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const { cart } = useCart();
  const [open, setOpen] = useState(false);

  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container d-flex align-items-center gap-3">
        {/* Brand */}
        <Link href="/" className="navbar-brand fw-bold fs-4">
          TrendHive
        </Link>

        {/* 🔍 Search beside brand */}
        <form
          className="d-flex flex-grow-1"
          role="search"
          action="/products"
          method="get"
          style={{ maxWidth: "400px" }}
        >
          <input
            className="form-control me-2"
            type="search"
            name="q"
            placeholder="Search products..."
          />
        </form>

        {/* Mobile Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setOpen(!open)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Right side – collapsible menu */}
        <div className={`collapse navbar-collapse ${open ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-3">
            {navItems.map((item) => (
              <li key={item.path} className="nav-item">
                <Link
                  href={item.path}
                  className={`nav-link ${
                    router.pathname === item.path ? "active text-warning fw-bold" : ""
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}

            {/* Cart */}
            <li className="nav-item">
              <Link
                href="/cart"
                className={`nav-link d-flex align-items-center gap-1 ${
                  router.pathname === "/cart" ? "active text-warning fw-bold" : ""
                }`}
              >
                Cart{" "}
                <span className="badge bg-primary text-white">{count}</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
