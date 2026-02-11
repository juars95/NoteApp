#!/bin/bash

echo "🚀 Iniciando el despliegue de la aplicación..."

echo "📦 Levantando base de datos en Docker..."
docker-compose up -d db

echo "⏳ Esperando a que la base de datos esté lista..."
sleep 5

echo "🔧 Configurando el Backend..."
cd backend
npm install
echo "🟢 Iniciando Backend en segundo plano (puerto 3000)..."
npm run start:dev & 
BACKEND_PID=$!

echo "💻 Configurando el Frontend..."
cd ../frontend
npm install
echo "🔵 Iniciando Frontend (puerto 5173)..."
npm run dev &
FRONTEND_PID=$!

trap "kill $BACKEND_PID $FRONTEND_PID; echo '🛑 Aplicación detenida.'; exit" INT

echo "✅ ¡Todo listo!"
echo "👉 Frontend: http://localhost:5173"
echo "👉 Backend API: http://localhost:3000"
echo "Presiona Ctrl+C para detener ambos servidores."

wait