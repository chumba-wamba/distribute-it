from pydantic import BaseSettings


class Settings(BaseSettings):
    host: str = "0.0.0.0"
    port: str = "8000"
    database: str = "distributed"
    frontend_url = "http://localhost:3000"
    google_client_id: str = (
        "89647527210-10g1u8u0kef7e03ikvoisjglh0tb5kmk.apps.googleusercontent.com"
    )
    google_client_secret: str = "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"


class AccessTokenSettings(BaseSettings):
    jwt_secret: str = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
    jwt_algorithm: str = "HS256"
    jwt_token_expire_minutes: int = 43200


settings = Settings()
access_token_settings = AccessTokenSettings()
