import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, ArrowLeft } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Elegant Gold-Tone Necklace Set",
    price: 1299,
    oldPrice: 2499,
    category: "Jewellery Sets",
    image:
      "https://www.voylla.com/cdn/shop/files/VMJAI46067_CS_1024x1024_crop_center.jpg?v=1770290044",
    discount: "48% OFF",
  },
  {
    id: 2,
    name: "Traditional Statement Earrings",
    price: 599,
    oldPrice: 999,
    category: "Earrings",
    image:
      "https://www.voylla.com/cdn/shop/files/VMJAI46450_CS_1024x1024_crop_center.jpg?v=1775897931",
    discount: "40% OFF",
  },
  {
    id: 3,
    name: "Classic Designer Ring",
    price: 499,
    oldPrice: 899,
    category: "Rings",
    image:
      "https://www.voylla.com/cdn/shop/files/VMJAI90533_CS_1024x1024_crop_center.jpg?v=1767694052",
    discount: "44% OFF",
  },
  {
    id: 4,
    name: "Statement Bangles",
    price: 899,
    oldPrice: 1499,
    category: "Bangles & Bracelets",
    image:
      "https://www.voylla.com/cdn/shop/files/VMJAI46281_CS_1024x1024_crop_center.jpg?v=1766240143",
    discount: "40% OFF",
  },
  {
    id: 5,
    name: "Elegant Pendant",
    price: 699,
    oldPrice: 1199,
    category: "Pendants",
    image:
      "https://www.voylla.com/cdn/shop/files/VMJAI46041_CS_b961586e-878f-46a4-8274-203501630cf0_1024x1024_crop_center.jpg?v=1739629926",
    discount: "42% OFF",
  },
  {
    id: 6,
    name: "Traditional Mangalsutra",
    price: 799,
    oldPrice: 1299,
    category: "Mangalsutra",
    image:
      "https://www.voylla.com/cdn/shop/files/ChatGPT_Image_Sep_2_2026_04_02_46_PM_1024x1024_crop_center.png?v=1788345187",
    discount: "38% OFF",
  },
  {
    id: 7,
    name: "Silver-Tone Statement Jewellery",
    price: 999,
    oldPrice: 1599,
    category: "Silver Jewellery",
    image:
      "https://www.voylla.com/cdn/shop/files/BDRAJ20010_CS_1024x1024_crop_center.jpg?v=1768459212",
    discount: "38% OFF",
  },
  {
    id: 8,
    name: "Modern Diamond Ring",
    price: 1999,
    oldPrice: 2999,
    category: "Lab Grown Diamonds",
    image:
      "https://www.voylla.com/cdn/shop/files/SSLGD20032_CS_1024x1024_crop_center.jpg?v=1786524367",
    discount: "33% OFF",
  },
];

export default function BestSellers() {
  const [wishlist, setWishlist] = useState([]);
  const [sort, setSort] = useState("popular");

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "low") return a.price - b.price;
    if (sort === "high") return b.price - a.price;
    return a.id - b.id;
  });

  const toggleWishlist = (id) => {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  return (
    <div className="best-sellers-page">
      <style>{`
        .best-sellers-page {
          min-height: 100vh;
          background: #fffdf9;
          color: #29231f;
          font-family: Arial, sans-serif;
        }
        .bs-topbar {
          padding: 14px 6%;
          border-bottom: 1px solid #eee5db;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        }
        .bs-back {
          color: #5c5148;
          text-decoration: none;
          display: flex;
          gap: 7px;
          align-items: center;
          font-size: 14px;
        }
        .bs-logo {
          font-family: Georgia, serif;
          font-size: 29px;
          letter-spacing: 4px;
          color: #9a713d;
          text-decoration: none;
        }
        .bs-bag { color: #5c5148; }
        .bs-hero {
          text-align: center;
          padding: 48px 16px 35px;
          background: linear-gradient(120deg, #f8eee3, #fffaf4, #f4e4d2);
        }
        .bs-eyebrow {
          font-size: 11px;
          letter-spacing: 3px;
          color: #9a713d;
          font-weight: 700;
        }
        .bs-hero h1 {
          font-family: Georgia, serif;
          font-size: clamp(32px, 5vw, 52px);
          font-weight: 400;
          margin: 13px 0;
        }
        .bs-hero p {
          color: #776b61;
          font-size: 14px;
          margin: 0;
        }
        .bs-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          max-width: 1400px;
          margin: auto;
          padding: 24px 5% 15px;
          font-size: 13px;
        }
        .bs-toolbar select {
          border: 1px solid #e5d9cc;
          background: white;
          padding: 10px 12px;
          color: #42382f;
        }
        .bs-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 25px 17px;
          max-width: 1400px;
          padding: 10px 5% 60px;
          margin: auto;
        }
        .bs-product { min-width: 0; }
        .bs-image-wrap {
          position: relative;
          background: #f6f0e9;
          overflow: hidden;
          aspect-ratio: 4 / 5;
        }
        .bs-image-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform .35s ease;
        }
        .bs-product:hover .bs-image-wrap img { transform: scale(1.04); }
        .bs-discount {
          position: absolute;
          left: 10px;
          top: 10px;
          background: #9c302e;
          color: white;
          padding: 6px 8px;
          font-size: 10px;
          letter-spacing: .4px;
        }
        .bs-heart {
          position: absolute;
          right: 10px;
          top: 10px;
          width: 34px;
          height: 34px;
          border: 0;
          border-radius: 50%;
          background: #ffffffed;
          display: grid;
          place-items: center;
          cursor: pointer;
        }
        .bs-category {
          color: #9a713d;
          font-size: 11px;
          margin: 13px 0 6px;
        }
        .bs-name {
          font-size: 14px;
          line-height: 1.5;
          margin: 0 0 9px;
          font-weight: 400;
        }
        .bs-price {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          font-size: 14px;
          font-weight: 700;
        }
        .bs-old {
          color: #9b9188;
          text-decoration: line-through;
          font-size: 12px;
          font-weight: 400;
        }
        .bs-footer {
          text-align: center;
          padding: 28px 16px;
          border-top: 1px solid #eee5db;
          color: #75695e;
          font-size: 12px;
        }
        @media (max-width: 850px) {
          .bs-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        }
        @media (max-width: 560px) {
          .bs-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px 11px; padding-left: 12px; padding-right: 12px; }
          .bs-toolbar { padding-left: 12px; padding-right: 12px; }
          .bs-logo { font-size: 22px; }
          .bs-name { font-size: 12px; }
        }
      `}</style>

      <header className="bs-topbar">
        <Link to="/" className="bs-back">
          <ArrowLeft size={17} /> Home
        </Link>
        <Link to="/" className="bs-logo">VOYLLA</Link>
        <ShoppingBag className="bs-bag" size={21} />
      </header>

      <section className="bs-hero">
        <div className="bs-eyebrow">THE MOST LOVED COLLECTION</div>
        <h1>Our Best Sellers</h1>
        <p>Discover the jewellery everyone is falling in love with.</p>
      </section>

      <div className="bs-toolbar">
        <span>{sortedProducts.length} Products</span>
        <label>
          Sort by{" "}
          <select value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="popular">Featured</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </label>
      </div>

      <main className="bs-grid">
        {sortedProducts.map((product) => (
          <article className="bs-product" key={product.id}>
            <div className="bs-image-wrap">
              <img src={product.image} alt={product.name} loading="lazy" />
              <span className="bs-discount">{product.discount}</span>
              <button
                className="bs-heart"
                onClick={() => toggleWishlist(product.id)}
                aria-label="Toggle wishlist"
              >
                <Heart
                  size={18}
                  fill={wishlist.includes(product.id) ? "#b52c43" : "none"}
                  color={wishlist.includes(product.id) ? "#b52c43" : "#51443b"}
                />
              </button>
            </div>
            <p className="bs-category">{product.category}</p>
            <h2 className="bs-name">{product.name}</h2>
            <div className="bs-price">
              ₹{product.price.toLocaleString("en-IN")}
              <span className="bs-old">
                ₹{product.oldPrice.toLocaleString("en-IN")}
              </span>
            </div>
          </article>
        ))}
      </main>

      <footer className="bs-footer">
        Jewellery for every story · Designed for your own Voylla project
      </footer>
    </div>
  );
}
