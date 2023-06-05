from binascii import crc32
from typing import Dict, List

from fastapi import APIRouter, Depends, HTTPException, status
from models.status import Status as TaskStatus
from models.task import DBTask
from models.user import DBUser
from utils.auth import fetch_current_user
from utils.task import get_task

from .models import APIResult, APITask, APITaskRs

router = APIRouter(prefix="/task")


@router.post("/create")
def create_task(
    task: APITask, current_user=Depends(fetch_current_user)
) -> Dict[str, APITaskRs]:
    owner = DBUser.objects(id=current_user.id).first()
    db_task = DBTask(**task.dict(), owner=owner, file_hash=crc32(task.file))
    db_task.save()
    return {"data": APITaskRs(**db_task.to_json())}


@router.get("/fetch")
def fetch_tasks(current_user=Depends(fetch_current_user)) -> Dict[str, List[APITaskRs]]:
    tasks = DBTask.objects(owner__ne=current_user.id)
    if not tasks:
        return {"data": []}
    tasks = [task.to_json() for task in tasks]
    return {"data": [APITaskRs(**task) for task in tasks]}


@router.get("/fetch/current_user")
def fetch_tasks(current_user=Depends(fetch_current_user)) -> Dict[str, List[APITaskRs]]:
    tasks = DBTask.objects(owner=current_user.id)
    if not tasks:
        return {"data": []}
    tasks = [task.to_json() for task in tasks]
    return {"data": [APITaskRs(**task) for task in tasks]}


@router.get("/fetch/executed_by_current_user")
def fetch_tasks(current_user=Depends(fetch_current_user)) -> Dict[str, List[APITaskRs]]:
    tasks = DBTask.objects(executor=current_user.id)
    if not tasks:
        return {"data": []}
    tasks = [task.to_json() for task in tasks]
    return {"data": [APITaskRs(**task) for task in tasks]}


@router.get("/fetch/{id}")
def fetch_task(
    id: str, current_user=Depends(fetch_current_user)
) -> Dict[str, APITaskRs]:
    task = DBTask.objects(id=id, owner=current_user.id).first()
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="The task could not be fetched",
        )
    return {"data": APITaskRs(**task.to_json())}


@router.delete("/delete/{id}")
def delete_task(id: str, current_user=Depends(fetch_current_user)):
    task = DBTask.objects(id=id, owner=current_user.id)
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="The task could not be deleted",
        )
    task.delete()
    return {"data": {"id": id}}


@router.get("/accept/{id}")
def accept_task(
    id: str, current_user=Depends(fetch_current_user)
) -> Dict[str, APITaskRs]:
    task = get_task(id)
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="The task does not exist",
        )

    # Should not be able to accept task they have uploaded
    if task.owner.id == current_user.id:
        raise HTTPException(
            status_code=status.HTTP_405_METHOD_NOT_ALLOWED,
            detail="The user cannot accept a task belonging to them",
        )

    # Update the databse
    task.update(executor=current_user, status=TaskStatus.INPROGRESS)
    return {"data": get_task(id).to_json()}


@router.post("/complete/{id}")
def accept_task(
    result: APIResult, id: str, current_user=Depends(fetch_current_user)
) -> Dict[str, APITaskRs]:
    task = get_task(id)
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="The task does not exist",
        )

    # Should not be able to accept task they have uploaded
    if task.owner.id == current_user.id:
        raise HTTPException(
            status_code=status.HTTP_405_METHOD_NOT_ALLOWED,
            detail="The user cannot complete a task belonging to them",
        )

    if task.executor.id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_405_METHOD_NOT_ALLOWED,
            detail="The user cannot complete a task that they have not accepted",
        )

    if task.status != TaskStatus.INPROGRESS:
        raise HTTPException(
            status_code=status.HTTP_405_METHOD_NOT_ALLOWED,
            detail="The user cannot complete a task that is not in progress",
        )

    # Update the databse
    task.update(result=result.result, status=TaskStatus.COMPLETE)
    return {"data": get_task(id).to_json()}
