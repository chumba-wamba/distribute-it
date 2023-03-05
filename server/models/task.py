from mongoengine import Document, EnumField, FloatField, StringField

from .status import Status


class DBTask(Document):
    name = StringField(min_length=1, max_length=255, required=True)
    incentive_amount = FloatField(required=True)
    description = StringField(min_length=10, max_length=1000, required=True)
    owner = StringField(min_length=1, max_length=30, required=True)
    executor = StringField(min_length=1, max_length=30)
    status = EnumField(enum=Status, default=Status.INCOMPLETE, required=True)

    def to_json(self):
        return {
            "_id": str(self.pk),
            "name": self.name,
            "incentive_amount": self.incentive_amount,
            "description": self.description,
            "owner": self.owner,
            "executor": self.executor,
            "status": self.status
        }
