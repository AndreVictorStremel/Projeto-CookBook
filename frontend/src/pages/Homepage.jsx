import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL = 'http://localhost:8000/receitas/';

function HomePage() {
  const [receitas, setReceitas] = useState([]);

  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        setReceitas(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar receitas:', error);
      });
  }, []);

  return (
    <div>
      <h1 className="mb-4">Suas Receitas</h1>
      
      <div className="row">
        {receitas.map(receita => (
          
          <div className="col-md-4 mb-4" key={receita.id}>
            
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">{receita.titulo}</h5>
                <p className="card-text">Tempo: {receita.tempo_preparo_min} min</p>
                <Link to={`/receita/${receita.id}`} className="btn btn-primary">
                  Ver Detalhes
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;