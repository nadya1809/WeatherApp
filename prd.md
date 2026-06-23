# PRD — Weather App (Aplikasi Cuaca Berbasis Web)

**Versi:** 1.1  
**Tanggal:** 22 Juni 2026  
**Tipe Proyek:** Web Application  
**Target Pembaca:** AI Agent / Vibe Coder  

---

## 1. Ringkasan Proyek

Membangun aplikasi cuaca berbasis web yang memungkinkan pengguna mencari informasi cuaca berdasarkan nama kota. Aplikasi terdiri dari dua bagian utama:

- **Backend:** REST API server (Python + FastAPI) yang berfungsi sebagai proxy ke OpenWeatherMap API — menyembunyikan API key dari client.
- **Frontend:** React app (Vite + Tailwind CSS) dengan form input kota, tampilan cuaca saat ini, prakiraan 5 hari, serta fitur dark/light mode, geolocation otomatis, dan riwayat pencarian.

---

## 2. Tujuan & Sasaran

| Tujuan | Deskripsi |
|--------|-----------|
| Fungsional | Pengguna dapat mencari cuaca kota mana pun di dunia secara real-time |
| Keamanan | API key OpenWeatherMap **tidak pernah terekspos** ke browser |
| Performa | Respons cuaca tampil dalam < 2 detik |
| UX | Tampilan bersih, responsif (mobile-friendly), mendukung dark/light mode |

---

## 3. Tech Stack

### Backend
| Komponen | Pilihan |
|----------|---------|
| Language | Python 3.11+ |
| Framework | FastAPI |
| HTTP Client | `httpx` (async) |
| Server | `uvicorn` |
| Env Management | `python-dotenv` |

### Frontend
| Komponen | Pilihan |
|----------|---------|
| Framework | React 18 |
| Build Tool | Vite |
| Styling | Tailwind CSS v3 |
| State Management | React hooks (`useState`, `useEffect`, `useContext`) — tanpa library eksternal |
| HTTP Client | `fetch` API native (atau `axios` jika diperlukan) |
| Icons | `lucide-react` |
| Font | Inter (via Tailwind default atau Google Fonts) |

### External API
| Komponen | Detail |
|----------|--------|
| Provider | OpenWeatherMap (Free Tier) |
| Endpoint 1 | `GET /data/2.5/weather` — cuaca saat ini |
| Endpoint 2 | `GET /data/2.5/forecast` — prakiraan 5 hari (interval 3 jam) |
| Endpoint 3 | `GET /data/2.5/weather?lat={lat}&lon={lon}` — geolocation |
| Auth | API Key via query param `appid` (disimpan di `.env` backend) |
| Unit | Metric (°C, km/h) |

---

## 4. Struktur Proyek

```
weather-app/
├── backend/
│   ├── main.py                  # Entry point FastAPI
│   ├── routers/
│   │   └── weather.py           # Route handler cuaca
│   ├── services/
│   │   └── owm_service.py       # Logic komunikasi ke OpenWeatherMap
│   ├── models/
│   │   └── schemas.py           # Pydantic response models
│   ├── .env                     # API key (JANGAN di-commit ke git)
│   ├── .env.example             # Template env untuk onboarding
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── SearchBar.jsx        # Input pencarian + tombol geolocation
│   │   │   ├── WeatherCard.jsx      # Kartu cuaca utama (suhu, kondisi, detail)
│   │   │   ├── ForecastCard.jsx     # Kartu prakiraan 1 hari
│   │   │   ├── ForecastList.jsx     # Container 5 kartu ForecastCard
│   │   │   ├── HistoryChips.jsx     # Chip riwayat pencarian
│   │   │   ├── ThemeToggle.jsx      # Tombol dark/light mode
│   │   │   ├── ErrorMessage.jsx     # Komponen pesan error
│   │   │   └── LoadingSpinner.jsx   # Indikator loading
│   │   ├── hooks/
│   │   │   ├── useWeather.js        # Custom hook: fetch cuaca & forecast
│   │   │   └── useHistory.js        # Custom hook: kelola localStorage history
│   │   ├── context/
│   │   │   └── ThemeContext.jsx     # Context untuk dark/light mode global
│   │   ├── services/
│   │   │   └── weatherApi.js        # Fungsi fetch ke backend API
│   │   ├── utils/
│   │   │   └── formatters.js        # Helper: format suhu, waktu, kecepatan angin
│   │   ├── App.jsx                  # Root component
│   │   ├── main.jsx                 # Entry point React
│   │   └── index.css                # Tailwind directives (@tailwind base/components/utilities)
│   ├── .env                         # VITE_API_BASE_URL (JANGAN di-commit)
│   ├── .env.example
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
└── README.md
```

---

## 5. Komponen React & Tanggung Jawabnya

### `App.jsx`
- Root component, mengatur layout utama.
- Menginisialisasi `ThemeContext`.
- Merender: `ThemeToggle`, `SearchBar`, `HistoryChips`, `WeatherCard`, `ForecastList`, `ErrorMessage`, `LoadingSpinner`.

### `SearchBar.jsx`
- Input field untuk nama kota.
- Tombol "Cari" (submit).
- Tombol "Lokasi Saya" (trigger geolocation) — sembunyikan jika browser tidak support.
- Emit event `onSearch(cityName)` dan `onGeolocate()` ke parent.

### `WeatherCard.jsx`
- Menerima prop `weatherData` (object dari API).
- Menampilkan: kota, negara, suhu, feels like, deskripsi, ikon, kelembapan, angin, visibility, tekanan, sunrise/sunset.

### `ForecastList.jsx` + `ForecastCard.jsx`
- `ForecastList` menerima prop `forecastData` (array 5 hari).
- Merender 5 `ForecastCard` secara horizontal (scroll pada mobile).
- `ForecastCard` menampilkan: nama hari, ikon, suhu maks/min, deskripsi.

### `HistoryChips.jsx`
- Menerima prop `history` (array string) dan callback `onSelect`, `onRemove`, `onClearAll`.
- Render chip per kota; masing-masing chip ada tombol "×".
- Tampil tombol "Hapus Semua" jika history tidak kosong.

### `ThemeToggle.jsx`
- Tombol ikon (matahari/bulan) di sudut kanan atas.
- Menggunakan `useContext(ThemeContext)` untuk toggle dan baca theme saat ini.

### `ErrorMessage.jsx`
- Menerima prop `message` (string).
- Hanya render jika `message` tidak null/kosong.

### `LoadingSpinner.jsx`
- Spinner animasi Tailwind, tampil saat `isLoading: true`.

---

## 6. Custom Hooks

### `useWeather.js`
```js
// Return value:
{
  weatherData,      // object | null
  forecastData,     // array | null
  isLoading,        // boolean
  error,            // string | null
  fetchByCity,      // (cityName: string) => void
  fetchByCoords,    // (lat: number, lon: number) => void
}
```

### `useHistory.js`
```js
// Return value:
{
  history,          // string[] — max 5 item, urutan terbaru duluan
  addToHistory,     // (cityName: string) => void
  removeFromHistory,// (cityName: string) => void
  clearHistory,     // () => void
}
// Storage key: localStorage["weather_history"]
```

---

## 7. ThemeContext

```jsx
// context/ThemeContext.jsx
export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Baca dari localStorage, fallback ke prefers-color-scheme
  const [theme, setTheme] = useState(...);

  const toggleTheme = () => { ... };

  // Terapkan class "dark" pada <html> atau <body> untuk Tailwind dark mode
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

> **Penting:** Tailwind dark mode harus dikonfigurasi dengan `darkMode: "class"` di `tailwind.config.js`.

---

## 8. Tailwind Dark Mode Setup

```js
// tailwind.config.js
export default {
  darkMode: "class",   // ← wajib, bukan "media"
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
```

Penggunaan di komponen:
```jsx
// Contoh WeatherCard.jsx
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-2xl shadow-lg p-6">
  ...
</div>
```

---

## 9. Service Layer (Frontend)

```js
// src/services/weatherApi.js

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export async function fetchWeatherByCity(city) {
  const res = await fetch(`${BASE_URL}/api/weather?city=${encodeURIComponent(city)}`);
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Terjadi kesalahan.");
  }
  return res.json();
}

export async function fetchWeatherByCoords(lat, lon) {
  const res = await fetch(`${BASE_URL}/api/weather?lat=${lat}&lon=${lon}`);
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Terjadi kesalahan.");
  }
  return res.json();
}

export async function fetchForecastByCity(city) {
  const res = await fetch(`${BASE_URL}/api/forecast?city=${encodeURIComponent(city)}`);
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Terjadi kesalahan.");
  }
  return res.json();
}
```

---

## 10. Environment Variables Frontend

**File: `frontend/.env`** (JANGAN di-commit)
```env
VITE_API_BASE_URL=http://localhost:8000
```

**File: `frontend/.env.example`** (boleh di-commit)
```env
VITE_API_BASE_URL=http://localhost:8000
```

> Semua env var Vite **wajib** diawali dengan `VITE_` agar bisa diakses via `import.meta.env`.

---

## 11. API Contract (Backend)

### `GET /api/weather`

**Query Params:**

| Param | Tipe | Wajib | Keterangan |
|-------|------|-------|------------|
| `city` | string | Kondisional | Nama kota (e.g., `Jakarta`) |
| `lat` | float | Kondisional | Latitude (jika pakai geolocation) |
| `lon` | float | Kondisional | Longitude (jika pakai geolocation) |

> Harus ada salah satu: `city` ATAU `lat`+`lon`.

**Response 200 (sukses):**
```json
{
  "city": "Jakarta",
  "country": "ID",
  "temperature": 32.5,
  "feels_like": 38.2,
  "description": "scattered clouds",
  "icon": "03d",
  "icon_url": "https://openweathermap.org/img/wn/03d@2x.png",
  "humidity": 75,
  "wind_speed": 14.4,
  "visibility": 10,
  "pressure": 1009,
  "sunrise": "05:48",
  "sunset": "17:52",
  "timezone_offset": 25200
}
```

**Response 404:**
```json
{
  "error": "city_not_found",
  "message": "Kota tidak ditemukan. Periksa ejaan dan coba lagi."
}
```

**Response 503:**
```json
{
  "error": "upstream_unavailable",
  "message": "Layanan cuaca sedang tidak tersedia. Coba beberapa saat lagi."
}
```

---

### `GET /api/forecast`

**Query Params:** Sama dengan `/api/weather`

**Response 200:**
```json
{
  "city": "Jakarta",
  "country": "ID",
  "forecast": [
    {
      "date": "2026-06-22",
      "day": "Minggu",
      "temp_max": 34.0,
      "temp_min": 27.5,
      "description": "light rain",
      "icon": "10d",
      "icon_url": "https://openweathermap.org/img/wn/10d@2x.png"
    }
  ]
}
```

---

### `GET /health`

**Response 200:**
```json
{ "status": "ok" }
```

---

## 12. Error Handling & Edge Cases

| Skenario | Perilaku yang Diharapkan |
|----------|--------------------------|
| Nama kota tidak valid | `ErrorMessage` tampil: "Kota tidak ditemukan." |
| Input kosong | Validasi di `SearchBar`: cegah submit, fokus ke input |
| API key tidak valid / expired | Backend return 500; frontend tampil pesan generic |
| OpenWeatherMap down | Backend return 503; frontend tampil "Layanan sementara tidak tersedia" |
| Network error | `fetch` throw error; frontend tampil "Periksa koneksi internetmu" |
| Geolocation ditolak | Tampil "Akses lokasi ditolak. Cari kota secara manual." |
| Geolocation timeout | Tampil "Tidak bisa mendapatkan lokasi. Coba lagi." |
| Browser tidak support geolocation | Sembunyikan tombol "Lokasi Saya" |

---

## 13. Konfigurasi Backend

**File: `backend/.env`** (JANGAN di-commit)
```env
OPENWEATHER_API_KEY=your_api_key_here
ALLOWED_ORIGINS=http://localhost:5173
```

**File: `backend/.env.example`**
```env
OPENWEATHER_API_KEY=
ALLOWED_ORIGINS=http://localhost:5173
```

> Port default Vite dev server adalah `5173`.

---

## 14. CORS (Backend)

```python
# main.py
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("ALLOWED_ORIGINS", "").split(","),
    allow_methods=["GET"],
    allow_headers=["*"],
)
```

---

## 15. Cara Menjalankan

### Backend
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# Edit .env: isi OPENWEATHER_API_KEY
uvicorn main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
# Pastikan VITE_API_BASE_URL=http://localhost:8000
npm run dev
# Akses di http://localhost:5173
```

---

## 16. Alur Kerja Aplikasi

```
App Mount
  ├─ ThemeProvider: baca localStorage["theme"] → set class "dark" pada <html>
  ├─ useHistory: baca localStorage["weather_history"] → render HistoryChips
  └─ (opsional) auto-search dari URL query param ?city=xxx

User mengetik kota → SearchBar onSearch(city)
  └─ useWeather.fetchByCity(city)
      ├─ set isLoading = true
      ├─ fetch /api/weather?city=...  →  set weatherData
      ├─ fetch /api/forecast?city=... →  set forecastData
      ├─ useHistory.addToHistory(city)
      └─ set isLoading = false

Klik chip history → SearchBar.onSearch(city) [alur sama seperti di atas]

Klik "Lokasi Saya"
  └─ navigator.geolocation.getCurrentPosition()
      ├─ sukses → useWeather.fetchByCoords(lat, lon)
      └─ gagal  → set error message

Klik ThemeToggle
  └─ ThemeContext.toggleTheme()
      └─ toggle class "dark" pada <html> → simpan ke localStorage["theme"]
```

---

## 17. Kriteria Selesai (Definition of Done)

- [ ] Backend berjalan di `localhost:8000`; `/health` return `{ "status": "ok" }`
- [ ] `npm run dev` frontend berjalan tanpa error di `localhost:5173`
- [ ] Pencarian nama kota menampilkan `WeatherCard` dengan data benar
- [ ] `ForecastList` menampilkan 5 hari prakiraan
- [ ] Geolocation bekerja dan memuat cuaca lokasi user
- [ ] `HistoryChips` menyimpan 5 kota terakhir; klik chip memicu pencarian
- [ ] Dark/light mode toggle berfungsi; preferensi tersimpan di localStorage
- [ ] Semua error case menampilkan `ErrorMessage` yang informatif (tidak blank/crash)
- [ ] Tampilan responsif di mobile (min 375px) dan desktop
- [ ] API key tidak pernah muncul di source atau network tab browser
- [ ] `.env` ada di `.gitignore` (backend dan frontend)
- [ ] Tidak ada Tailwind class yang di-hardcode untuk warna tanpa varian `dark:`

---

## 18. Out of Scope

- Autentikasi user / login
- Database atau penyimpanan server-side
- Push notification cuaca
- Unit test / integration test
- Deployment ke cloud (hanya local development)
- Animasi transisi halaman yang kompleks
- Multiple language / i18n

---

## 19. Referensi

- [OpenWeatherMap Current Weather API Docs](https://openweathermap.org/current)
- [OpenWeatherMap 5-Day Forecast API Docs](https://openweathermap.org/forecast5)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind Dark Mode Guide](https://tailwindcss.com/docs/dark-mode)
- [Daftar & ambil API Key gratis OpenWeatherMap](https://home.openweathermap.org/api_keys)