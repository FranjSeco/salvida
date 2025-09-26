from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import get_db
from models.booking import Booking


class BookingSchema(BaseModel):
    id: str
    date: str
    prm_id: str
    user_id: str
    type: str
    status: str
    pickup_address: str
    destination_address: str

    class Config:
        orm_mode = True


router = APIRouter(prefix="/bookings", tags=["bookings"])


@router.get("/", response_model=List[BookingSchema])
def list_bookings(db: Session = Depends(get_db)):
    return db.query(Booking).all()


@router.get("/{booking_id}", response_model=BookingSchema)
def get_booking(booking_id: str, db: Session = Depends(get_db)):
    booking = db.get(Booking, booking_id)
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    return booking


@router.post("/", response_model=BookingSchema)
def create_booking(booking: BookingSchema, db: Session = Depends(get_db)):
    db_booking = Booking(**booking.dict())
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    return db_booking


@router.put("/{booking_id}", response_model=BookingSchema)
def update_booking(booking_id: str, booking: BookingSchema, db: Session = Depends(get_db)):
    db_booking = db.get(Booking, booking_id)
    if not db_booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    for field, value in booking.dict().items():
        setattr(db_booking, field, value)
    db.commit()
    db.refresh(db_booking)
    return db_booking


@router.delete("/{booking_id}")
def delete_booking(booking_id: str, db: Session = Depends(get_db)):
    db_booking = db.get(Booking, booking_id)
    if not db_booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    db.delete(db_booking)
    db.commit()
    return {"ok": True}
