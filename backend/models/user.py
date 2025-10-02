from sqlalchemy import Column, String
from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    personal_id = Column(String, unique=True, index=True)
    name = Column(String)
    address = Column(String)
    location = Column(String)
    billing_address = Column(String)
    country_code = Column(String)
    phone = Column(String)
    email = Column(String)
    avatar = Column(String)
    role = Column(String)
