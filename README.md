# Weather App 🌤️

Aplikasi cuaca berbasis web yang menampilkan informasi cuaca real-time berdasarkan nama kota atau lokasi GPS.

## Tech Stack

| Bagian | Teknologi |
|--------|-----------|
| Backend | Python 3.11+, FastAPI, httpx, uvicorn |
| Frontend | React 18, Vite, Tailwind CSS v3, lucide-react |
| API | OpenWeatherMap Free Tier |

## Cara Menjalankan

### Prasyarat
- Python 3.11+
- Node.js 18+
- API Key OpenWeatherMap (daftar gratis di [openweathermap.org](https://home.openweathermap.org/api_keys))

---

### Backend

```bash
cd weather-app/backend

# Install dependencies
pip install -r requirements.txt

# Setup environment
# Edit .env dan isi OPENWEATHER_API_KEY dengan key kamu
# (file .env sudah tersedia, tinggal ganti nilainya)

# Jalankan server
uvicorn main:app --reload --port 8000
```

Server berjalan di: `http://localhost:8000`  
Health check: `http://localhost:8000/health`  
API docs: `http://localhost:8000/docs`

---

### Frontend

```bash
cd weather-app/frontend

# Install dependencies
npm install

# Setup environment (sudah ada file .env dengan nilai default)
# VITE_API_BASE_URL=http://localhost:8000

# Jalankan dev server
npm run dev
```

Akses di: `http://localhost:5173`

---

## Fitur

- 🔍 **Pencarian kota** — cari cuaca kota mana pun di dunia
- 📍 **Geolocation** — deteksi cuaca berdasarkan lokasi GPS browser
- 📅 **Prakiraan 5 hari** — tampilan cuaca harian ke depan
- 🕐 **Riwayat pencarian** — simpan 5 kota terakhir di localStorage
- 🌙 **Dark/Light mode** — toggle tema, tersimpan di localStorage
- 📱 **Responsif** — tampil optimal di mobile dan desktop
- 🔒 **API Key aman** — key tidak pernah terekspos ke browser

## Struktur Proyek

```
weather-app/
├── backend/
│   ├── main.py
│   ├── routers/weather.py
│   ├── services/owm_service.py
│   ├── models/schemas.py
│   ├── .env                 ← isi API key di sini
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── components/      ← SearchBar, WeatherCard, dll
    │   ├── hooks/           ← useWeather, useHistory
    │   ├── context/         ← ThemeContext
    │   ├── services/        ← weatherApi.js
    │   └── utils/           ← formatters.js
    └── .env                 ← VITE_API_BASE_URL
```

## Konfigurasi

### `backend/.env`
```env
OPENWEATHER_API_KEY=your_api_key_here   # ← WAJIB DIISI
ALLOWED_ORIGINS=http://localhost:5173
```

### `frontend/.env`
```env
VITE_API_BASE_URL=http://localhost:8000
```
