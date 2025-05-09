// src/App.jsx
import React, { useState } from "react";
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import LampARmv from "./components/LampARmv";
import LampAR from "./components/LampAR";
import "./App.css";

const App = () => {
  const [selectedModel, setSelectedModel] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/product/:id"
          element={<ProductDetail setSelectedModel={setSelectedModel} />}
        />
        <Route
          path="/lamp-ar-mv"
          element={<LampARmv modelPath={selectedModel} />}
        />
        <Route path="/lamp-ar" element={<LampAR modelPath={selectedModel} />} />
      </Routes>
    </Router>
  );
};

export default App;
