import pytest
from fastapi.testclient import TestClient
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))
from backend.main import app

client = TestClient(app)

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    # Puedes ajustar el contenido esperado según tu API
    # assert response.json() == {"message": "Bienvenido a Salvida"}

def test_users_endpoint():
    response = client.get("/users/")
    assert response.status_code in [200, 401, 403, 404]  # Depende de la protección del endpoint

# Ejemplo de registro de usuario (ajusta los campos según tu modelo)
def test_register_user():
    import uuid
    unique_id = str(uuid.uuid4())[:8]
    data = {
        "id": f"testuser_{unique_id}",
        "personal_id": f"9999{unique_id}Z",
        "name": "Test User",
        "address": "Calle Falsa 123",
        "location": "Madrid",
        "billing_address": "Calle Falsa 123",
        "country_code": "ES",
        "phone": "600123456",
        "email": f"testuser_{unique_id}@example.com",
        "avatar": "",
        "role": "user"
    }
    response = client.post("/users/", json=data)
    assert response.status_code in [200, 201, 400]

# Ejemplo de login (ajusta endpoint y campos si es necesario)
def test_login():
    data = {
        "username": "juan@example.com",
        "password": "secret"
    }
    response = client.post("/auth/login", data=data)
    assert response.status_code in [200, 400, 401]
    if response.status_code == 200:
        assert "access_token" in response.json()

# Puedes agregar más pruebas para bookings, prms, etc.
