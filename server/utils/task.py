from models.task import DBTask


def get_task(id: str):
    return DBTask.objects(id=id).first()
