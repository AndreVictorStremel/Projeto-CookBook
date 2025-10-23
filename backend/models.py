from pydantic import BaseModel, Field
from typing import List, Optional


class Ingrediente(BaseModel):
    nome: str
    quantidade: str


class ReceitaCreate(BaseModel):
    titulo: str = Field(..., min_length=3)      
    tempo_preparo_min: int = Field(..., gt=0) 
    ingredientes: List[Ingrediente]           
    passos: List[str]                         


class Receita(ReceitaCreate):
    id: str 


    class Config:
        json_schema_extra = {
            "example": {
                "titulo": "Bolo de Cenoura",
                "tempo_preparo_min": 60,
                "ingredientes": [
                    {"nome": "Cenoura", "quantidade": "3 médias"},
                    {"nome": "Ovo", "quantidade": "4 unidades"}
                ],
                "passos": [
                    "Bater tudo no liquidificador.", 
                    "Assar em forno pré-aquecido."
                ]
            }
        }