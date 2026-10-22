
import { useMemo, useState } from "react";
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  SlidersHorizontal,
  LayoutGrid,
  List,
  Trash2,
} from "lucide-react";
import { products, categories } from "../data/products";
import "../App.css";

const types = [
  "Hoops",
  "Jhumkis",
  "Choker",
  "Engagement Ring",
  "Nose Ring",
  "Borla",
  "Stud",
  "Pendant",
  "Cocktail",
  "Nose Pin",
  "Danglers",
  "Bangles",
  "Bracelet",
];

const looks = [
  "Gold",
  "Silver",
  "Pearl",
  "Kundan",
  "American Diamond",
  "Ethnic",
  "Oxidised",
];

const priceRanges = [
  { label: "0-499", min: 0, max: 499 },
  { label: "500-999", min: 500, max: 999 },
  { label: "1000-1499", min: 1000, max: 1499 },
  { label: "1500-1999", min: 1500, max: 1999 },
  { label: "2000 & above", min: 2000, max: Infinity },
];

const occasions = [
  "Wedding Wear",
  "Party Wear",
  "Daily Wear",
  "Office Wear",
];

const collections = [
  "Navratan",
  "Sparkling Elegance",
  "Korean Bling",
  "Sacred Symbols",
  "Trendy Jewelry",
  "Sparkling Essentials",
  "Noor",
  "Pearl Glow",
];

function getStoredValue(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
}

function FilterSection({ title, options, selected, onSelect, expanded, onToggle, showMore = false }) {
  const [showAll, setShowAll] = useState(false);
  const visibleOptions = showMore && !showAll ? options.slice(0, 10) : options;

  return (
    <section className="women-filter-section">
      <button className="women-filter-heading" onClick={onToggle}>
        <span>{title}</span>
        {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </button>

      {expanded && (
        <div className="women-filter-options">
          {visibleOptions.map((option) => {
            const label = typeof option === "string" ? option : option.label;
            const checked = selected.includes(label);

            return (
              <label className="women-filter-option" key={label}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onSelect(label)}
                />
                <span>{label}</span>
              </label>
            );
          })}

          {showMore && options.length > 10 && (
            <button className="women-show-more" onClick={() => setShowAll((v) => !v)}>
              {showAll ? "Show Less" : "Show More"}
            </button>
          )}
        </div>
      )}
    </section>
  );
}

export default function App() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [pageSize, setPageSize] = useState(24);
  const [view, setView] = useState("grid");
  const [page, setPage] = useState(1);

  const [wishlist, setWishlist] = useState(() => getStoredValue("voylla_wishlist"));
  const [cart, setCart] = useState(() => getStoredValue("voylla_cart"));

  const [notice, setNotice] = useState("");
  const [mobileFilters, setMobileFilters] = useState(false);
  const [showBag, setShowBag] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [openSections, setOpenSections] = useState({
    type: true,
    look: true,
    price: true,
    occasion: true,
    category: true,
    collection: true,
  });

  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedLooks, setSelectedLooks] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedOccasions, setSelectedOccasions] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCollections, setSelectedCollections] = useState([]);

  function notify(message) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2500);
  }

  function toggleSection(key) {
    setOpenSections((current) => ({ ...current, [key]: !current[key] }));
  }

  function toggleFilter(value, setter) {
    setter((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
    setPage(1);
  }

  function toggleWishlist(id) {
    setWishlist((current) => {
      const updated = current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id];

      localStorage.setItem("voylla_wishlist", JSON.stringify(updated));
      notify(updated.includes(id) ? "Added to wishlist" : "Removed from wishlist");
      return updated;
    });
  }

  function addToBag(product) {
    setCart((current) => {
      const updated = [...current, product];
      localStorage.setItem("voylla_cart", JSON.stringify(updated));
      return updated;
    });
    notify("Added to your shopping bag");
  }

  function removeFromBag(index) {
    setCart((current) => {
      const updated = current.filter((_, i) => i !== index);
      localStorage.setItem("voylla_cart", JSON.stringify(updated));
      return updated;
    });
    notify("Removed from shopping bag");
  }

  function clearFilters() {
    setSearch("");
    setSelectedTypes([]);
    setSelectedLooks([]);
    setSelectedPrices([]);
    setSelectedOccasions([]);
    setSelectedCategories([]);
    setSelectedCollections([]);
    setPage(1);
  }

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const query = search.toLowerCase().trim();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.type.toLowerCase().includes(query) ||
          product.look.toLowerCase().includes(query) ||
          product.collection.toLowerCase().includes(query)
      );
    }

    if (selectedTypes.length) {
      result = result.filter((product) =>
        selectedTypes.some((type) =>
          product.type.toLowerCase().includes(type.toLowerCase())
        )
      );
    }

    if (selectedLooks.length) {
      result = result.filter((product) =>
        selectedLooks.includes(product.look)
      );
    }

    if (selectedPrices.length) {
      result = result.filter((product) =>
        selectedPrices.some((label) => {
          const range = priceRanges.find((item) => item.label === label);
          return range && product.price >= range.min && product.price <= range.max;
        })
      );
    }

    if (selectedOccasions.length) {
      result = result.filter((product) =>
        selectedOccasions.includes(product.occasion)
      );
    }

    if (selectedCategories.length) {
      result = result.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    if (selectedCollections.length) {
      result = result.filter((product) =>
        selectedCollections.includes(product.collection)
      );
    }

    if (sort === "low") result.sort((a, b) => a.price - b.price);
    if (sort === "high") result.sort((a, b) => b.price - a.price);
    if (sort === "name") result.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "discount") result.sort((a, b) => b.discount - a.discount);

    return result;
  }, [
    search,
    sort,
    selectedTypes,
    selectedLooks,
    selectedPrices,
    selectedOccasions,
    selectedCategories,
    selectedCollections,
  ]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const wishlistProducts = products.filter((product) => wishlist.includes(product.id));
  const cartTotal = cart.reduce((total, product) => total + product.price, 0);

  const filtersContent = (
    <>
      <div className="women-sidebar-title">
        <h2>Filters</h2>
        <button onClick={clearFilters}>Clear All</button>
      </div>

      <FilterSection
        title="Shop by type"
        options={types}
        selected={selectedTypes}
        onSelect={(v) => toggleFilter(v, setSelectedTypes)}
        expanded={openSections.type}
        onToggle={() => toggleSection("type")}
        showMore
      />

      <FilterSection
        title="Shop by look"
        options={looks}
        selected={selectedLooks}
        onSelect={(v) => toggleFilter(v, setSelectedLooks)}
        expanded={openSections.look}
        onToggle={() => toggleSection("look")}
      />

      <FilterSection
        title="Shop by Price"
        options={priceRanges}
        selected={selectedPrices}
        onSelect={(v) => toggleFilter(v, setSelectedPrices)}
        expanded={openSections.price}
        onToggle={() => toggleSection("price")}
      />

      <FilterSection
        title="Shop by occasion"
        options={occasions}
        selected={selectedOccasions}
        onSelect={(v) => toggleFilter(v, setSelectedOccasions)}
        expanded={openSections.occasion}
        onToggle={() => toggleSection("occasion")}
      />

      <FilterSection
        title="Shop by category"
        options={["Earrings", "Necklace", "Ring", "Nose Ring", "Mangalsutra", "Bangles + Bracelet", "Anklet", "Pendant", "Studs"]}
        selected={selectedCategories}
        onSelect={(v) => toggleFilter(v, setSelectedCategories)}
        expanded={openSections.category}
        onToggle={() => toggleSection("category")}
      />

      <FilterSection
        title="Shop by collection"
        options={collections}
        selected={selectedCollections}
        onSelect={(v) => toggleFilter(v, setSelectedCollections)}
        expanded={openSections.collection}
        onToggle={() => toggleSection("collection")}
      />
    </>
  );

  return (
    <div className="women-shop">
      <div className="women-announcement">
        ✦ JEWELLERY THAT CELEBRATES EVERY YOU ✦
      </div>

      <header className="women-header">
        <button className="women-mobile-filter" onClick={() => setMobileFilters(true)} aria-label="Open filters">
          <Menu size={22} />
        </button>

        <a className="women-logo" href="#">
          voylla<span>.</span>
          <small>JEWELLERY FOR EVERY YOU</small>
        </a>

        <nav className="women-nav">
          <a href="#">Home</a>
          <a className="women-nav-active" href="#women-products">Women</a>
          <a href="#women-products">New Arrivals</a>
          <a href="#women-products">Collections</a>
        </nav>

        <div className="women-header-actions">
          <label className="women-search">
            <Search size={18} />
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search jewellery"
            />
            {search && (
              <button onClick={() => setSearch("")} aria-label="Clear search">
                <X size={15} />
              </button>
            )}
          </label>

          <button className="women-icon-button" onClick={() => setShowWishlist(true)} aria-label="Wishlist">
            <Heart size={21} />
            {wishlist.length > 0 && <span className="women-count">{wishlist.length}</span>}
          </button>

          <button className="women-icon-button" onClick={() => setShowBag(true)} aria-label="Shopping bag">
            <ShoppingBag size={21} />
            {cart.length > 0 && <span className="women-count">{cart.length}</span>}
          </button>
        </div>
      </header>

      <main className="women-main">
        <div className="women-breadcrumb">
          <a href="#">Home</a>
          <ChevronRight size={14} />
          <span>Women</span>
        </div>

        <div className="women-page-title">
          <div>
            <span className="women-kicker">THE WOMEN'S COLLECTION</span>
            <h1>Women <span>Jewellery</span></h1>
            <p>Find the little details that make your look unforgettable.</p>
          </div>
          <div className="women-title-count">{products.length} PRODUCTS</div>
        </div>

        <div className="women-toolbar">
          <button className="women-toolbar-filter" onClick={() => setMobileFilters(true)}>
            <SlidersHorizontal size={17} /> Filters
          </button>

          <div className="women-view-controls">
            <span>View as</span>
            <button className={view === "grid" ? "view-active" : ""} onClick={() => setView("grid")} aria-label="Grid view">
              <LayoutGrid size={18} />
            </button>
            <button className={view === "list" ? "view-active" : ""} onClick={() => setView("list")} aria-label="List view">
              <List size={18} />
            </button>
          </div>

          <label className="women-page-size">
            <span>Items per page</span>
            <select value={pageSize} onChange={(event) => { setPageSize(Number(event.target.value)); setPage(1); }}>
              <option value={12}>12</option>
              <option value={24}>24</option>
              <option value={36}>36</option>
              <option value={48}>48</option>
            </select>
            <ChevronDown size={14} />
          </label>

          <label className="women-sort">
            <span>Sort by</span>
            <select value={sort} onChange={(event) => { setSort(event.target.value); setPage(1); }}>
              <option value="featured">Featured</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="discount">Biggest Discount</option>
              <option value="name">Name: A to Z</option>
            </select>
            <ChevronDown size={14} />
          </label>
        </div>

        <div className="women-layout" id="women-products">
          <aside className="women-sidebar">{filtersContent}</aside>

          <section className="women-results">
            <div className="women-results-summary">
              <span>
                Showing <strong>{displayedProducts.length}</strong> of{" "}
                <strong>{filteredProducts.length}</strong> products
              </span>
              {(selectedTypes.length || selectedLooks.length || selectedPrices.length || selectedOccasions.length || selectedCategories.length || selectedCollections.length || search) > 0 && (
                <button onClick={clearFilters}>Clear filters ×</button>
              )}
            </div>

            {displayedProducts.length === 0 ? (
              <div className="women-empty">
                <Search size={38} />
                <h2>No products found</h2>
                <p>Try changing your search or removing some filters.</p>
                <button onClick={clearFilters}>Clear all filters</button>
              </div>
            ) : (
              <div className={`women-product-grid ${view === "list" ? "women-list-view" : ""}`}>
                {displayedProducts.map((product) => {
                  const wished = wishlist.includes(product.id);

                  return (
                    <article className="women-product-card" key={product.id}>
                      <div className="women-product-image-wrap">
                        <img src={product.image} alt={product.name} loading="lazy" />
                        <span className="women-discount-badge">- {product.discount}%</span>
                        <button
                          className={`women-heart ${wished ? "is-wished" : ""}`}
                          onClick={() => toggleWishlist(product.id)}
                          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
                        >
                          <Heart size={19} fill={wished ? "currentColor" : "none"} />
                        </button>
                        <button className="women-add-button" onClick={() => addToBag(product)}>
                          <ShoppingBag size={15} /> ADD TO BAG
                        </button>
                      </div>

                      <div className="women-product-info">
                        <span className="women-product-collection">{product.collection}</span>
                        <h3>{product.name}</h3>
                        <div className="women-prices">
                          <strong>₹ {product.price.toLocaleString("en-IN")}</strong>
                          <del>₹ {product.originalPrice.toLocaleString("en-IN")}</del>
                        </div>
                        <span className="women-savings">You save ₹ {(product.originalPrice - product.price).toLocaleString("en-IN")}</span>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {filteredProducts.length > pageSize && (
              <div className="women-pagination">
                <button disabled={currentPage === 1} onClick={() => setPage((p) => p - 1)}>
                  Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button disabled={currentPage === totalPages} onClick={() => setPage((p) => p + 1)}>
                  Next
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      {mobileFilters && (
        <div className="women-overlay" onClick={() => setMobileFilters(false)}>
          <aside className="women-mobile-sidebar" onClick={(event) => event.stopPropagation()}>
            <div className="women-mobile-sidebar-header">
              <h2>Shop filters</h2>
              <button onClick={() => setMobileFilters(false)} aria-label="Close filters">
                <X size={22} />
              </button>
            </div>
            {filtersContent}
            <button className="women-apply-filters" onClick={() => setMobileFilters(false)}>
              SHOW {filteredProducts.length} PRODUCTS
            </button>
          </aside>
        </div>
      )}

      {(showBag || showWishlist) && (
        <div className="women-overlay" onClick={() => { setShowBag(false); setShowWishlist(false); }}>
          <aside className="women-drawer" onClick={(event) => event.stopPropagation()}>
            <div className="women-drawer-header">
              <h2>{showBag ? `Shopping Bag (${cart.length})` : `Wishlist (${wishlistProducts.length})`}</h2>
              <button onClick={() => { setShowBag(false); setShowWishlist(false); }} aria-label="Close panel">
                <X size={22} />
              </button>
            </div>

            {showBag && (
              <>
                {cart.length === 0 ? (
                  <p className="women-drawer-empty">Your shopping bag is empty.</p>
                ) : (
                  <div className="women-drawer-items">
                    {cart.map((product, index) => (
                      <div className="women-drawer-item" key={`${product.id}-${index}`}>
                        <img src={product.image} alt={product.name} />
                        <div>
                          <h3>{product.name}</h3>
                          <strong>₹ {product.price.toLocaleString("en-IN")}</strong>
                          <button onClick={() => removeFromBag(index)}><Trash2 size={13} /> Remove</button>
                        </div>
                      </div>
                    ))}
                    <div className="women-drawer-total">
                      <span>Subtotal</span>
                      <strong>₹ {cartTotal.toLocaleString("en-IN")}</strong>
                    </div>
                    <button className="women-checkout" onClick={() => notify("Checkout is a demo feature")}>
                      CHECKOUT
                    </button>
                  </div>
                )}
              </>
            )}

            {showWishlist && (
              <>
                {wishlistProducts.length === 0 ? (
                  <p className="women-drawer-empty">Your wishlist is empty. Tap a heart to save a product.</p>
                ) : (
                  <div className="women-drawer-items">
                    {wishlistProducts.map((product) => (
                      <div className="women-drawer-item" key={product.id}>
                        <img src={product.image} alt={product.name} />
                        <div>
                          <h3>{product.name}</h3>
                          <strong>₹ {product.price.toLocaleString("en-IN")}</strong>
                          <button onClick={() => toggleWishlist(product.id)}><Trash2 size={13} /> Remove</button>
                          <button className="women-wishlist-add" onClick={() => addToBag(product)}>ADD TO BAG</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </aside>
        </div>
      )}

      {notice && <div className="women-toast" role="status">✓ {notice}</div>}
    </div>
  );
}
