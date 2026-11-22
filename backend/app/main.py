from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .schemas import GenerateRequest, GenerateResponse
from .services.generator import generate_password
from .services.strength import rate_password

app = FastAPI(title="Password Generator API")

# Allow the React dev server to call this API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.post("/api/generate", response_model=GenerateResponse)
def generate(req: GenerateRequest):
    # Never log the generated password.
    password = generate_password(req.length, req.uppercase, req.lowercase,
                                 req.numbers, req.symbols)
    score, label = rate_password(password)
    return GenerateResponse(password=password, score=score, label=label)
