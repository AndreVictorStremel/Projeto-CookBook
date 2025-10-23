from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from bson import ObjectId # Importante: Para converter o ID do MongoDB
from database import collection 
from models import ReceitaCreate, Receita 

app = FastAPI()

origins = [
    "http://localhost:3000", 
    "http://localhost:5173", 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)


#Endpoints 


@app.post("/receitas/", response_model=Receita, status_code=status.HTTP_201_CREATED)
async def create_receita(receita: ReceitaCreate):
    
    receita_dict = receita.dict()
    
    resultado = await collection.insert_one(receita_dict)
    
    receita_criada = Receita(**receita_dict, id=str(resultado.inserted_id))
    
    return receita_criada

@app.get("/receitas/", response_model=List[Receita])
async def list_receitas():
    receitas_cursor = collection.find()
    receitas = []
    
    
    async for receita_db in receitas_cursor:
    
        receitas.append(Receita(**receita_db, id=str(receita_db["_id"])))
        
    return receitas

@app.get("/receitas/{id}", response_model=Receita)
async def get_receita(id: str):
    # O ID no MongoDB é um objeto especial, não uma string simples
    
    try:
        oid = ObjectId(id)
    except Exception:
        
        raise HTTPException(status_code=400, detail="ID de receita inválido")

    receita_db = await collection.find_one({"_id": oid})
    
    if receita_db is None:
        
        raise HTTPException(status_code=404, detail="Receita não encontrada")
    
   
    return Receita(**receita_db, id=str(receita_db["_id"])) 


@app.put("/receitas/{id}", response_model=Receita)
async def update_receita(id: str, receita: ReceitaCreate):
    # Converte o ID para ObjectId
    try:
        oid = ObjectId(id)
    except Exception:
        raise HTTPException(status_code=400, detail="ID de receita inválido")
    
    # Converte o Pydantic model para um dicionário
    receita_dict = receita.dict()
    
    # Executa o update no MongoDB
    
    resultado = await collection.update_one({"_id": oid}, {"$set": receita_dict})
    
    
    if resultado.modified_count == 0:
        
        if await collection.count_documents({"_id": oid}) == 0:
            raise HTTPException(status_code=404, detail="Receita não encontrada")
        
        
    
    return Receita(**receita_dict, id=id)


@app.delete("/receitas/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_receita(id: str):
   
    try:
        oid = ObjectId(id)
    except Exception:
        raise HTTPException(status_code=400, detail="ID de receita inválido")

    resultado = await collection.delete_one({"_id": oid})
    
    if resultado.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Receita não encontrada")
    
    return
