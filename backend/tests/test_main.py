from fastapi.testclient import TestClient
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def _get_token(email="juan@example.com", password="secret"):
    response = client.post(
        "/auth/login", data={"username": email, "password": password}
    )
    assert response.status_code == 200
    return response.json()["access_token"]


def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Salvida API"}


def test_register_and_login():
    new_user = {"email": "new@example.com", "password": "secret"}
    response = client.post("/auth/register", json=new_user)
    assert response.status_code == 200

    token = _get_token("new@example.com")
    assert token


def test_get_users_requires_token():
    token = _get_token()
    headers = {"Authorization": f"Bearer {token}"}
    response = client.get("/users", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert data and data[0]["id"] == "user1"
