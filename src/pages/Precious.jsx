
import React from "react";
import CollectionPage from "./CollectionPage.jsx";

const products = [
  {
    name: "Elegant Diamond Pendant",
    price: "Explore the collection",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Classic Gold Necklace",
    price: "Explore the collection",
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Timeless Earrings",
    price: "Explore the collection",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Statement Jewellery",
    price: "Explore the collection",
    image:
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=700&q=80",
  },
];

export default function Precious() {
  return (
    <CollectionPage
      title="Voylla Precious"
      subtitle="Discover timeless elegance and precious designs"
      image="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1800&q=85"
      products={products}
    />
  );
}
