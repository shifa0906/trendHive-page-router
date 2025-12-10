// pages/_app.tsx
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import { CartProvider } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Navbar />
      <main className="container my-4">
        <Component {...pageProps} />
      </main>
      <Footer />
    </CartProvider>
  );
}
