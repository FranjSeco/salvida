from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)


def test_list_prms():
    response = client.get("/prms")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert data and data[0]["id"] == "prm1"


def test_get_prm():
    response = client.get("/prms/prm1")
    assert response.status_code == 200
    assert response.json()["id"] == "prm1"


def test_get_prm_not_found():
    response = client.get("/prms/nonexistent")
    assert response.status_code == 404


def test_list_bookings():
    response = client.get("/bookings")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert data and data[0]["id"] == "booking1"


def test_get_booking():
    response = client.get("/bookings/booking1")
    assert response.status_code == 200
    assert response.json()["id"] == "booking1"


def test_get_booking_not_found():
    response = client.get("/bookings/nonexistent")
    assert response.status_code == 404

