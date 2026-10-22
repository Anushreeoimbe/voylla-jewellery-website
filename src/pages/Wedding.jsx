
import React from "react";
import CollectionPage from "./CollectionPage.jsx";

const products = [
  {
    name: "Bridal Necklace",
    price: "Explore bridal jewellery",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Wedding Earrings",
    price: "Explore bridal jewellery",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Traditional Jewellery",
    price: "Explore bridal jewellery",
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Wedding Statement Pieces",
    price: "Explore bridal jewellery",
    image:
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=700&q=80",
  },
];

export default function Wedding() {
  return (
    <CollectionPage
      title="The Wedding Store"
      subtitle="Jewellery for your most unforgettable celebrations"
      image="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=85"
      products={products}
    />
  );
}
