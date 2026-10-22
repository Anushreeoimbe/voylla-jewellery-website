
import { Link } from "react-router-dom";
import {
  Search,
  UserRound,
  Heart,
  ShoppingBag,
  ArrowRight,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

import "./Home.css";

const nav = [
  { label: "Women", url: "/women" },
  { label: "Men", url: "/men" },
  { label: "Best Sellers", url: "/bestsellers" },
  { label: "Voylla Precious", url: "/precious", badge: "NEW" },
  { label: "Collections", url: "/collections" },
  { label: "Wedding", url: "/wedding" },
];

const banners = [
  {
    eyebrow: "TIMELESS CRAFT · MODERN STORIES",
    title: "Pillars of Time",
    subtitle: "Tradition reimagined in beautiful jewellery.",
    button: "EXPLORE NOW",
    url: "/collections",
    image:
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1800&q=85",
  },
  {
    eyebrow: "VOYLLA PRECIOUS",
    title: "A Brighter Kind of Forever",
    subtitle: "Discover the beauty of lab grown diamonds.",
    button: "DISCOVER PRECIOUS",
    url: "/precious",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1800&q=85",
  },
  {
    eyebrow: "FOR YOUR FOREVER MOMENTS",
    title: "The Wedding Edit",
    subtitle: "Jewellery made for unforgettable celebrations.",
    button: "SHOP WEDDING",
    url: "/wedding",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1800&q=85",
  },
];

const categories = [
  {
    name: "Jewellery Sets",
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=600&q=80",
    url: "/women",
  },
  {
    name: "Earrings",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80",
    url: "/women",
  },
  {
    name: "Necklaces",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
    url: "/women",
  },
  {
    name: "Rings",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80",
    url: "/women",
  },
  {
    name: "Bangles",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=600&q=80",
    url: "/women",
  },
  {
    name: "Men's Jewellery",
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=600&q=80",
    url: "/men",
  },
];

const products = [
  {
    name: "Sparkling Elegance Earrings",
    price: "899",
    oldPrice: "1,499",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=700&q=80",
    label: "BESTSELLER",
  },
  {
    name: "Classic Gold Necklace",
    price: "1,299",
    oldPrice: "1,999",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=700&q=80",
    label: "TRENDING",
  },
  {
    name: "Elegant Statement Ring",
    price: "799",
    oldPrice: "1,299",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=700&q=80",
    label: "NEW",
  },
  {
    name: "Traditional Jewellery",
    price: "1,599",
    oldPrice: "2,499",
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=700&q=80",
    label: "FAVOURITE",
  },
];

function LocalOrExternalLink({
  href,
  className,
  children,
  onClick,
}) {
  if (href && href.startsWith("/")) {
    return (
      <Link to={href} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  );
}

export default function Home() {
  const [activeBanner, setActiveBanner] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const banner = banners[activeBanner];

  return (
    <div className="voylla-home">
      <div className="announcement">
        DISCOVER SOMETHING BEAUTIFUL · SHOP YOUR FAVOURITES
      </div>

      <header className="home-header">
        <button
          className="mobile-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <Link to="/" className="home-logo">
          voylla
        </Link>

        <nav className="desktop-nav">
          {nav.map((item) => (
            <LocalOrExternalLink
              key={item.label}
              href={item.url}
              className="nav-link"
            >
              {item.label}
              {item.badge && (
                <span className="new-badge">{item.badge}</span>
              )}
            </LocalOrExternalLink>
          ))}
        </nav>

        <div className="header-actions">
          <button aria-label="Search"><Search size={19} /></button>
          <button aria-label="Account"><UserRound size={19} /></button>
          <button aria-label="Wishlist"><Heart size={19} /></button>
          <button aria-label="Shopping bag"><ShoppingBag size={19} /></button>
        </div>
      </header>

      {menuOpen && (
        <nav className="mobile-nav">
          {nav.map((item) => (
            <LocalOrExternalLink
              key={item.label}
              href={item.url}
              className="mobile-nav-link"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
              {item.badge && (
                <span className="new-badge">{item.badge}</span>
              )}
            </LocalOrExternalLink>
          ))}
        </nav>
      )}

      <main>
        <section className="home-hero">
          <img
            className="hero-image"
            src={banner.image}
            alt={banner.title}
          />
          <div className="hero-shade" />

          <div className="hero-content">
            <p className="hero-eyebrow">{banner.eyebrow}</p>
            <h1>{banner.title}</h1>
            <p className="hero-subtitle">{banner.subtitle}</p>
            <Link to={banner.url} className="hero-button">
              {banner.button}
              <ArrowRight size={16} />
            </Link>
          </div>

          <button
            className="hero-arrow hero-prev"
            aria-label="Previous banner"
            onClick={() =>
              setActiveBanner(
                (activeBanner - 1 + banners.length) % banners.length
              )
            }
          >
            ‹
          </button>

          <button
            className="hero-arrow hero-next"
            aria-label="Next banner"
            onClick={() =>
              setActiveBanner((activeBanner + 1) % banners.length)
            }
          >
            ›
          </button>

          <div className="hero-dots">
            {banners.map((item, index) => (
              <button
                key={item.title}
                aria-label={`Show ${item.title}`}
                className={activeBanner === index ? "active" : ""}
                onClick={() => setActiveBanner(index)}
              />
            ))}
          </div>
        </section>

        <section className="shop-category section-spacing">
          <div className="section-heading">
            <p>CURATED FOR YOU</p>
            <h2>Find Your Favourite</h2>
            <span>Little details. Beautiful stories.</span>
          </div>

          <div className="category-grid">
            {categories.map((category) => (
              <Link
                to={category.url}
                className="category-card"
                key={category.name}
              >
                <div className="category-image-wrap">
                  <img src={category.image} alt={category.name} />
                </div>
                <h3>
                  {category.name}
                  <ChevronRight size={15} />
                </h3>
              </Link>
            ))}
          </div>
        </section>

        <section className="precious-feature">
          <div className="precious-image">
            <img
              src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85"
              alt="Fine jewellery"
            />
          </div>
          <div className="precious-copy">
            <p>INTRODUCING VOYLLA PRECIOUS</p>
            <h2>For a Love That Lasts Forever</h2>
            <span>
              Explore timeless designs and discover a special kind of sparkle.
            </span>
            <Link to="/precious" className="outline-button">
              EXPLORE VOYLLA PRECIOUS <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        <section className="popular-products section-spacing">
          <div className="section-heading">
            <p>DISCOVER YOUR NEXT FAVOURITE</p>
            <h2>Popular Picks</h2>
            <span>Jewellery you'll love wearing, every day.</span>
          </div>

          <div className="product-grid">
            {products.map((product) => (
              <Link
                to="/bestsellers"
                className="home-product"
                key={product.name}
              >
                <div className="product-image-wrap">
                  <img src={product.image} alt={product.name} />
                  <span className="product-label">{product.label}</span>
                  <span className="product-heart">
                    <Heart size={17} />
                  </span>
                </div>
                <h3>{product.name}</h3>
                <div className="product-prices">
                  <strong>₹{product.price}</strong>
                  <del>₹{product.oldPrice}</del>
                </div>
              </Link>
            ))}
          </div>

          <div className="center-button">
            <Link to="/bestsellers" className="outline-button">
              VIEW BEST SELLERS <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        <section className="wedding-feature">
          <img
            src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1800&q=85"
            alt="Wedding jewellery collection"
          />
          <div className="wedding-copy">
            <p>MADE FOR YOUR SPECIAL DAY</p>
            <h2>Your Story. Your Sparkle.</h2>
            <span>Celebrate every unforgettable moment.</span>
            <Link to="/wedding" className="hero-button">
              DISCOVER WEDDING <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        <section className="collections-cta section-spacing">
          <div className="section-heading">
            <p>EXPLORE OUR WORLD</p>
            <h2>Jewellery for Every Story</h2>
            <span>Find something beautiful for every occasion.</span>
          </div>
          <div className="collection-links">
            <Link to="/precious">
              <span>01</span>
              <strong>Voylla Precious</strong>
              <ArrowRight size={18} />
            </Link>
            <Link to="/collections">
              <span>02</span>
              <strong>Explore Collections</strong>
              <ArrowRight size={18} />
            </Link>
            <Link to="/wedding">
              <span>03</span>
              <strong>The Wedding Edit</strong>
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">voylla</Link>
            <p>Jewellery for every story.</p>
          </div>

          <div className="footer-column">
            <h3>SHOP</h3>
            <Link to="/women">Women</Link>
            <Link to="/men">Men</Link>
            <Link to="/bestsellers">Best Sellers</Link>
          </div>

          <div className="footer-column">
            <h3>DISCOVER</h3>
            <Link to="/precious">Voylla Precious</Link>
            <Link to="/collections">Collections</Link>
            <Link to="/wedding">Wedding</Link>
          </div>

          <div className="footer-column">
            <h3>YOUR VOYLLA</h3>
            <a href="#top">About Us</a>
            <a href="#top">Contact</a>
            <a href="#top">Help & Support</a>
          </div>
        </div>

        <div className="footer-bottom">
          © 2026 Voylla-inspired Jewellery Store
        </div>
      </footer>
    </div>
  );
}
