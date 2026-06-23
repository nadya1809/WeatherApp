import os
from dotenv import load_dotenv

load_dotenv()

# Fix for httpx crashing on Windows with invalid NO_PROXY containing ::1
if "NO_PROXY" in os.environ:
    os.environ["NO_PROXY"] = os.environ["NO_PROXY"].replace("::1", "")

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.weather import router as weather_router

app = FastAPI(
    title="Weather App API",
    description="Proxy server ke OpenWeatherMap API",
    version="1.0.0",
)

# CORS Configuration
origins = [o.strip() for o in os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["GET"],
    allow_headers=["*"],
)

# Include routers
app.include_router(weather_router, prefix="/api")


@app.get("/health")
async def health_check():
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
