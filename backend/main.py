from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(title="Salvida API")


class Booking(BaseModel):
    id: str
    date: str
    prm: str
    user: str
    type: str
    status: str
    pickupAddress: str
    destinationAddress: str


class User(BaseModel):
    id: str
    personalId: str
    dependantPrmIds: List[str]
    name: str
    address: str
    location: str
    billingAddress: str
    countryCode: str
    phone: str
    email: str
    avatar: str
    role: str
    bookings: List[Booking] = []


class Address(BaseModel):
    id: str
    address: str
    location: str
    contactPerson: Optional[str] = None
    alias: Optional[str] = None


class PRM(BaseModel):
    id: str
    personalId: str
    responsibleUserIds: List[str]
    createdBy: str
    name: str
    address: str
    location: str
    countryCode: str
    phone: str
    emergenciesPhoneNumbers: List[str]
    pickupAddresses: List[Address]
    destinationAddresses: List[Address]
    bookings: List[Booking] = []


sample_booking = Booking(
    id="booking1",
    date="2024-01-01T10:00:00",
    prm="prm1",
    user="user1",
    type="singleService",
    status="requested",
    pickupAddress="Calle 1",
    destinationAddress="Calle 2",
)

sample_user = User(
    id="user1",
    personalId="12345678A",
    dependantPrmIds=["prm1"],
    name="Juan Pérez",
    address="Calle 1",
    location="Madrid",
    billingAddress="Calle 1",
    countryCode="ES",
    phone="600000000",
    email="juan@example.com",
    avatar="",
    role="user",
    bookings=[sample_booking],
)

sample_prm = PRM(
    id="prm1",
    personalId="87654321B",
    responsibleUserIds=["user1"],
    createdBy="user1",
    name="María López",
    address="Calle 3",
    location="Madrid",
    countryCode="ES",
    phone="700000000",
    emergenciesPhoneNumbers=["600000001"],
    pickupAddresses=[Address(id="a1", address="Calle 1", location="Madrid")],
    destinationAddresses=[Address(id="a2", address="Calle 2", location="Madrid", alias="Casa")],
    bookings=[sample_booking],
)

users = {sample_user.id: sample_user}
prms = {sample_prm.id: sample_prm}
bookings = {sample_booking.id: sample_booking}


@app.get("/")
def root():
    return {"message": "Salvida API"}


@app.get("/users", response_model=List[User])
def get_users():
    return list(users.values())


@app.get("/users/{user_id}", response_model=User)
def get_user(user_id: str):
    user = users.get(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@app.get("/prms", response_model=List[PRM])
def get_prms():
    return list(prms.values())


@app.get("/prms/{prm_id}", response_model=PRM)
def get_prm(prm_id: str):
    prm = prms.get(prm_id)
    if not prm:
        raise HTTPException(status_code=404, detail="PRM not found")
    return prm


@app.get("/bookings", response_model=List[Booking])
def get_bookings():
    return list(bookings.values())


@app.get("/bookings/{booking_id}", response_model=Booking)
def get_booking(booking_id: str):
    booking = bookings.get(booking_id)
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    return booking
