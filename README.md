# Валютный калькулятор (Currency Converter)

Современный веб-конвертер валют с чистым интерфейсом, оптимизированным для ноутбуков и десктопов. Проект состоит из двух частей — **backend** и **frontend** — и полностью запускается через **Docker** одной командой.

![Стек](https://img.shields.io/badge/backend-Node.js%20%2B%20Express-339933?logo=node.js&logoColor=white)
![Стек](https://img.shields.io/badge/frontend-HTML%20%2B%20CSS%20%2B%20JS-f7df1e?logo=javascript&logoColor=black)
![Докер](https://img.shields.io/badge/docker-compose-2496ed?logo=docker&logoColor=white)

---

## ✨ Возможности

- 💱 Конвертация между **160+ валютами** в режиме реального времени
- 🔄 Кнопка «Поменять местами» для быстрой обратной конвертации
- 📊 Таблица курсов относительно выбранной базовой валюты
- 🕐 Курсы обновляются автоматически (раз в 10 минут, кэшируются на сервере)
- 🛡 Тщательная обработка ошибок: некорректные суммы, недоступность сети
- 🎨 Чистый современный дизайн, рассчитанный на ноутбуки и десктопы

---

## 🧱 Архитектура

```
┌────────────┐   http://localhost:8080   ┌────────────┐   /api   ┌────────────────┐
│  Браузер   │ ─────────────────────────> │   Nginx    │ ──────> │ Node.js backend │
│  (HTML/CSS)│ <────────────────────────   │  (frontend)│ <────── │ (Express)      │
└────────────┘          статика           └────────────┘   JSON  └────────────────┘
                                                       │
                                                       ▼
                                         https://open.er-api.com/v6/latest/USD
                                          (бесплатный API курсов, без ключей)
```

| Контейнер | Роль | Порт |
|-----------|------|------|
| `valuta-frontend` | Nginx: раздаёт статику (HTML/CSS/JS) и проксирует `/api` на backend | **8080** (наружу) |
| `valuta-backend` | Express API: курсы из открытого API с кэшем и fallback | 3000 (внутри сети) |

Оба контейнера общаются внутри общей docker-сети и наружу выставляется только порт `8080`.

---

## 🚀 Быстрый старт

Ниже — подробная пошаговая инструкция с самого начала.

### Шаг 1. Установите Docker

Для запуска понадобится **Docker** с поддержкой **Docker Compose** (он входит в состав Docker Desktop).

**macOS / Windows:** установите [Docker Desktop](https://www.docker.com/products/docker-desktop/), запустите его и дождитесь, пока в строке состояния появится сообщение «Docker Desktop is running».

Проверьте, что всё установилось правильно:

```bash
docker --version
docker compose version
```

Обе команды должны вывести номер версии — например, `Docker version 29.2.1` и `Docker Compose version v5.1.0`.

> **Linux (Ubuntu/Debian):** Docker Desktop не нужен — установите пакеты `docker.io` и `docker-compose-plugin` или следуйте [официальной инструкции](https://docs.docker.com/engine/install/).

### Шаг 2. Клонируйте репозиторий

Скопируйте ссылку на ваш GitHub-репозиторий и выполните в терминале:

```bash
git clone https://github.com/NiksKSS/valuta_calculate_university.git
cd valuta_calculate_university
```

### Шаг 3. Запустите проект

Из **корня проекта** (там, где лежит `docker-compose.yml`) выполните:

```bash
docker compose up --build
```

Команда:
1. соберёт образы backend и frontend,
2. создаст docker-сеть,
3. запустит контейнеры и дождётся, пока backend станет «здоров» (healthcheck).

Первая сборка займёт несколько минут (скачиваются базовые образы Node и Nginx). При повторном запуске она происходит мгновенно.

### Шаг 4. Откройте сайт

Перейдите в браузере на адрес:

```
http://localhost:8080
```

Готово! Можно конвертировать валюты — курсы подтянутся из живого API.

Чтобы убедиться, что API работает, можно открыть:

```bash
# проверить здоровье
curl http://localhost:8080/api/health

# конвертировать 100 USD в EUR
curl "http://localhost:8080/api/convert?from=USD&to=EUR&amount=100"

# получить все курсы
curl http://localhost:8080/api/rates
```

---

## 🛑 Остановка проекта

В терминале, где запущен `docker compose up`, нажмите `Ctrl+C`.

Либо из другого терминала «мягко» остановите сервисы (контейнеры останутся):

```bash
docker compose stop
```

Полное удаление контейнеров и сети:

```bash
docker compose down
```

> Для macOS/Windows можно остановить всё разом: `docker compose down` останавливает и убирает контейнеры, а `docker compose stop` — только останавливает.

---

## ⚙️ Настройка (переменные окружения)

Всё настраивается через переменные окружения в файле `docker-compose.yml` (или в файле `.env` рядом с ним).

| Переменная | Значение по умолчанию | Описание |
|------------|----------------------|----------|
| `PORT` | `3000` | Порт backend внутри контейнера |
| `RATES_API_URL` | `https://open.er-api.com/v6/latest/USD` | Адрес API курсов |
| `CACHE_TTL_MS` | `600000` | Как долго кэшировать курсы (10 минут) |
| `FETCH_TIMEOUT_MS` | `8000` | Тайм-аут запроса к API курсов (мс) |

Пример файла `.env`:

```bash
# .env
RATES_API_URL=https://open.er-api.com/v6/latest/USD
CACHE_TTL_MS=600000
```

Если открытый API недоступен (нет интернета), backend автоматически переключится на **встроенные статические курсы**, и сайт продолжит работать.

---

## 🔌 Документация API

### `GET /api/rates`

Все актуальные курсы относительно базовой валюты.

```bash
curl http://localhost:8080/api/rates
```

```json
{
  "base": "USD",
  "rates": { "USD": 1, "EUR": 0.862246, "RUB": 84.2391 },
  "updatedAt": "2026-09-14T09:48:48.171Z",
  "source": "api"
}
```

> Пример усечён — в поле `rates` реально возвращаются курсы 160+ валют.

### `GET /api/convert?from=USD&to=EUR&amount=100`

Конвертация суммы из одной валюты в другую.

```bash
curl "http://localhost:8080/api/convert?from=USD&to=EUR&amount=100"
```

```json
{
  "from": "USD",
  "to": "EUR",
  "amount": 100,
  "result": 86.2246,
  "rate": 0.862246,
  "updatedAt": "2026-09-14T09:48:48.171Z"
}
```

Ошибки возвращаются с HTTP-кодом и понятным сообщением:

| Код | Пример |
|-----|--------|
| `400` | неизвестная валюта, отрицательная или некорректная сумма |
| `404` | несуществующий путь |
| `500` | недоступен источник курсов |

---

## 📁 Структура проекта

```
valuta_calculate_university/
├── docker-compose.yml         # оркестрация двух сервисов
├── .gitignore
├── README.md
├── backend/                   # Express API
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│       ├── config.js          # настройки через переменные окружения
│       ├── rates.js           # загрузка курсов, кэш, fallback
│       └── server.js          # HTTP-эндпоинты
└── frontend/                  # Nginx + статика
    ├── Dockerfile
    ├── nginx.conf             # раздача статики + прокси /api
    └── public/
        ├── index.html
        ├── style.css
        └── app.js
```

---


## 🖥 Стек технологий

- **Backend:** Node.js 20, Express 4
- **Frontend:** чистые HTML5 / CSS3 / JavaScript (без сборщиков и фреймворков)
- **Раздача:** Nginx (кэш, сжатие gzip, проксирование API)
- **Контейнеризация:** Docker, Docker Compose
- **Источник курсов:** [open.er-api.com](https://open.er-api.com) (бесплатно, без регистрации)

---

## 📄 Лицензия

MIT.