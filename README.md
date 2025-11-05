# CookBook - Livro de Receitas Full-Stack

Projeto de portfólio que implementa um CRUD (Create, Read, Update, Delete) completo para um livro de receitas.

## Tecnologias Utilizadas

### Backend 
* **Python 3.13**
* **FastAPI:** Para a criação da API RESTful.
* **MongoDB Atlas:** Banco de dados NoSQL na nuvem.
* **Motor:** Driver assíncrono para comunicação com o MongoDB.
* **Pydantic:** Para validação de dados.
* **Uvicorn:** Servidor ASGI.

### Frontend 
* **React.js (Vite):** Biblioteca para a interface do usuário.
* **React Router v6:** Para gerenciamento de rotas.
* **Bootstrap 5:** Framework CSS para estilização rápida e responsiva.
* **Axios:** Cliente HTTP para comunicação com a API.

---

## Funcionalidades
* Listagem de todas as receitas.
* Criação de novas receitas através de um formulário.
* Visualização de detalhes de uma receita específica.
* Edição de receitas existentes.
* Deleção de receitas (com confirmação).

---

## Como Rodar o Projeto

**Pré-requisitos:** Python 3.13+, Node.js v18+ e uma conta no MongoDB Atlas.

### 1. Backend ###

# Clone o repositório
git clone [https://github.com/AndreVictorStremel/Projeto-CookBook.git]
cd CookBook/backend

# Crie o ambiente virtual
python -m venv venv
.\venv\Scripts\activate

# Instale as dependências
pip install -r requirements.txt 

## 🏛️ Arquitetura da API (Backend)

O backend é uma API RESTful construída com FastAPI, expondo os seguintes endpoints:

| Método HTTP | Rota                | Descrição                                 |
| :---------- | :------------------ | :---------------------------------------- |
| `POST`      | `/receitas/`        | Cria uma nova receita.                    |
| `GET`       | `/receitas/`        | Lista todas as receitas.                  |
| `GET`       | `/receitas/{id}`    | Obtém os detalhes de uma receita.         |
| `PUT`       | `/receitas/{id}`    | Atualiza uma receita existente.           |
| `DELETE`    | `/receitas/{id}`    | Deleta uma receita.                       |

### 2. Frontend ###

# Em um novo terminal, vá para a pasta frontend
cd CookBook/frontend

# Instale as dependências
npm install

# Rode o servidor de desenvolvimento
npm run dev
# O frontend estará em http://localhost:5173

Obs: É necessário criar um arquivo .env na pasta backend com a sua MONGO_URI do Atlas.

MONGO_URI=mongodb+srv://...

### ScreenShots ###

<img width="1914" height="488" alt="Captura de tela 2025-10-23 035935" src="https://github.com/user-attachments/assets/c043736f-6fcd-4456-bb24-aee8a70b4b55" />

<img width="1053" height="876" alt="Captura de tela 2025-10-23 035854" src="https://github.com/user-attachments/assets/a5463ed3-c693-4892-89ae-9f853357f122" />
