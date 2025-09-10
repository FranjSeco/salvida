from sqlalchemy import Column, String
from ..database import Base


class PRM(Base):
    __tablename__ = "prms"

    id = Column(String, primary_key=True, index=True)
    personal_id = Column(String, unique=True, index=True)
    name = Column(String)
    address = Column(String)
    location = Column(String)
    country_code = Column(String)
    phone = Column(String)
