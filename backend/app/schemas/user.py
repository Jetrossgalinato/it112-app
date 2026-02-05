from pydantic import BaseModel, EmailStr

class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str
    full_name: str

class UserLogin(UserBase):
    password: str

class User(UserBase):
    id: int
    full_name: str | None = None
    is_active: bool

    class Config:
        from_attributes = True
