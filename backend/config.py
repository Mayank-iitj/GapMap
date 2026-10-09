import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    SERPAPI_API_KEY = os.getenv("SERPAPI_API_KEY", "")
    FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")
    AI_PROVIDER = os.getenv("AI_PROVIDER", "")
    AI_API_KEY = os.getenv("AI_API_KEY", "")

settings = Settings()
