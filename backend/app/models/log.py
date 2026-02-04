from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from app.database import Base

class Log(Base):
    __tablename__ = "logs"

    id = Column(Integer, primary_key=True, index=True)
    activity = Column(String, index=True)
    duration = Column(String)
    status = Column(String)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
