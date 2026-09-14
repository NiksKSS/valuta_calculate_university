const COUNTRY_FLAGS = {
  USD: '🇺🇸', EUR: '🇪🇺', GBP: '🇬🇧', CHF: '🇨🇭', JPY: '🇯🇵',
  CNY: '🇨🇳', RUB: '🇷🇺', BYN: '🇧🇾', KZT: '🇰🇿', UAH: '🇺🇦',
  INR: '🇮🇳', CAD: '🇨🇦', AUD: '🇦🇺', NZD: '🇳🇿', SEK: '🇸🇪',
  NOK: '🇳🇴', DKK: '🇩🇰', PLN: '🇵🇱', TRY: '🇹🇷', BRL: '🇧🇷',
  MXN: '🇲🇽', ZAR: '🇿🇦', HKD: '🇭🇰', SGD: '🇸🇬', KRW: '🇰🇷',
  THB: '🇹🇭', AED: '🇦🇪', SAR: '🇸🇦', ILS: '🇮🇱', CZK: '🇨🇿',
  HUF: '🇭🇺', RON: '🇷🇴', BGN: '🇧🇬', ISK: '🇮🇸', VND: '🇻🇳',
  IDR: '🇮🇩', MYR: '🇲🇾', PHP: '🇵🇭', ARS: '🇦🇷', CLP: '🇨🇱',
  COP: '🇨🇴', PEN: '🇵🇪', UYU: '🇺🇾', EGP: '🇪🇬', NGN: '🇳🇬',
  PKR: '🇵🇰', BDT: '🇧🇩', LKR: '🇱🇰', KWD: '🇰🇼', QAR: '🇶🇦',
  BHD: '🇧🇭', OMR: '🇴🇲', JOD: '🇯🇴', MAD: '🇲🇦', DZD: '🇩🇿',
  TND: '🇹🇳', GEL: '🇬🇪', AMD: '🇦🇲', AZN: '🇦🇿', MDL: '🇲🇩',
  XAU: '🥇', XAG: '🥈', STN: '🇸🇹', CUC: '🇨🇺', CUP: '🇨🇺',
  PYG: '🇵🇾', BOB: '🇧🇴', GTQ: '🇬🇹', HNL: '🇭🇳', NIO: '🇳🇮',
  CRC: '🇨🇷', PAB: '🇵🇦', DOP: '🇩🇴', JMD: '🇯🇲', TTD: '🇹🇹',
  SLL: '🇸🇱', GHS: '🇬🇭', KES: '🇰🇪', TZS: '🇹🇿', UGX: '🇺🇬',
  MUR: '🇲🇺', ETB: '🇪🇹', MZN: '🇲🇿', AOA: '🇦🇴', BWP: '🇧🇼',
  GMD: '🇬🇲', MWK: '🇲🇼', ZMW: '🇿🇲', XCD: '🇦🇬', BBD: '🇧🇧',
  BSD: '🇧🇸', BZD: '🇧🇿', GYD: '🇬🇾', HTG: '🇭🇹', SRD: '🇸🇷',
  FJD: '🇫🇯', PGK: '🇵🇬', TOP: '🇹🇴', WST: '🇼🇸', VUV: '🇻🇺',
  SBD: '🇸🇧', KGS: '🇰🇬', TJS: '🇹🇯', TMT: '🇹🇲', UZS: '🇺🇿',
};

const CURRENCY_NAMES = {
  USD: 'доллар США', EUR: 'евро', GBP: 'фунт стерлингов', CHF: 'швейцарский франк',
  JPY: 'японская иена', CNY: 'китайский юань', RUB: 'российский рубль', BYN: 'белорусский рубль',
  KZT: 'казахский тенге', UAH: 'украинская гривна', INR: 'индийская рупия', CAD: 'канадский доллар',
  AUD: 'австралийский доллар', NZD: 'новозеландский доллар', SEK: 'шведская крона', NOK: 'норвежская крона',
  DKK: 'датская крона', PLN: 'польский злотый', TRY: 'турецкая лира', BRL: 'бразильский реал',
  MXN: 'мексиканский песо', ZAR: 'южноафриканский ранд', HKD: 'гонконгский доллар', SGD: 'сингапурский доллар',
  KRW: 'южнокорейская вона', THB: 'тайский бат', AED: 'дирхам ОАЭ', SAR: 'саудовский риял',
  ILS: 'израильский шекель', CZK: 'чешская крона', HUF: 'венгерский форинт', RON: 'румынский лей',
  BGN: 'болгарский лев', ISK: 'исландская крона', VND: 'вьетнамский донг', IDR: 'индонезийская рупия',
  MYR: 'малайзийский ринггит', PHP: 'филиппинское песо', ARS: 'аргентинское песо', CLP: 'чилийское песо',
  COP: 'колумбийское песо', PEN: 'перуанский соль', EGP: 'египетский фунт', NGN: 'нигерийская найра',
  PKR: 'пакистанская рупия', BDT: 'бангладешская така', LKR: 'шри-ланкийская рупия', KWD: 'кувейтский динар',
  QAR: 'катарский риал', MAD: 'марокканский дирхам', GEL: 'грузинский лари', AMD: 'армянский драм',
  AZN: 'азербайджанский манат', MDL: 'молдавский лей', XAU: 'золото (унция)', XAG: 'серебро (унция)',
};

function flagFor(code) {
  return COUNTRY_FLAGS[code] || '🪙';
}

function nameFor(code) {
  return CURRENCY_NAMES[code] || code;
}

function formatMoney(value) {
  if (!Number.isFinite(value)) return '—';
  const abs = Math.abs(value);
  const maxFrac = abs < 1 ? 6 : 2;
  return new Intl.NumberFormat('ru-RU', { maximumFractionDigits: maxFrac }).format(value);
}

function formatRate(value) {
  if (!Number.isFinite(value)) return '—';
  const abs = Math.abs(value);
  const digits = abs >= 1 ? 4 : 6;
  return new Intl.NumberFormat('ru-RU', { maximumFractionDigits: digits }).format(value);
}

function formatTimeLabel(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return `Курсы обновлены: ${d.toLocaleString('ru-RU', {
    day: '2-digit',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  })}`;
}

const state = {
  base: null,
  rates: null,
  updatedAt: null,
  from: null,
  to: null,
};

const $ = (id) => document.getElementById(id);

const amountInput = $('amount');
const resultOut = $('result');
const rateLine = $('rate-line');
const updatedEl = $('updated');
const errorBanner = $('error-banner');
const swapBtn = $('swap');
const tableBody = $('rates-table').querySelector('tbody');

const DEFAULT_FROM = 'USD';
const DEFAULT_TO = 'EUR';

const pickers = [];

function sortedCodes() {
  return Object.keys(state.rates).sort((a, b) => a.localeCompare(b));
}

function initPicker({ id, initial, onChange }) {
  const triggerEl = $(`${id}-trigger`);
  const dropdownEl = $(`${id}-dropdown`);
  const searchEl = $(`${id}-search`);
  const listEl = $(`${id}-list`);
  const codeEl = $(`${id}-code`);
  const flagEl = $(`${id}-flag`);

  let value = initial;
  let activeIndex = -1;

  function renderList(query = '') {
    const q = query.trim().toLowerCase();
    const codes = sortedCodes().filter(
      (c) =>
        !q ||
        c.toLowerCase().includes(q) ||
        nameFor(c).toLowerCase().includes(q)
    );

    // Без поиска показываем текущую валюту первой, как при открытии обычного списка
    if (!q && codes.length > 1 && codes[0] !== value) {
      const idx = codes.indexOf(value);
      if (idx > 0) {
        codes.splice(idx, 1);
        codes.unshift(value);
      }
    }

    listEl.innerHTML = '';
    activeIndex = -1;

    if (codes.length === 0) {
      const li = document.createElement('li');
      li.className = 'ccy-empty';
      li.textContent = 'Ничего не найдено';
      listEl.appendChild(li);
      return;
    }

    for (const code of codes) {
      const li = document.createElement('li');
      li.dataset.code = code;
      li.innerHTML =
        `<span class="flag">${flagFor(code)}</span>` +
        `<span class="code">${code}</span>` +
        `<span class="name">${nameFor(code)}</span>`;
      listEl.appendChild(li);
    }

    const current = codes.indexOf(value);
    activeIndex = q ? 0 : current >= 0 ? current : 0;
    highlight();
  }

  function highlight() {
    for (const li of listEl.children) {
      if (!li.classList.contains('ccy-empty')) {
        li.classList.toggle('active', li === listEl.children[activeIndex]);
      }
    }
    const target = listEl.children[activeIndex];
    if (target) target.scrollIntoView({ block: 'nearest' });
  }

  function open() {
    for (const p of pickers) p.close();
    dropdownEl.hidden = false;
    triggerEl.setAttribute('aria-expanded', 'true');
    renderList();
    searchEl.value = '';
    searchEl.focus();
  }

  function close() {
    dropdownEl.hidden = true;
    triggerEl.setAttribute('aria-expanded', 'false');
  }

  function select(code) {
    value = code;
    codeEl.textContent = code;
    flagEl.textContent = flagFor(code);
    close();
    onChange(code);
  }

  function isOpen() {
    return !dropdownEl.hidden;
  }

  triggerEl.addEventListener('click', () => {
    if (isOpen()) {
      close();
    } else {
      open();
    }
  });

  searchEl.addEventListener('input', () => renderList(searchEl.value));

  searchEl.addEventListener('keydown', (e) => {
    const items = listEl.querySelectorAll('li:not(.ccy-empty)');
    if (items.length === 0) return;

    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const step = e.key === 'ArrowDown' ? 1 : -1;
      activeIndex = (activeIndex + step + items.length) % items.length;
      highlight();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (items[activeIndex]) select(items[activeIndex].dataset.code);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      close();
    }
  });

  // Открытые списки не должны терять фокус при клике по пункту
  dropdownEl.addEventListener('mousedown', (e) => {
    const li = e.target.closest('li');
    if (li && li.dataset.code) {
      e.preventDefault();
      select(li.dataset.code);
    }
  });

  pickers.push({ close });

  return {
    setValue(code) {
      value = code;
      codeEl.textContent = code;
      flagEl.textContent = flagFor(code);
    },
    get value() {
      return value;
    },
  };
}

async function loadRates() {
  errorBanner.hidden = true;
  updatedEl.textContent = 'Загрузка курсов…';

  try {
    const res = await fetch('/api/rates');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    state.base = data.base;
    state.rates = data.rates;
    state.updatedAt = data.updatedAt;

    const codes = sortedCodes();
    state.from = codes.includes(DEFAULT_FROM) ? DEFAULT_FROM : codes[0];
    state.to = codes.includes(DEFAULT_TO) ? DEFAULT_TO : codes[0];

    $('rates-count').textContent = `${codes.length} валют`;

    fromPicker.setValue(state.from);
    toPicker.setValue(state.to);
    basePicker.setValue(state.base);

    render();
  } catch {
    showError('Не удалось получить курсы валют. Проверьте подключение к интернету или попробуйте обновить страницу.');
    updatedEl.textContent = 'Курсы недоступны';
  }
}

// Пункеры создаются сразу, список валют наполняется при загрузке курсов
const fromPicker = initPicker({
  id: 'from',
  initial: DEFAULT_FROM,
  onChange: (code) => {
    state.from = code;
    convertFromAmount();
  },
});

const toPicker = initPicker({
  id: 'to',
  initial: DEFAULT_TO,
  onChange: (code) => {
    state.to = code;
    convertFromAmount();
  },
});

const basePicker = initPicker({
  id: 'rates',
  initial: DEFAULT_FROM,
  onChange: (code) => {
    state.base = code;
    renderTable();
    updatedEl.textContent = formatTimeLabel(state.updatedAt) || 'Курсы загружены';
  },
});

function render() {
  convertFromAmount();
  renderTable();
  updatedEl.textContent = formatTimeLabel(state.updatedAt) || 'Курсы загружены';
}

function rate(from, to) {
  const base = state.base;
  if (base === from) {
    return base === to ? 1 : state.rates[to];
  }
  if (base === to) {
    return 1 / state.rates[from];
  }
  return state.rates[to] / state.rates[from];
}

function convertFromAmount() {
  const from = state.from;
  const to = state.to;
  const raw = parseFloat(amountInput.value);
  const amount = Number.isNaN(raw) ? 0 : Math.max(0, raw);

  if (!state.rates || !state.rates[from] || !state.rates[to]) return;

  const valueInBase = amount / state.rates[from];
  const result = valueInBase * state.rates[to];

  resultOut.textContent = formatMoney(result);
  rateLine.textContent =
    `1 ${from} = ${formatRate(rate(from, to))} ${to} · 1 ${to} = ${formatRate(1 / rate(from, to))} ${from}`;
}

function renderTable() {
  const base = state.base;
  if (!state.rates || !state.rates[base]) return;

  const rows = sortedCodes()
    .map((code) => {
      const value = state.rates[code] / state.rates[base];
      return { code, value };
    })
    .filter((r) => r.code !== base)
    .sort((a, b) => a.value - b.value);

  tableBody.innerHTML = '';

  // Базовая строка сверху
  tableBody.appendChild(buildRow(base, 1, true));

  for (const { code, value } of rows) {
    tableBody.appendChild(buildRow(code, value, false));
  }
}

function buildRow(code, value, isBase) {
  const tr = document.createElement('tr');
  if (isBase) tr.style.background = 'rgba(91, 108, 255, 0.08)';

  const ccyCell = document.createElement('td');
  const ccyWrap = document.createElement('div');
  ccyWrap.className = 'ccy-cell';
  ccyWrap.innerHTML = `<span class="flag">${flagFor(code)}</span><span class="code">${code}</span><span class="name">${nameFor(code)}</span>`;
  ccyCell.appendChild(ccyWrap);

  const rateTd = document.createElement('td');
  rateTd.className = 'num';
  if (isBase) {
    rateTd.innerHTML = '<span class="rate-txt">1.0000</span>';
  } else {
    rateTd.innerHTML = `<span class="rate-txt">${formatRate(value)}</span>`;
  }

  const inverseTd = document.createElement('td');
  inverseTd.className = 'num inverse';
  inverseTd.innerHTML = `1 ${code} = ${formatRate(1 / value)} ${state.base}`;

  tr.appendChild(ccyCell);
  tr.appendChild(rateTd);
  tr.appendChild(inverseTd);
  return tr;
}

function showError(message) {
  errorBanner.textContent = message;
  errorBanner.hidden = false;
}

// Клик вне любого комбобокса закрывает открытый список
document.addEventListener('mousedown', (e) => {
  if (!e.target.closest('.ccy-select') && !e.target.closest('.rates-base')) {
    for (const p of pickers) p.close();
  }
});

amountInput.addEventListener('input', convertFromAmount);

swapBtn.addEventListener('click', () => {
  const tmp = state.from;
  state.from = state.to;
  state.to = tmp;

  fromPicker.setValue(state.from);
  toPicker.setValue(state.to);

  swapBtn.classList.remove('spin');
  void swapBtn.offsetWidth;
  swapBtn.classList.add('spin');

  convertFromAmount();
});

loadRates();