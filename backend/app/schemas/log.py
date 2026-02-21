from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class LogBase(BaseModel):
    title: Optional[str] = None
    activity: str
    duration: Optional[str] = None
    status: str
    folder: Optional[str] = "General"
    timestamp: Optional[datetime] = None

class LogCreate(LogBase):
    pass

class Log(LogBase):
    id: int
    timestamp: datetime

    class Config:
        from_attributes = True

class FolderUpdate(BaseModel):
    new_folder_name: str
