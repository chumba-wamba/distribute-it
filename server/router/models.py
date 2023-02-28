from typing import Optional

from models.status import Status
from pydantic import BaseModel, Field


class APITask(BaseModel):
    name: str = Field(title="The name of the task",
                      min_length=1, max_length=255)
    incentive_amount: float = Field(
        title="The incentive amount to be transferred to the executor on task completion")
    description: str = Field(
        title="The description of task; to include required computational details", min_length=10, max_length=1000)
    owner: str = Field(
        title="The name of the user who added the task", min_length=1, max_length=255)
    executor: Optional[str] = Field(
        title="The name of the user who has accepted the task", min_length=1, max_length=30)
    status: Optional[Status] = Field(title="The statue of the task", default=None)
