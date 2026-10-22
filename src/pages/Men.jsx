import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Search, ShoppingBag, Gem } from "lucide-react";
import "../App.css";

const STORE = "https://www.voylla.com";
const COLLECTION = `${STORE}/collections/the-mens-edit`;

const products = [
  { id: 1, name: "OM Design Rudraksha Studded Pendant With Chain For Men", originalPrice: 449, price: 399, discount: 11, category: "Pendants", handle: "om-design-rudraksha-studded-pendant-with-chain-for-men-vmjai26599" },
  { id: 2, name: "Eclipse Enigmatic Black Dragon Mens Pendant", originalPrice: 799, price: 479, discount: 40, category: "Pendants", handle: "eclipse-enigmatic-black-dragon-mens-pendant-rajai20089" },
  { id: 3, name: "Statement Guardian Blade Vow Mens Pendant", originalPrice: 999, price: 599, discount: 40, category: "Pendants", handle: "statement-guardian-blade-vow-mens-pendant-rajai20139" },
  { id: 4, name: "Statement Valknut Star Gold Oxidised Men's Pendant", originalPrice: 1099, price: 659, discount: 40, category: "Pendants", handle: "statement-valknut-star-gold-oxidised-men-s-pendant-rajai20140" },
  { id: 5, name: "Kings of Rajasthan Yoddharaj Mala Necklace", originalPrice: 3799, price: 2279, discount: 40, category: "Necklaces", handle: "kings-yoddharaj-mala-necklace-vmjai46315" },
  { id: 6, name: "Kings of Rajasthan Rajaro Mala Necklace", originalPrice: 4199, price: 2519, discount: 40, category: "Necklaces", handle: "kings-rajaro-mala-necklace-vmjai46303" },
  { id: 7, name: "Kings of Rajasthan Vajrasen Mala Necklace", originalPrice: 3299, price: 1979, discount: 40, category: "Necklaces", handle: "kings-vajrasen-mala-necklace-vmjai46316" },
  { id: 8, name: "Kings of Rajasthan Chandravar Mala Necklace", originalPrice: 4099, price: 2459, discount: 40, category: "Necklaces", handle: "kings-chandravar-mala-necklace-vmjai46302" },
  { id: 9, name: "Kings of Rajasthan Sisod Mala Necklace", originalPrice: 4949, price: 2969, discount: 40, category: "Necklaces", handle: "kings-sisod-mala-necklace-vmjai46301" },
  { id: 10, name: "Kings of Rajasthan Ranasya Cufflinks", originalPrice: 1299, price: 779, discount: 40, category: "Cufflinks" },
  { id: 11, name: "Kings of Rajasthan Veerang Brooch", originalPrice: 1949, price: 1169, discount: 40, category: "Brooches", handle: "kings-veerang-brooch-vmjai46296" },
  { id: 12, name: "Kings of Rajasthan Adhiraj Brooch", originalPrice: 1199, price: 719, discount: 40, category: "Brooches" },
  { id: 13, name: "Kings of Rajasthan Vajraya Brooch", originalPrice: 899, price: 539, discount: 40, category: "Brooches", handle: "kings-vajraya-brooch-vmjai46313" },
  { id: 14, name: "Kings of Rajasthan Mewarya Brooch", originalPrice: 849, price: 509, discount: 40, category: "Brooches" },
  { id: 15, name: "Kings of Rajasthan Ranasya Cufflinks", originalPrice: 1349, price: 809, discount: 40, category: "Cufflinks" },
  { id: 16, name: "Kings of Rajasthan Merwara Cufflinks", originalPrice: 899, price: 539, discount: 40, category: "Cufflinks" },
  { id: 17, name: "Kings of Rajasthan Suryaveer Brooch", originalPrice: 1149, price: 689, discount: 40, category: "Brooches" },
  { id: 18, name: "Kings of Rajasthan Ravatsar Brooch", originalPrice: 1199, price: 719, discount: 40, category: "Brooches" },
  { id: 19, name: "Kings of Rajasthan Rajveer Brooch", originalPrice: 1149, price: 689, discount: 40, category: "Brooches" },
  { id: 20, name: "Kings of Rajasthan Haritansh Kalangi", originalPrice: 1549, price: 929, discount: 40, category: "Kalangi" },
  { id: 21, name: "Kings of Rajasthan Sarvraj Cufflinks", originalPrice: 1049, price: 629, discount: 40, category: "Cufflinks" },
  { id: 22, name: "Kings of Rajasthan Rajanth Cufflinks", originalPrice: 1099, price: 659, discount: 40, category: "Cufflinks" },
  { id: 23, name: "Kings of Rajasthan Rudraj Brooch", originalPrice: 1449, price: 869, discount: 40, category: "Brooches" },
  { id: 24, name: "Gold Toned 'E' Alphabet Pendant Without Chain", originalPrice: 679, price: 399, discount: 41, category: "Pendants" },
  { id: 25, name: "Kings of Rajasthan Rajaro Mala Necklace", originalPrice: 4199, price: 2519, discount: 40, category: "Necklaces", handle: "kings-rajaro-mala-necklace-vmjai46303" },
];

const categories = ["All", "Pendants", "Necklaces", "Cufflinks", "Brooches", "Kalangi"];
const money = (value) => `₹ ${value.toLocaleString("en-IN")}`;

function ProductImage({ image, name, category }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="men-image-frame">
      {!failed && image ? (
        <img
          className="men-product-image"
          src={image}
          alt={name}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="men-image-fallback">
          <Gem size={42} strokeWidth={1} />
          <span>VOYLLA</span>
          <strong>{category}</strong>
          <small>THE MEN'S EDIT</small>
        </div>
      )}
    </div>
  );
}

export default function Men() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [images, setImages] = useState({});

  useEffect(() => {
    let active = true;

    async function getImage(product) {
      try {
        // First try the exact product page.
        if (product.handle) {
          const response = await fetch(
            `${STORE}/products/${product.handle}.js`
          );

          if (response.ok) {
            const data = await response.json();
            if (data.images?.length) {
              return data.images[0].startsWith("//")
                ? `https:${data.images[0]}`
                : data.images[0];
            }
          }
        }

        // Otherwise search Voylla's public product suggestions by name.
        const params = new URLSearchParams({
          q: product.name,
          "resources[type]": "product",
          "resources[limit]": "5",
          "resources[options][unavailable_products]": "show",
        });

        const response = await fetch(
          `${STORE}/search/suggest.json?${params.toString()}`
        );

        if (!response.ok) return null;

        const data = await response.json();
        const matches = data.resources?.results?.products || [];
        const exact = matches.find(
          (item) =>
            item.title?.trim().toLowerCase() === product.name.trim().toLowerCase()
        );
        const match = exact || matches[0];

        if (match?.image) {
          return match.image.startsWith("//")
            ? `https:${match.image}`
            : match.image;
        }
      } catch {
        // Use the designed fallback if the store doesn't allow the request.
      }

      return null;
    }

    async function loadImages() {
      const results = {};

      await Promise.all(
        products.map(async (product) => {
          const image = await getImage(product);
          if (image) results[product.id] = image;
        })
      );

      if (active) setImages(results);
    }

    loadImages();

    return () => {
      active = false;
    };
  }, []);

  const visibleProducts = useMemo(() => {
    let list = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.trim().toLowerCase());
      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sortBy === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sortBy === "high") list = [...list].sort((a, b) => b.price - a.price);
    if (sortBy === "discount") {
      list = [...list].sort((a, b) => b.discount - a.discount);
    }

    return list;
  }, [search, category, sortBy]);

  return (
    <main className="men-page">
      <style>{`
        .men-page{min-height:100vh;background:#10100f;color:#f5f0e7;font-family:Arial,Helvetica,sans-serif}
        .men-page *{box-sizing:border-box}
        .men-promo{padding:11px;text-align:center;background:#c9a96e;color:#17140e;font-size:11px;font-weight:bold;letter-spacing:2px}
        .men-header{padding:20px 6%;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:22px;border-bottom:1px solid #34312a}
        .men-logo{color:#e3c58b;text-decoration:none;font-size:28px;font-weight:800;letter-spacing:4px}
        .men-logo small{display:block;margin-top:5px;text-align:center;color:#b5aa97;font-size:9px;letter-spacing:4px}
        .men-nav{display:flex;gap:23px;flex-wrap:wrap;align-items:center}
        .men-nav a{color:#e6e0d5;text-decoration:none;font-size:11px;letter-spacing:1px}
        .men-nav a:hover,.men-footer a:hover{color:#d3b276}
        .men-hero{padding:75px 7%;background:radial-gradient(ellipse at 85% 45%,#4d3c24,transparent 35%),linear-gradient(110deg,#171715,#3b3020);border-bottom:1px solid #443a29}
        .men-eyebrow{color:#d8b778;font-size:11px;font-weight:bold;letter-spacing:4px;text-transform:uppercase}
        .men-hero h1{font:400 clamp(38px,5vw,64px)/1.12 Georgia,serif;margin:20px 0}
        .men-hero h1 em{color:#d5b577}
        .men-hero p{color:#c6beb0;font-size:14px;line-height:1.9;max-width:450px}
        .men-button{display:inline-flex;align-items:center;gap:10px;margin-top:18px;padding:14px 20px;background:#d3b276;color:#17130b;text-decoration:none;font-size:11px;font-weight:bold;letter-spacing:1px}
        .men-features{display:grid;grid-template-columns:repeat(3,1fr);border-bottom:1px solid #34312a}
        .men-feature{padding:22px 8px;text-align:center;border-right:1px solid #34312a;color:#c8bda9;font-size:11px}
        .men-feature strong{display:block;color:#dfc38c;margin-bottom:7px}
        .men-section{padding:60px 5% 75px}
        .men-section-heading{display:flex;align-items:end;justify-content:space-between;gap:20px;margin-bottom:30px}
        .men-section-heading h2{margin:12px 0 0;font:400 clamp(30px,4vw,43px) Georgia,serif}
        .men-section-heading p{color:#a9a093;font-size:12px;line-height:1.8}
        .men-toolbar{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:15px;padding:18px 0;margin-bottom:22px;border-block:1px solid #38342c}
        .men-categories,.men-tools{display:flex;gap:8px;flex-wrap:wrap}
        .men-category{padding:10px 13px;background:transparent;color:#c8c0b4;border:1px solid #464036;cursor:pointer;font-size:11px}
        .men-category.active,.men-category:hover{background:#d1b174;color:#17130b;border-color:#d1b174}
        .men-search{display:flex;align-items:center;gap:8px;border:1px solid #464036;padding:10px;color:#d8b778}
        .men-search input{width:170px;border:0;outline:0;background:transparent;color:#f5f0e7}
        .men-search input::placeholder{color:#a9a093}
        .men-sort{padding:10px;background:#171715;color:#e8dfd1;border:1px solid #464036}
        .men-count{margin-bottom:20px;color:#a9a093;font-size:12px}
        .men-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:30px 18px}
        .men-card{min-width:0}
        .men-image-frame{position:relative;overflow:hidden;aspect-ratio:4/4.7;background:#211e18;border:1px solid #51442e}
        .men-product-image{display:block;width:100%;height:100%;object-fit:contain;padding:8px;background:#171613;transition:transform .35s}
        .men-card:hover .men-product-image{transform:scale(1.04)}
        .men-image-fallback{width:100%;height:100%;min-height:220px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;background:radial-gradient(circle,#393021,#171613 70%);color:#d7b879;text-align:center;padding:15px}
        .men-image-fallback span{font:26px Georgia,serif;letter-spacing:5px}
        .men-image-fallback strong{font-size:12px;letter-spacing:2px;text-transform:uppercase}
        .men-image-fallback small{font-size:9px;letter-spacing:3px;color:#b4a58b}
        .men-discount{position:absolute;top:10px;left:10px;padding:7px 9px;background:#d3b276;color:#17130b;font-size:10px;font-weight:bold}
        .men-view{position:absolute;left:10px;right:10px;bottom:10px;display:flex;justify-content:center;align-items:center;gap:7px;padding:12px 5px;background:#10100ff2;border:1px solid #6e5835;color:#ead4a6;text-decoration:none;font-size:10px;letter-spacing:1px;text-transform:uppercase}
        .men-view:hover{background:#d3b276;color:#17130b}
        .men-info{padding:14px 2px 0}
        .men-product-category{color:#c5a66e;font-size:9px;letter-spacing:2px;text-transform:uppercase}
        .men-product-name{display:block;min-height:44px;margin:8px 0;color:#eee5d8;text-decoration:none;font:15px/1.5 Georgia,serif}
        .men-product-name:hover{color:#d8b778}
        .men-prices{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
        .men-sale{color:#e3c58b;font-weight:bold;font-size:14px}
        .men-original{color:#8d8578;font-size:12px;text-decoration:line-through}
        .men-savings{color:#a8c39a;font-size:10px;margin-top:8px}
        .men-empty{grid-column:1/-1;padding:60px 15px;text-align:center;border:1px solid #34312a;color:#c9bda9}
        .men-banner{margin:0 5% 65px;padding:45px 20px;text-align:center;border:1px solid #625035;background:linear-gradient(120deg,#1b1915,#302619)}
        .men-banner h2{margin:12px 0;font:400 32px Georgia,serif;color:#e6cf9f}
        .men-banner p{color:#c5b9a5;font-size:13px;line-height:1.8}
        .men-footer{padding:32px 6%;border-top:1px solid #34312a;display:flex;justify-content:space-between;align-items:center;gap:18px;flex-wrap:wrap;background:#0a0a09;color:#9f9688;font-size:11px}
        .men-footer a{color:#d9bd83;text-decoration:none}
        .men-footer .men-logo{font-size:23px}
        @media(max-width:1000px){.men-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
        @media(max-width:700px){.men-header{flex-direction:column}.men-nav{justify-content:center;gap:14px}.men-hero{padding:55px 7%}.men-feature{font-size:9px}.men-section{padding:42px 4% 55px}.men-section-heading{align-items:flex-start;flex-direction:column}.men-toolbar{align-items:stretch;flex-direction:column}.men-search input{width:100%}.men-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:24px 12px}.men-product-name{font-size:13px}.men-banner h2{font-size:27px}}
        @media(max-width:380px){.men-grid{grid-template-columns:1fr}}
      `}</style>

      <div className="men-promo">THE MEN'S EDIT · TIMELESS STYLE, DISTINCTIVE DETAILS</div>

      <header className="men-header">
        <Link to="/" className="men-logo">VOYLLA<small>THE MEN'S EDIT</small></Link>
        <nav className="men-nav">
          <Link to="/">HOME</Link>
          <Link to="/women">WOMEN</Link>
          <Link to="/men">MEN</Link>
          <a href="#men-products">COLLECTION</a>
          <a href={COLLECTION} target="_blank" rel="noreferrer">VOYLLA STORE <ArrowUpRight size={12} /></a>
        </nav>
      </header>

      <section className="men-hero">
        <div className="men-eyebrow">Jewellery made for him</div>
        <h1>Own Your Style.<br />Wear Your <em>Legacy.</em></h1>
        <p>Discover statement pendants, royal necklaces, distinctive brooches and refined accessories inspired by timeless Indian style.</p>
        <a href="#men-products" className="men-button">Explore Men's Collection <ArrowRight size={16} /></a>
      </section>

      <section className="men-features">
        <div className="men-feature"><strong>01 / STATEMENT</strong>Distinctive Pendants</div>
        <div className="men-feature"><strong>02 / ROYAL</strong>Kings of Rajasthan</div>
        <div className="men-feature"><strong>03 / DETAIL</strong>Brooches & Cufflinks</div>
      </section>

      <section className="men-section" id="men-products">
        <div className="men-section-heading">
          <div><div className="men-eyebrow">Curated for gentlemen</div><h2>The Men's Collection</h2></div>
          <p>Explore the details that define your look.<br />Find your signature piece.</p>
        </div>

        <div className="men-toolbar">
          <div className="men-categories">
            {categories.map((item) => (
              <button key={item} type="button" className={`men-category ${category === item ? "active" : ""}`} onClick={() => setCategory(item)}>{item}</button>
            ))}
          </div>
          <div className="men-tools">
            <label className="men-search"><Search size={15} /><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search men's jewellery" aria-label="Search men's jewellery" /></label>
            <select className="men-sort" value={sortBy} onChange={(event) => setSortBy(event.target.value)} aria-label="Sort products">
              <option value="featured">Featured</option><option value="low">Price: Low to High</option><option value="high">Price: High to Low</option><option value="discount">Biggest Discount</option>
            </select>
          </div>
        </div>

        <div className="men-count">Showing {visibleProducts.length} men's jewellery pieces</div>

        <div className="men-grid">
          {visibleProducts.length ? visibleProducts.map((product) => {
            const productUrl = product.handle ? `${STORE}/products/${product.handle}` : COLLECTION;

            return (
              <article className="men-card" key={product.id}>
                <div className="men-image-frame">
                  <a href={productUrl} target="_blank" rel="noreferrer" aria-label={`View ${product.name}`}>
                    <ProductImage image={images[product.id]} name={product.name} category={product.category} />
                  </a>
                  <span className="men-discount">-{product.discount}%</span>
                  <a className="men-view" href={productUrl} target="_blank" rel="noreferrer">View Product <ArrowUpRight size={13} /></a>
                </div>
                <div className="men-info">
                  <div className="men-product-category">{product.category}</div>
                  <a className="men-product-name" href={productUrl} target="_blank" rel="noreferrer">{product.name}</a>
                  <div className="men-prices"><span className="men-sale">{money(product.price)}</span><span className="men-original">{money(product.originalPrice)}</span></div>
                  <div className="men-savings">Save {money(product.originalPrice - product.price)}</div>
                </div>
              </article>
            );
          }) : (
            <div className="men-empty"><Gem size={30} /><h3>No products found</h3><p>Try another search or category.</p><button className="men-category active" onClick={() => { setSearch(""); setCategory("All"); }}>Show All Products</button></div>
          )}
        </div>
      </section>

      <section className="men-banner">
        <div className="men-eyebrow">The art of gifting</div>
        <h2>Make Every Detail Count</h2>
        <p>From statement pendants to royal accessories, find a piece that feels like you.</p>
        <a className="men-button" href={COLLECTION} target="_blank" rel="noreferrer">Explore Voylla <ShoppingBag size={15} /></a>
      </section>

      <footer className="men-footer">
        <Link to="/" className="men-logo">VOYLLA</Link>
        <span>Men's Jewellery Collection · Black & Gold Edition</span>
        <a href={COLLECTION} target="_blank" rel="noreferrer">Shop official collection <ArrowUpRight size={12} /></a>
      </footer>
    </main>
  );
}
