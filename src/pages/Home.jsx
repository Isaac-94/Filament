// src/pages/Home.jsx
import React from 'react';
import LampCard from '../components/LampCard';
import lamps from '../data/data'; // Importar los datos

const Home = () => {
  return (
    <div className="home">
      <h1>Lámparas Disponibles</h1>
      <div className="lamp-list">
        {lamps.map((lamp) => (
          <LampCard key={lamp.id} lamp={lamp} />
        ))}
      </div>
    </div>
  );
};

export default Home;