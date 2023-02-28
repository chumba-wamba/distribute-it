from fastapi import APIRouter
from models.task import DBTask

from .models import APITask

router = APIRouter(
    prefix="/task"
)


@router.post("/create")
def create_task(task: APITask):
    task_dict = task.dict()
    DBTask(**task_dict).save()
    return {"data": task_dict}


@router.get("/fetch")
def fetch_all_tasks():
    return {
        "data": [task.to_mongo() for task in DBTask.objects]
    }


@router.get("/fetch/{id}")
def fetch_task(id: str):
    return {
        "data": DBTask.objects.get(id=id).to_mongo()
    }


@router.delete("/delete/{id}")
def delete_task(id: str):
    DBTask.objects(id=id).delete()
    return {
        "data": {
            "id": id
        }
    }
