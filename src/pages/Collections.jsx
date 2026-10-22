
import React from "react";
import CollectionPage from "./CollectionPage.jsx";

const products = [
  {
    name: "Earrings Collection",
    price: "Discover the styles",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Necklace Collection",
    price: "Discover the styles",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Bracelet Collection",
    price: "Discover the styles",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Statement Rings",
    price: "Discover the styles",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=700&q=80",
  },
];

export default function Collections() {
  return (
    <CollectionPage
      title="Explore Our Collections"
      subtitle="Find jewellery for every mood, moment and occasion"
      image="https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1800&q=85"
      products={products}
    />
  );
}
