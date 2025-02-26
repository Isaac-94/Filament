// src/components/LampCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const LampCard = ({ lamp }) => {
  return (
    <div className="lamp-card">
      <img src={lamp.image} alt={lamp.name} />
      <h3>{lamp.name}</h3>
      <p>{lamp.description}</p>
      <Link to={`/product/${lamp.id}`}>
        <button>Ver detalles</button>
      </Link>
    </div>
  );
};

export default LampCard;