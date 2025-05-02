PASSO A PASSO - COMO RODAR O SISTEMA DE PLANO DE CORTE

1. Baixe e descompacte esse arquivo .zip

2. Abra o Terminal (Linux ou Mac) ou Prompt de Comando (no Windows via Git Bash)

3. Rode:
   ./instalar_sistema.sh

Isso vai:
- Criar ambiente Python
- Instalar FastAPI, Pillow, FPDF
- Instalar dependências do frontend

4. Em dois terminais separados:
   # TERMINAL 1 - rodar backend:
   source venv/bin/activate
   uvicorn backend_fastapi:app --reload

   # TERMINAL 2 - rodar frontend:
   cd frontend
   npm run dev

5. Acesse no navegador:
   http://localhost:3000

⚠️ Se estiver no Windows e der erro no instalador, rode os comandos manualmente do arquivo README.
