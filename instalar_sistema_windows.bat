
@echo off
echo Criando ambiente virtual...
python -m venv venv
call venv\Scripts\activate

echo Instalando dependencias do backend...
pip install fastapi uvicorn fpdf pillow

echo Instalando dependencias do frontend...
cd frontend
npm install

echo.
echo ====== TUDO PRONTO ======
echo.
echo Abra dois terminais e execute:
echo.
echo 1. Backend:
echo    call venv\Scripts\activate
echo    uvicorn backend_fastapi:app --reload
echo.
echo 2. Frontend:
echo    cd frontend
echo    npm run dev
echo.
pause
