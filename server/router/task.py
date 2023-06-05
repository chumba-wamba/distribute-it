from fastapi import APIRouter, HTTPException, status
from models.task import DBTask

from .models import APITask

router = APIRouter(
    prefix="/task"
)


@router.post("/create")
def create_task(task: APITask):
    db_task = DBTask(**task.dict())
    db_task.save()
    return {"data": db_task.to_json()}


@router.get("/fetch")
def fetch_tasks(start: int = 0, end: int = -1):
    tasks = [task.to_json() for task in DBTask.objects()]
    tasks = tasks[start:end]
    return {
        "data": tasks
    }


@router.get("/fetch/{id}")
def fetch_task(id: str):
    task = DBTask.objects(id=id).first()
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='The task to be fetched does not exist.',
        )
    return {
        "data": task.to_json()
    }


@router.delete("/delete/{id}")
def delete_task(id: str):
    task = DBTask.objects(id=id)
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='The task to be deleted does not exist.',
        )
    task.delete()
    return {
        "data": {
            "id": id
        }
    }
