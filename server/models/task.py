from mongoengine import Document, EnumField, FloatField, StringField

from .status import Status


class DBTask(Document):
    name = StringField(min_length=1, max_length=255, required=True)
    incentive_amount = FloatField(required=True)
    description = StringField(min_length=10, max_length=1000, required=True)
    owner = StringField(min_length=1, max_length=30, required=True)
    executor = StringField(min_length=1, max_length=30)
    status = EnumField(enum=Status, default=Status.INCOMPLETE, required=True)

    def __init__(self, name: str, incentive_amount: float, description: str, owner: str, executor: str = None, status: Status = None, *args, **kwargs):
        super(DBTask, self).__init__()
        self.name = name
        self.incentive_amount = incentive_amount
        self.description = description
        self.owner = owner
        self.executor = executor
        self.status = status

