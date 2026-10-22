
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Women from "./pages/Women.jsx";
import Men from "./pages/Men.jsx";
import BestSellers from "./pages/BestSellers.jsx";
import Precious from "./pages/Precious.jsx";
import Collections from "./pages/Collections.jsx";
import Wedding from "./pages/Wedding.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/women" element={<Women />} />
        <Route path="/men" element={<Men />} />
        <Route path="/bestsellers" element={<BestSellers />} />
        <Route path="/precious" element={<Precious />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/wedding" element={<Wedding />} />
      </Routes>
    </BrowserRouter>
  );
}
