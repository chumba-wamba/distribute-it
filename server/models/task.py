from mongoengine import Document
from mongoengine.fields import (
    BinaryField,
    EnumField,
    FloatField,
    ReferenceField,
    StringField,
    IntField,
)
from .user import DBUser

from .status import Status


class DBTask(Document):
    name = StringField(required=True)
    description = StringField(required=True)
    incentive_amount = FloatField(required=True)
    owner = ReferenceField(DBUser)
    public_key = StringField(required=True)
    file = BinaryField(required=True)
    file_hash = IntField(required=True)
    result = StringField()
    executor = ReferenceField(DBUser)
    status = EnumField(enum=Status, default=Status.INCOMPLETE, required=True)

    def to_json(self):
        return {
            "id": str(self.pk),
            "name": self.name,
            "description": self.description,
            "incentive_amount": self.incentive_amount,
            "owner": self.owner.to_json(),
            "public_key": self.public_key,
            "file": self.file,
            "file_hash": self.file_hash,
            "result": self.result,
            "executor": self.executor.to_json() if self.executor else None,
            "status": self.status,
        }
