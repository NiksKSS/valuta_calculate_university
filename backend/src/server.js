import express from 'express';
import { config } from './config.js';
import { getRates, convertCurrency } from './rates.js';

const app = express();

app.use(express.json());

// Разрешаем запросы с любого origin (полезно при локальной разработке
// и при прямом доступе к контейнеру backend).
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  return next();
});

function sendError(res, status, message) {
  return res.status(status).json({ error: message });
}

function parseAmount(raw) {
  const value = Number(raw);
  if (raw === undefined || raw === null || raw === '') {
    return { error: 'Missing or empty "amount" parameter' };
  }
  if (Number.isNaN(value)) {
    return { error: '"amount" must be a valid number' };
  }
  if (!Number.isFinite(value)) {
    return { error: '"amount" must be a finite number' };
  }
  if (value < 0) {
    return { error: '"amount" cannot be negative' };
  }
  return { value };
}

function normalizeCurrency(code) {
  if (typeof code !== 'string') {
    return null;
  }
  const normalized = code.trim().toUpperCase();
  return normalized.length === 3 ? normalized : null;
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.get('/api/rates', async (req, res) => {
  try {
    const payload = await getRates();
    res.json(payload);
  } catch (err) {
    console.error('[server] Failed to load rates:', err.message);
    sendError(res, 500, 'Failed to load exchange rates. Please try again later.');
  }
});

app.get('/api/convert', async (req, res) => {
  const from = normalizeCurrency(req.query.from);
  const to = normalizeCurrency(req.query.to);
  const amount = parseAmount(req.query.amount);

  if (!from) {
    return sendError(res, 400, '"from" must be a 3-letter currency code, e.g. USD');
  }
  if (!to) {
    return sendError(res, 400, '"to" must be a 3-letter currency code, e.g. EUR');
  }
  if (amount.error) {
    return sendError(res, 400, amount.error);
  }

  try {
    const result = await convertCurrency({ from, to, amount: amount.value });
    res.json(result);
  } catch (err) {
    if (err.status === 400) {
      return sendError(res, 400, err.message);
    }
    console.error('[server] Conversion failed:', err.message);
    return sendError(res, 500, 'Conversion failed. Please try again later.');
  }
});

app.use((req, res) => {
  sendError(res, 404, 'Not found');
});

app.use((err, req, res, next) => {
  console.error('[server] Unhandled error:', err);
  sendError(res, 500, 'Internal server error');
});

app.listen(config.port, () => {
  console.log(`[server] Currency API listening on port ${config.port}`);
});