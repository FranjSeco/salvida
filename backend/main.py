

from fastapi import FastAPI
from .database import Base, engine, SessionLocal
from .routers import users, prms, bookings
from .models.user import User
from .models.prm import PRM
from .models.booking import Booking

from .auth import router as auth_router, get_current_user


app = FastAPI(title="Salvida API")

Base.metadata.create_all(bind=engine)


def init_db():
    db = SessionLocal()
    try:
        if not db.query(User).first():
            sample_user = User(
                id="user1",
                personal_id="12345678A",
                name="Juan Pérez",
                address="Calle 1",
                location="Madrid",
                billing_address="Calle 1",
                country_code="ES",
                phone="600000000",
                email="juan@example.com",
                avatar="",
                role="user",
            )
            sample_prm = PRM(
                id="prm1",
                personal_id="87654321B",
                name="María López",
                address="Calle 3",
                location="Madrid",
                country_code="ES",
                phone="700000000",
            )
            sample_booking = Booking(
                id="booking1",
                date="2024-01-01T10:00:00",
                prm_id="prm1",
                user_id="user1",
                type="singleService",
                status="requested",
                pickup_address="Calle 1",
                destination_address="Calle 2",
            )
            db.add_all([sample_user, sample_prm, sample_booking])
            db.commit()
    finally:
        db.close()


init_db()


app.include_router(users.router)
app.include_router(prms.router)
app.include_router(bookings.router)
app.include_router(auth_router, prefix="/auth")

@app.get("/")
def root():
    return {"message": "Salvida API"}

