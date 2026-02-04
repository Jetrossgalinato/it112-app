from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app import crud
from app.schemas import log as schemas
from app.database import get_db

router = APIRouter()

@router.get("/", response_model=List[schemas.Log])
def read_logs(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    logs = crud.get_logs(db, skip=skip, limit=limit)
    return logs

@router.post("/", response_model=schemas.Log)
def create_log(log: schemas.LogCreate, db: Session = Depends(get_db)):
    return crud.create_log(db=db, log=log)
