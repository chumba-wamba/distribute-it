from mongoengine import Document
from mongoengine.fields import StringField
from pydantic import BaseModel


class DBUser(Document):
    given_name = StringField(min_length=1, max_length=255, required=True)
    family_name = StringField(min_length=1, max_length=255, required=True)
    email = StringField(min_length=1, max_length=255, required=True)
    picture = StringField(required=False)

    def to_json(self):
        return {
            "id": str(self.pk),
            "given_name": self.given_name,
            "family_name": self.family_name,
            "email": self.email,
            "picture": self.picture,
        }
