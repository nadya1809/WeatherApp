from pydantic import BaseModel
from typing import List, Optional


class WeatherResponse(BaseModel):
    city: str
    country: str
    temperature: float
    feels_like: float
    description: str
    icon: str
    icon_url: str
    humidity: int
    wind_speed: float
    visibility: float
    pressure: int
    sunrise: str
    sunset: str
    timezone_offset: int


class ForecastItem(BaseModel):
    date: str
    day: str
    temp_max: float
    temp_min: float
    description: str
    icon: str
    icon_url: str


class ForecastResponse(BaseModel):
    city: str
    country: str
    forecast: List[ForecastItem]


class ErrorResponse(BaseModel):
    error: str
    message: str
