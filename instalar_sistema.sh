#!/bin/bash
echo "Criando ambiente Python..."
python3 -m venv venv
source venv/bin/activate
pip install fastapi uvicorn fpdf pillow

echo "Instalando dependências do frontend..."
cd frontend
npm install

echo "Pronto! Agora use dois terminais separados:"
echo "1. No backend: source venv/bin/activate && uvicorn backend_fastapi:app --reload"
echo "2. No frontend: cd frontend && npm run dev"
