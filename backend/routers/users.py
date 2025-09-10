from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from ..database import get_db
from ..models.user import User


class UserSchema(BaseModel):
    id: str
    personal_id: str
    name: str
    address: str
    location: str
    billing_address: str
    country_code: str
    phone: str
    email: str
    avatar: str
    role: str

    class Config:
        orm_mode = True


router = APIRouter(prefix="/users", tags=["users"])


@router.get("/", response_model=List[UserSchema])
def list_users(db: Session = Depends(get_db)):
    return db.query(User).all()


@router.get("/{user_id}", response_model=UserSchema)
def get_user(user_id: str, db: Session = Depends(get_db)):
    user = db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.post("/", response_model=UserSchema)
def create_user(user: UserSchema, db: Session = Depends(get_db)):
    db_user = User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


@router.put("/{user_id}", response_model=UserSchema)
def update_user(user_id: str, user: UserSchema, db: Session = Depends(get_db)):
    db_user = db.get(User, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    for field, value in user.dict().items():
        setattr(db_user, field, value)
    db.commit()
    db.refresh(db_user)
    return db_user


@router.delete("/{user_id}")
def delete_user(user_id: str, db: Session = Depends(get_db)):
    db_user = db.get(User, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(db_user)
    db.commit()
    return {"ok": True}
