from sqlalchemy.orm import Session
from app.models import user as models
from app.models import log as log_models
from app.schemas import user as schemas
from app.schemas import log as log_schemas
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = pwd_context.hash(user.password)
    db_user = models.User(email=user.email, hashed_password=hashed_password, full_name=user.full_name)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_logs(db: Session, skip: int = 0, limit: int = 100):
    return db.query(log_models.Log).offset(skip).limit(limit).all()

def create_log(db: Session, log: log_schemas.LogCreate):
    db_log = log_models.Log(
        activity=log.activity,
        duration=log.duration,
        status=log.status,
        timestamp=log.timestamp
    )
    db.add(db_log)
    db.commit()
    db.refresh(db_log)
    return db_log
