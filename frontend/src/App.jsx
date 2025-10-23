import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/Homepage';
import CreatePage from './pages/CreatePage';
import DetailPage from './pages/DetailPage';
import EditPage from './pages/EditPage'; 

function App() {
  return (
    <BrowserRouter>
      <div className="container mt-4"> 
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 p-3 rounded shadow-sm">
          <Link className="navbar-brand" to="/">CookBook</Link>
          <div className="navbar-nav">
            <Link className="nav-item nav-link" to="/">Ver Receitas</Link>
            <Link className="nav-item nav-link" to="/criar">Adicionar Receita</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/criar" element={<CreatePage />} />
          <Route path="/receita/:id" element={<DetailPage />} />
          <Route path="/editar/:id" element={<EditPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
