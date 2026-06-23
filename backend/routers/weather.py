from fastapi import APIRouter, Query, HTTPException
from typing import Optional
import httpx

from services.owm_service import get_current_weather, get_forecast
from models.schemas import WeatherResponse, ForecastResponse

router = APIRouter()


@router.get("/weather", response_model=WeatherResponse)
async def weather(
    city: Optional[str] = Query(None, description="City name"),
    lat: Optional[float] = Query(None, description="Latitude"),
    lon: Optional[float] = Query(None, description="Longitude"),
):
    if not city and (lat is None or lon is None):
        raise HTTPException(
            status_code=400,
            detail={"error": "bad_request", "message": "Harus menyertakan 'city' atau 'lat' dan 'lon'."},
        )

    try:
        data = await get_current_weather(city=city, lat=lat, lon=lon)
        return data
    except httpx.HTTPStatusError as e:
        raise HTTPException(
            status_code=404,
            detail={"error": "city_not_found", "message": "Kota tidak ditemukan. Periksa ejaan dan coba lagi."},
        )
    except PermissionError:
        raise HTTPException(
            status_code=500,
            detail={"error": "invalid_api_key", "message": "API key tidak valid atau sudah kadaluarsa."},
        )
    except (ConnectionError, Exception) as e:
        if "upstream" in str(e).lower() or isinstance(e, ConnectionError):
            raise HTTPException(
                status_code=503,
                detail={"error": "upstream_unavailable", "message": "Layanan cuaca sedang tidak tersedia. Coba beberapa saat lagi."},
            )
        raise HTTPException(
            status_code=500,
            detail={"error": "internal_error", "message": "Terjadi kesalahan internal. Coba lagi."},
        )


@router.get("/forecast", response_model=ForecastResponse)
async def forecast(
    city: Optional[str] = Query(None, description="City name"),
    lat: Optional[float] = Query(None, description="Latitude"),
    lon: Optional[float] = Query(None, description="Longitude"),
):
    if not city and (lat is None or lon is None):
        raise HTTPException(
            status_code=400,
            detail={"error": "bad_request", "message": "Harus menyertakan 'city' atau 'lat' dan 'lon'."},
        )

    try:
        data = await get_forecast(city=city, lat=lat, lon=lon)
        return data
    except httpx.HTTPStatusError:
        raise HTTPException(
            status_code=404,
            detail={"error": "city_not_found", "message": "Kota tidak ditemukan. Periksa ejaan dan coba lagi."},
        )
    except PermissionError:
        raise HTTPException(
            status_code=500,
            detail={"error": "invalid_api_key", "message": "API key tidak valid atau sudah kadaluarsa."},
        )
    except Exception:
        raise HTTPException(
            status_code=503,
            detail={"error": "upstream_unavailable", "message": "Layanan cuaca sedang tidak tersedia. Coba beberapa saat lagi."},
        )
