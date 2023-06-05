from datetime import datetime, timedelta
from logging import getLogger

from fastapi import HTTPException, status, Depends, Header
from google.auth.transport import requests
from google.oauth2 import id_token
from google.auth.exceptions import GoogleAuthError
from jose import JWTError, jwt
from models.user import DBUser
from settings import settings, access_token_settings


def get_user(email: str):
    return DBUser.objects(email=email).first()


def authenticate_google_token(token: str):
    try:
        id_info = id_token.verify_oauth2_token(
            token,
            requests.Request(),
            settings.google_client_id,
            clock_skew_in_seconds=10,
        )
        db_user = get_user(email=id_info.get("email"))
        if not db_user:
            db_user = DBUser(
                email=id_info.get("email"),
                given_name=id_info.get("given_name"),
                family_name=id_info.get("family_name"),
                picture=id_info.get("picture"),
            )
            db_user.save()
    except GoogleAuthError as e:
        getLogger("uvicorn.warning").warning(e)
        # TODO: Complete this block of code
    except Exception as e:
        getLogger("uvicorn.warning").warning(e)
    return DBUser.objects(email=id_info.get("email")).first()


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = (
        datetime.utcnow() + expires_delta
        if expires_delta
        else datetime.utcnow() + timedelta(minutes=15)
    )
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
        to_encode,
        access_token_settings.jwt_secret,
        algorithm=access_token_settings.jwt_algorithm,
    )
    return encoded_jwt


def fetch_current_user(access_token: str):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or expired token",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(
            access_token,
            access_token_settings.jwt_secret,
            algorithms=[access_token_settings.jwt_algorithm],
        )
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = get_user(email=email)
    if user is None:
        raise credentials_exception
    return user
