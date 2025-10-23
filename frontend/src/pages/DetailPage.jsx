import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:8000/receitas/';

function DetailPage() {
  const [receita, setReceita] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_URL}${id}`)
      .then(response => {
        setReceita(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar detalhes da receita:', error);
      });
  }, [id]);

  const handleDelete = () => {
    if (window.confirm("Tem certeza que deseja deletar esta receita?")) {
      axios.delete(`${API_URL}${id}`)
        .then(response => {
          navigate('/');
        })
        .catch(error => {
          console.error('Erro ao deletar receita:', error);
          alert('Não foi possível deletar a receita.');
        });
    }
  };

  if (!receita) {
    return <div className="text-center">Carregando...</div>;
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body p-4">
        <h1 className="card-title">{receita.titulo}</h1>
        <p className="card-subtitle mb-2 text-muted">
          <strong>Tempo de Preparo:</strong> {receita.tempo_preparo_min} minutos
        </p>
        
        <hr />

        <h3 className="mt-4">Ingredientes:</h3>
        <ul className="list-group list-group-flush">
          {receita.ingredientes.map((ing, index) => (
            <li key={index} className="list-group-item ps-0">
              {ing.nome} - {ing.quantidade}
            </li>
          ))}
        </ul>
        
        <h3 className="mt-4">Passos:</h3>
        <ol className="list-group list-group-numbered">
          {receita.passos.map((passo, index) => (
            <li key={index} className="list-group-item">{passo}</li>
          ))}
        </ol>

        <hr className="my-4" />

        <div className="d-flex gap-2">
          <Link 
            to={`/editar/${receita.id}`} 
            className="btn btn-primary flex-grow-1"
          >
            Editar Receita
          </Link>
          <button 
            onClick={handleDelete} 
            className="btn btn-danger flex-grow-1"
          >
            Deletar Receita
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;