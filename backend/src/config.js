export const config = {
  port: Number(process.env.PORT || 3000),
  ratesApiUrl: process.env.RATES_API_URL || 'https://open.er-api.com/v6/latest/USD',
  cacheTtlMs: Number(process.env.CACHE_TTL_MS || 10 * 60 * 1000),
  fetchTimeoutMs: Number(process.env.FETCH_TIMEOUT_MS || 8000),
  defaultBase: 'USD',
};