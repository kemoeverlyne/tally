from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pymongo import MongoClient
from datetime import datetime
from bson.objectid import ObjectId
from bson.json_util import dumps

app = FastAPI()

# CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB setup
client = MongoClient("mongodb://localhost:27017/")
db = client["assistantdb"]
questions_collection = db["questions"]

class Question(BaseModel):
    question: str

@app.post("/ask")
async def ask_question(payload: Question):
    response = "Thanks for your question, I'll think about it."
    entry = {
        "question": payload.question,
        "response": response,
        "timestamp": datetime.utcnow().isoformat()
    }
    questions_collection.insert_one(entry)
    return {"response": response}

@app.get("/history")
async def get_history():
    history = list(questions_collection.find({}, {"_id": 0}))
    return {"history": history}
