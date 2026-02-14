from pydantic import BaseModel, EmailStr

class UserBase(BaseModel):
    email: EmailStr

class UserUpdate(BaseModel):
    full_name: str | None = None
    email: EmailStr | None = None
    password: str | None = None
    old_password: str | None = None
    avatar: str | None = None

class UserCreate(UserBase):
    password: str
    full_name: str
    avatar: str | None = None

class UserLogin(UserBase):
    password: str

class User(UserBase):
    id: int
    full_name: str | None = None
    avatar: str | None = None
    is_active: bool

    class Config:
        from_attributes = True
