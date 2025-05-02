from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import uuid
from datetime import datetime
import os

# MOCK: substitua por import real da lógica se estiver usando
from plano_corte_engine import gerar_pdf_plano_corte, gerar_pdf_etiquetas
    with open(path, "wb") as f:
        f.write(b"%PDF-1.4 plano gerado")

from plano_corte_engine import gerar_pdf_plano_corte, gerar_pdf_etiquetas
    with open(path, "wb") as f:
        f.write(b"%PDF-1.4 etiquetas geradas")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

class Peca(BaseModel):
    nome: str
    largura: int
    altura: int
    fita_borda: List[bool]
    veio: str
    fitaTipo: str
    chapa: str

class ProjetoRequest(BaseModel):
    cliente: str
    pecas: List[Peca]

@app.post("/api/gerar-plano")
def gerar_plano(req: ProjetoRequest):
    projeto_id = str(uuid.uuid4())[:8]
    pasta = f"/tmp/{projeto_id}"
    os.makedirs(pasta, exist_ok=True)

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    plano_path = os.path.join(pasta, f"plano_{timestamp}.pdf")
    etiquetas_path = os.path.join(pasta, f"etiquetas_{timestamp}.pdf")

    pecas_expandidas = []
    for p in req.pecas:
        pecas_expandidas.append({
            "nome": p.nome,
            "largura": p.largura,
            "altura": p.altura,
            "fita_borda": p.fita_borda,
            "sentido_veio": p.veio,
            "chapa": p.chapa
        })

    gerar_pdf_plano_corte(pecas_expandidas, req.cliente, plano_path)
    gerar_pdf_etiquetas(pecas_expandidas, req.cliente, etiquetas_path)

    return {
        "status": "ok",
        "plano_pdf_url": f"/api/download/{projeto_id}/plano",
        "etiquetas_pdf_url": f"/api/download/{projeto_id}/etiquetas"
    }

@app.get("/api/download/{projeto_id}/{tipo}")
def download(projeto_id: str, tipo: str):
    pasta = f"/tmp/{projeto_id}"
    arquivos = os.listdir(pasta) if os.path.exists(pasta) else []
    for nome in arquivos:
        if tipo in nome:
            return FileResponse(os.path.join(pasta, nome), filename=nome)
    raise HTTPException(status_code=404, detail="Arquivo não encontrado")
