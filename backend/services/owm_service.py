import os
os.environ["NO_PROXY"] = ""
import httpx

from datetime import datetime, timezone, timedelta
from typing import Optional
from models.schemas import WeatherResponse, ForecastResponse, ForecastItem

OWM_BASE_URL = "https://api.openweathermap.org/data/2.5"


def _get_api_key() -> str:
    key = os.getenv("OPENWEATHER_API_KEY", "")
    if not key or key == "your_api_key_here":
        raise ValueError("OPENWEATHER_API_KEY not configured")
    return key


def _format_time(unix_ts: int, tz_offset: int) -> str:
    """Convert Unix timestamp to HH:MM string with timezone offset."""
    dt = datetime.fromtimestamp(unix_ts, tz=timezone.utc) + timedelta(seconds=tz_offset)
    return dt.strftime("%H:%M")


def _icon_url(icon: str) -> str:
    return f"https://openweathermap.org/img/wn/{icon}@2x.png"


async def get_current_weather(
    city: Optional[str] = None,
    lat: Optional[float] = None,
    lon: Optional[float] = None,
) -> WeatherResponse:
    api_key = _get_api_key()

    if city:
        params = {"q": city, "appid": api_key, "units": "metric", "lang": "id"}
    elif lat is not None and lon is not None:
        params = {"lat": lat, "lon": lon, "appid": api_key, "units": "metric", "lang": "id"}
    else:
        raise ValueError("Either city or lat/lon must be provided")

    async with httpx.AsyncClient(timeout=10.0, trust_env=False) as client:
        response = await client.get(f"{OWM_BASE_URL}/weather", params=params)

    if response.status_code == 404:
        raise httpx.HTTPStatusError(
            "city_not_found",
            request=response.request,
            response=response,
        )
    if response.status_code == 401:
        raise PermissionError("invalid_api_key")
    if response.status_code != 200:
        raise ConnectionError("upstream_unavailable")

    data = response.json()
    sys = data.get("sys", {})
    tz_offset = data.get("timezone", 0)

    return WeatherResponse(
        city=data["name"],
        country=sys.get("country", ""),
        temperature=round(data["main"]["temp"], 1),
        feels_like=round(data["main"]["feels_like"], 1),
        description=data["weather"][0]["description"],
        icon=data["weather"][0]["icon"],
        icon_url=_icon_url(data["weather"][0]["icon"]),
        humidity=data["main"]["humidity"],
        wind_speed=round(data["wind"].get("speed", 0) * 3.6, 1),  # m/s → km/h
        visibility=round(data.get("visibility", 0) / 1000, 1),    # m → km
        pressure=data["main"]["pressure"],
        sunrise=_format_time(sys.get("sunrise", 0), tz_offset),
        sunset=_format_time(sys.get("sunset", 0), tz_offset),
        timezone_offset=tz_offset,
    )


async def get_forecast(
    city: Optional[str] = None,
    lat: Optional[float] = None,
    lon: Optional[float] = None,
) -> ForecastResponse:
    api_key = _get_api_key()

    if city:
        params = {"q": city, "appid": api_key, "units": "metric", "lang": "id", "cnt": 40}
    elif lat is not None and lon is not None:
        params = {"lat": lat, "lon": lon, "appid": api_key, "units": "metric", "lang": "id", "cnt": 40}
    else:
        raise ValueError("Either city or lat/lon must be provided")

    async with httpx.AsyncClient(timeout=10.0, trust_env=False) as client:
        response = await client.get(f"{OWM_BASE_URL}/forecast", params=params)

    if response.status_code == 404:
        raise httpx.HTTPStatusError(
            "city_not_found",
            request=response.request,
            response=response,
        )
    if response.status_code == 401:
        raise PermissionError("invalid_api_key")
    if response.status_code != 200:
        raise ConnectionError("upstream_unavailable")

    data = response.json()
    city_info = data.get("city", {})

    # Group by date — pick one representative entry per day (noon or first available)
    days: dict = {}
    day_names_id = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"]

    for item in data["list"]:
        dt = datetime.fromtimestamp(item["dt"], tz=timezone.utc)
        date_str = dt.strftime("%Y-%m-%d")

        if date_str not in days:
            days[date_str] = {
                "date": date_str,
                "day": day_names_id[dt.weekday()],
                "temps": [],
                "descriptions": [],
                "icons": [],
            }

        days[date_str]["temps"].append(item["main"]["temp"])
        days[date_str]["descriptions"].append(item["weather"][0]["description"])
        days[date_str]["icons"].append(item["weather"][0]["icon"])

    forecast_items = []
    for date_str, day_data in sorted(days.items())[:5]:
        temps = day_data["temps"]
        # Pick noon icon if available, else first
        icon = day_data["icons"][len(day_data["icons"]) // 2]
        desc = day_data["descriptions"][len(day_data["descriptions"]) // 2]

        forecast_items.append(ForecastItem(
            date=date_str,
            day=day_data["day"],
            temp_max=round(max(temps), 1),
            temp_min=round(min(temps), 1),
            description=desc,
            icon=icon,
            icon_url=_icon_url(icon),
        ))

    return ForecastResponse(
        city=city_info.get("name", city or ""),
        country=city_info.get("country", ""),
        forecast=forecast_items,
    )
