from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException, status
from models.user import DBUser
from settings import access_token_settings
from utils.auth import (
    authenticate_google_token,
    create_access_token,
)

router = APIRouter(prefix="/auth")


@router.get("/token")
def fetch_access_token(google_token: str):
    user = authenticate_google_token(google_token)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(
        minutes=access_token_settings.jwt_token_expire_minutes
    )
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    print(access_token)
    return {"access_token": access_token, "token_type": "bearer"}
