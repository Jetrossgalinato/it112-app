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

@router.put("/{log_id}", response_model=schemas.Log)
def update_log(log_id: int, log: schemas.LogCreate, db: Session = Depends(get_db)):
    db_log = crud.get_log(db, log_id=log_id)
    if not db_log:
        raise HTTPException(status_code=404, detail="Log not found")
    return crud.update_log(db=db, log_id=log_id, log=log)

@router.delete("/{log_id}", response_model=schemas.Log)
def delete_log(log_id: int, db: Session = Depends(get_db)):
    db_log = crud.get_log(db, log_id=log_id)
    if not db_log:
        raise HTTPException(status_code=404, detail="Log not found")
    crud.delete_log(db=db, log_id=log_id)
    return db_log

@router.delete("/folder/{folder_name}", status_code=204)
def delete_folder(folder_name: str, db: Session = Depends(get_db)):
    crud.delete_logs_by_folder(db=db, folder_name=folder_name)
    return None

@router.put("/folder/{folder_name}", status_code=200)
def update_folder(folder_name: str, folder_update: schemas.FolderUpdate, db: Session = Depends(get_db)):
    crud.update_logs_folder(db=db, old_folder_name=folder_name, new_folder_name=folder_update.new_folder_name)
    return {"message": "Folder updated successfully"}
