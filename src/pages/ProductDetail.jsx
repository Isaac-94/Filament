import React from "react";
import { useParams, Link } from "react-router-dom";
import lamps from "../data/data"; // Importar los datos

const ProductDetail = ({ setSelectedModel }) => {
  const { id } = useParams();
  const lamp = lamps.find((lamp) => lamp.id === parseInt(id));

  if (!lamp) {
    return <div>Lámpara no encontrada</div>;
  }

  const handleViewAR = () => {
    setSelectedModel(lamp.model); // Pasar la ruta correcta del modelo
  };

  return (
    <div className="product-container">
      <div className="product-detail">
        <h1>{lamp.name}</h1>
        <p>{lamp.description}</p>
        <img src={lamp.image} alt={lamp.name} />

        {/* Botón para model-viewer */}
        <div className="button-container">
          <Link to="/lamp-ar-mv" onClick={handleViewAR}>
            <button>Ver en mi mesa</button>
          </Link>

          {/* Botón para AR.js */}
          <Link to="/lamp-ar" onClick={handleViewAR}>
            <button>Dispositivo no compatible?</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
