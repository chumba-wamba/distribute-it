import os

import uvicorn
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mongoengine import connect
from router import task

load_dotenv(override=True)

connect(os.getenv("DATABASE"))
app = FastAPI()
app.include_router(task.router)

origins = [
    os.getenv('FRONTEND_URL')
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


if __name__ == "__main__":
    uvicorn.run(app, host=os.getenv('HOST'), port=int(os.getenv('PORT')))
