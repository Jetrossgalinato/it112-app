from sqlalchemy.orm import Session
from app.models import user as models
from app.models import log as log_models
from app.schemas import user as schemas
from app.schemas import log as log_schemas
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = pwd_context.hash(user.password)
    db_user = models.User(email=user.email, hashed_password=hashed_password, full_name=user.full_name)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def update_user(db: Session, user_id: int, user_update: schemas.UserUpdate):
    db_user = get_user(db, user_id)
    if not db_user:
        return None
    
    update_data = user_update.dict(exclude_unset=True)
    if "old_password" in update_data:
        del update_data["old_password"]

    if "password" in update_data and update_data["password"]:
        update_data["hashed_password"] = pwd_context.hash(update_data["password"])
        del update_data["password"]
    
    for key, value in update_data.items():
        setattr(db_user, key, value)
        
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_logs(db: Session, skip: int = 0, limit: int = 100):
    return db.query(log_models.Log).order_by(log_models.Log.id.desc()).offset(skip).limit(limit).all()

def create_log(db: Session, log: log_schemas.LogCreate):
    db_log = log_models.Log(
        activity=log.activity,
        duration=log.duration,
        status=log.status,
        folder=log.folder,
        timestamp=log.timestamp
    )
    db.add(db_log)
    db.commit()
    db.refresh(db_log)
    return db_log

def get_log(db: Session, log_id: int):
    return db.query(log_models.Log).filter(log_models.Log.id == log_id).first()

def update_log(db: Session, log_id: int, log: log_schemas.LogCreate):
    db_log = get_log(db, log_id)
    if db_log:
        db_log.activity = log.activity
        db_log.duration = log.duration
        db_log.status = log.status
        db_log.folder = log.folder
        if log.timestamp:
            db_log.timestamp = log.timestamp
        db.commit()
        db.refresh(db_log)
    return db_log

def delete_log(db: Session, log_id: int):
    db_log = get_log(db, log_id)
    if db_log:
        db.delete(db_log)
        db.commit()
    return db_log

def delete_logs_by_folder(db: Session, folder_name: str):
    db.query(log_models.Log).filter(log_models.Log.folder == folder_name).delete()
    db.commit()

def update_logs_folder(db: Session, old_folder_name: str, new_folder_name: str):
    db.query(log_models.Log).filter(log_models.Log.folder == old_folder_name).update(
        {log_models.Log.folder: new_folder_name}
    )
    db.commit()
