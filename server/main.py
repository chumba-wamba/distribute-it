import os

import uvicorn
from dotenv import load_dotenv
from fastapi import FastAPI

load_dotenv(override=True)
app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


if __name__ == "__main__":
    uvicorn.run(app, host=os.getenv('HOST'), port=int(os.getenv('PORT')))
