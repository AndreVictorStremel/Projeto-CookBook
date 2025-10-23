import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:8000/receitas/';

function CreatePage() {
  const [titulo, setTitulo] = useState('');
  const [tempo, setTempo] = useState(0);
  const [ingredientes, setIngredientes] = useState('');
  const [passos, setPassos] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const ingredientesArray = ingredientes.split('\n').map(ing => {
      const partes = ing.split(',');
      return { nome: (partes[0] || '').trim(), quantidade: (partes[1] || '').trim() };
    });
    
    const passosArray = passos.split('\n').filter(passo => passo.trim() !== '');

    const novaReceita = {
      titulo: titulo,
      tempo_preparo_min: parseInt(tempo),
      ingredientes: ingredientesArray,
      passos: passosArray
    };

    axios.post(API_URL, novaReceita)
      .then(response => {
        navigate('/');
      })
      .catch(error => {
        console.error('Erro ao criar receita:', error);
        alert('Erro ao criar receita. Verifique o console.');
      });
  };

  return (
    
    <div className="card shadow-sm">
      <div className="card-body">
        <h1 className="card-title mb-4">Adicionar Nova Receita</h1>
        <form onSubmit={handleSubmit}>
          
          <div className="mb-3">
            <label htmlFor="titulo" className="form-label">Título</label>
            <input 
              type="text" 
              className="form-control" 
              id="titulo"
              value={titulo} onChange={e => setTitulo(e.target.value)} required 
            />
          </div>

          <div className="mb-3">
            <label htmlFor="tempo" className="form-label">Tempo de Preparo (min)</label>
            <input 
              type="number" 
              className="form-control" 
              id="tempo"
              value={tempo} onChange={e => setTempo(e.target.value)} required 
            />
          </div>

          <div className="mb-3">
            <label htmlFor="ingredientes" className="form-label">Ingredientes (um por linha, ex: Farinha, 2 xícaras)</label>
            <textarea 
              className="form-control" 
              id="ingredientes"
              rows="5" 
              value={ingredientes} 
              onChange={e => setIngredientes(e.target.value)} 
              required 
            />
          </div>

          <div className="mb-3">
            <label htmlFor="passos" className="form-label">Passos (um por linha)</label>
            <textarea 
              className="form-control" 
              id="passos"
              rows="8" 
              value={passos} 
              onChange={e => setPassos(e.target.value)} 
              required 
            />
          </div>
          
          <button type="submit" className="btn btn-success">Salvar Receita</button>
        </form>
      </div>
    </div>
  );
}

export default CreatePage;