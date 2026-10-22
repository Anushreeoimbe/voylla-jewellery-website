
import React from "react";
import { Link } from "react-router-dom";
import "./CollectionPage.css";

export default function CollectionPage({
  title,
  subtitle,
  image,
  products = [],
}) {
  return (
    <main className="collection-page">
      <header className="collection-header">
        <Link to="/" className="collection-logo">
          voylla
        </Link>

        <nav className="collection-nav">
          <Link to="/">Home</Link>
          <Link to="/women">Women</Link>
          <Link to="/men">Men</Link>
          <Link to="/bestsellers">Best Sellers</Link>
          <Link to="/precious">Voylla Precious</Link>
          <Link to="/collections">Collections</Link>
          <Link to="/wedding">Wedding</Link>
        </nav>
      </header>

      <section className="collection-hero">
        <img src={image} alt={title} />
        <div className="collection-hero-overlay">
          <p>DISCOVER SOMETHING BEAUTIFUL</p>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </section>

      <section className="collection-products">
        <p className="collection-eyebrow">MADE FOR EVERY STORY</p>
        <h2>Explore {title}</h2>

        {products.length > 0 ? (
          <div className="collection-product-grid">
            {products.map((product, index) => (
              <article className="collection-product" key={index}>
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.price}</p>
              </article>
            ))}
          </div>
        ) : (
          <p className="collection-empty">
            Beautiful jewellery is coming soon.
          </p>
        )}
      </section>

      <footer className="collection-footer">
        <Link to="/">← Back to Home</Link>
        <p>Voylla — Jewellery for Every Story</p>
      </footer>
    </main>
  );
}
