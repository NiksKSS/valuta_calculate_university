import { config } from './config.js';

// Статические курсы как запасной вариант на случай недоступности сети.
// Отношение к USD (за 1 USD).
const FALLBACK_RATES = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.5,
  RUB: 90.5,
  CNY: 7.22,
  INR: 83.9,
  CAD: 1.36,
  AUD: 1.53,
  CHF: 0.87,
  KZT: 473.2,
  BYN: 3.25,
  UAH: 41.2,
  TRY: 32.4,
  PLN: 3.99,
  SEK: 10.6,
  NOK: 10.8,
  BRL: 5.05,
  MXN: 17.1,
  ZAR: 18.4,
};

let cached = null;
let cachePromise = null;

function formatTime(date) {
  return new Date(date).toISOString();
}

async function fetchWithTimeout(url, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function fetchFromApi() {
  const res = await fetchWithTimeout(config.ratesApiUrl, config.fetchTimeoutMs);
  if (!res.ok) {
    throw new Error(`Rates API responded with status ${res.status}`);
  }
  const data = await res.json();
  if (!data || data.result !== 'success' || !data.rates) {
    throw new Error('Rates API returned unexpected payload');
  }
  return {
    base: data.base_code || 'USD',
    rates: data.rates,
    updatedAt: formatTime(Date.now()),
    source: 'api',
  };
}

function buildFallbackPayload() {
  return {
    base: config.defaultBase,
    rates: { ...FALLBACK_RATES },
    updatedAt: formatTime(Date.now()),
    source: 'fallback',
  };
}

function isFresh(payload) {
  return payload && Date.now() - new Date(payload.updatedAt).getTime() < config.cacheTtlMs;
}

export async function fetchRates({ force = false } = {}) {
  if (!force && isFresh(cached)) {
    return cached;
  }
  if (!force && cachePromise) {
    return cachePromise;
  }

  const task = (async () => {
    try {
      cached = await fetchFromApi();
    } catch (err) {
      if (isFresh(cached)) {
        return cached;
      }
      console.warn(`[rates] Falling back to static rates: ${err.message}`);
      cached = buildFallbackPayload();
    }
    return cached;
  })();

  cachePromise = task;
  try {
    return await task;
  } finally {
    cachePromise = null;
  }
}

export async function getRates() {
  return fetchRates();
}

export async function convertCurrency({ from, to, amount }) {
  const payload = await getRates();
  const { rates } = payload;

  if (!rates[from]) {
    const err = new Error(`Unknown currency: ${from}`);
    err.status = 400;
    throw err;
  }
  if (!rates[to]) {
    const err = new Error(`Unknown currency: ${to}`);
    err.status = 400;
    throw err;
  }

  // Курсы заданы относительно base (обычно USD). Пересчитываем через base.
  const base = payload.base || config.defaultBase;
  const valueInBase = base === from ? amount : amount / rates[from];
  const result = base === to ? valueInBase : valueInBase * rates[to];

  return {
    from,
    to,
    amount,
    result: Number(result.toFixed(4)),
    rate: Number((rates[to] / rates[from]).toFixed(6)),
    updatedAt: payload.updatedAt,
  };
}