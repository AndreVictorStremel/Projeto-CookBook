import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; 

const API_URL = 'http://localhost:8000/receitas/';

function EditPage() {
  
  const { id } = useParams();
  
  
  const [titulo, setTitulo] = useState('');
  const [tempo, setTempo] = useState(0);
  const [ingredientes, setIngredientes] = useState('');
  const [passos, setPassos] = useState('');
  
  const navigate = useNavigate();

  
  useEffect(() => {
    axios.get(`${API_URL}${id}`)
      .then(response => {
        const receita = response.data;
        
        setTitulo(receita.titulo);
        setTempo(receita.tempo_preparo_min);
       
        setIngredientes(receita.ingredientes.map(ing => `${ing.nome}, ${ing.quantidade}`).join('\n'));
        setPassos(receita.passos.join('\n'));
      })
      .catch(error => {
        console.error('Erro ao buscar receita para edição:', error);
        alert('Erro ao carregar dados da receita.');
      });
  }, [id]); 

  
  const handleSubmit = (e) => {
    e.preventDefault();

    const ingredientesArray = ingredientes.split('\n').map(ing => {
      const partes = ing.split(',');
      return { nome: (partes[0] || '').trim(), quantidade: (partes[1] || '').trim() };
    });
    
    const passosArray = passos.split('\n').filter(passo => passo.trim() !== '');

    const receitaAtualizada = {
      titulo: titulo,
      tempo_preparo_min: parseInt(tempo),
      ingredientes: ingredientesArray,
      passos: passosArray
    };

    
    axios.put(`${API_URL}${id}`, receitaAtualizada)
      .then(response => {
       
        navigate(`/receita/${id}`);
      })
      .catch(error => {
        console.error('Erro ao atualizar receita:', error);
        alert('Erro ao atualizar receita.');
      });
  };

  return (
    
    <div>
      <h1>Editar Receita</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '600px', margin: 'auto', backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
        <input type="text" placeholder="Título" value={titulo} onChange={e => setTitulo(e.target.value)} required />
        <input type="number" placeholder="Tempo de Preparo (min)" value={tempo} onChange={e => setTempo(e.target.value)} required />
        <textarea 
          placeholder="Ingredientes (um por linha, ex: Farinha, 2 xícaras)" 
          rows="5" 
          value={ingredientes} 
          onChange={e => setIngredientes(e.target.value)} 
          required 
        />
        <textarea 
          placeholder="Passos (um por linha)" 
          rows="8" 
          value={passos} 
          onChange={e => setPassos(e.target.value)} 
          required 
        />
        <button type="submit" style={{ backgroundColor: '#007bff', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Atualizar Receita</button>
      </form>
    </div>
  );
}

export default EditPage;