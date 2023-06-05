from typing import Optional

from models.status import Status
from pydantic import BaseModel, Field


class APIUser(BaseModel):
    id: str
    given_name: str
    family_name: str
    email: str
    picture: str | None


class APITask(BaseModel):
    name: str
    description: str
    incentive_amount: float
    public_key: str
    file: bytes
    executor: APIUser | None
    status: Optional[Status]


class APITaskRs(BaseModel):
    id: str
    name: str
    description: str
    incentive_amount: float
    owner: APIUser
    file: str
    file_hash: int
    result: str | None
    executor: APIUser | None
    status: Status


class APIResult(BaseModel):
    result: str
