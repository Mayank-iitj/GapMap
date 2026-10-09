import httpx
from config import settings

SERPAPI_BASE_URL = "https://serpapi.com/search.json"

async def fetch_serpapi(engine: str, params: dict) -> dict:
    if not settings.SERPAPI_API_KEY:
        raise ValueError("SERPAPI_API_KEY is required to use live data.")
    
    query_params = {
        "engine": engine,
        "api_key": settings.SERPAPI_API_KEY,
        **params
    }
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(SERPAPI_BASE_URL, params=query_params, timeout=15.0)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            return {"error": str(e)}

async def get_search_results(query: str, location: str):
    return await fetch_serpapi("google", {
        "q": f"{query} {location}",
        "location": location + ", India",
        "gl": "in",
        "hl": "en"
    })

async def get_local_results(query: str, location: str):
    return await fetch_serpapi("google_maps", {
        "q": f"{query} {location}",
        "gl": "in",
        "hl": "en"
    })

async def get_trends(query: str):
    return await fetch_serpapi("google_trends", {
        "q": query,
        "geo": "IN"
    })

async def get_news(query: str, location: str):
    return await fetch_serpapi("google_news", {
        "q": f"{query} {location}",
        "gl": "in",
        "hl": "en"
    })

async def get_maps_reviews(data_id: str):
    return await fetch_serpapi("google_maps_reviews", {
        "data_id": data_id,
        "hl": "en"
    })
