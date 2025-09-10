from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from ..database import get_db
from ..models.prm import PRM


class PRMSchema(BaseModel):
    id: str
    personal_id: str
    name: str
    address: str
    location: str
    country_code: str
    phone: str

    class Config:
        orm_mode = True


router = APIRouter(prefix="/prms", tags=["prms"])


@router.get("/", response_model=List[PRMSchema])
def list_prms(db: Session = Depends(get_db)):
    return db.query(PRM).all()


@router.get("/{prm_id}", response_model=PRMSchema)
def get_prm(prm_id: str, db: Session = Depends(get_db)):
    prm = db.get(PRM, prm_id)
    if not prm:
        raise HTTPException(status_code=404, detail="PRM not found")
    return prm


@router.post("/", response_model=PRMSchema)
def create_prm(prm: PRMSchema, db: Session = Depends(get_db)):
    db_prm = PRM(**prm.dict())
    db.add(db_prm)
    db.commit()
    db.refresh(db_prm)
    return db_prm


@router.put("/{prm_id}", response_model=PRMSchema)
def update_prm(prm_id: str, prm: PRMSchema, db: Session = Depends(get_db)):
    db_prm = db.get(PRM, prm_id)
    if not db_prm:
        raise HTTPException(status_code=404, detail="PRM not found")
    for field, value in prm.dict().items():
        setattr(db_prm, field, value)
    db.commit()
    db.refresh(db_prm)
    return db_prm


@router.delete("/{prm_id}")
def delete_prm(prm_id: str, db: Session = Depends(get_db)):
    db_prm = db.get(PRM, prm_id)
    if not db_prm:
        raise HTTPException(status_code=404, detail="PRM not found")
    db.delete(db_prm)
    db.commit()
    return {"ok": True}
