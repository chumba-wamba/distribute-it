import os

import uvicorn
from dotenv import load_dotenv
from fastapi import FastAPI
from mongoengine import connect

from router import task

load_dotenv(override=True)

connect(os.getenv("DATABASE"))
app = FastAPI()
app.include_router(task.router)


@app.get("/")
def read_root():
    return {"Hello": "World"}


if __name__ == "__main__":
    uvicorn.run(app, host=os.getenv('HOST'), port=int(os.getenv('PORT')))
