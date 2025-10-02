from sqlalchemy import Column, String, ForeignKey
from database import Base


class Booking(Base):
    __tablename__ = "bookings"

    id = Column(String, primary_key=True, index=True)
    date = Column(String)
    prm_id = Column(String, ForeignKey("prms.id"))
    user_id = Column(String, ForeignKey("users.id"))
    type = Column(String)
    status = Column(String)
    pickup_address = Column(String)
    destination_address = Column(String)
