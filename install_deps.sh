#!/bin/bash

echo "Configurando entorno virtual del backend..."
cd backend

# Crear entorno virtual si no existe
if [ ! -d ".venv" ]; then
    echo "Creando entorno virtual..."
    python -m venv .venv
fi

# Activar entorno virtual
echo "Activando entorno virtual..."
source .venv/Scripts/activate

# Instalar dependencias
echo "Instalando dependencias..."
pip install -r requirements.txt
pip install httpx

echo "¡Instalación del backend completada!"
echo "Para activar el entorno virtual en el futuro, ejecuta:"
echo "cd backend && source .venv/Scripts/activate"
