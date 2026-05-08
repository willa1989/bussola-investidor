// ═══════════════════════════════════════════════════════════════════
// MÓDULO EUA v2 — Ações Americanas (NYSE / NASDAQ) via Brapi
// Análise profunda: TTM · Gráfico · Pares · Dividendos · IA
// Para integrar: adicionar <script src="usa_module_final.js"></script>
// antes do </body> no index.html
// ═══════════════════════════════════════════════════════════════════

(function() {

var USA_CSS_V2 = `
.usa-wrap { font-family:'DM Sans',sans-serif; }
.usa-topbar { display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px; margin-bottom:1.5rem; }
.usa-topbar-left { display:flex; align-items:center; gap:12px; }
.usa-flag-big { font-size:2rem; line-height:1; }
.usa-topbar-title { font-family:'Playfair Display',serif; font-size:1.3rem; color:#F3F4F8; }
.usa-topbar-sub { font-size:0.78rem; color:var(--muted); margin-top:3px; }
.usa-exchange-badge { font-size:0.7rem; padding:0.22rem 0.7rem; background:rgba(59,130,246,0.12); color:#3B82F6; border:0.5px solid rgba(59,130,246,0.25); border-radius:20px; font-weight:500; }
.usa-search-bar { display:flex; background:rgba(255,255,255,0.04); border:0.5px solid var(--border2); border-radius:12px; padding:4px; margin-bottom:1rem; transition:border-color 0.2s; }
.usa-search-bar:focus-within { border-color:var(--gold); }
.usa-search-bar input { flex:1; background:transparent; border:none; outline:none; padding:0.6rem 0.85rem; color:var(--text); font-size:0.95rem; font-family:'DM Sans',sans-serif; }
.usa-search-bar input::placeholder { color:var(--muted2); }
.usa-search-go { background:var(--gold); color:var(--dark); border:none; border-radius:9px; padding:0.6rem 1.4rem; font-size:0.9rem; font-weight:700; cursor:pointer; font-family:'DM Sans',sans-serif; transition:opacity 0.2s; white-space:nowrap; }
.usa-search-go:hover { opacity:0.88; }
.usa-sugs-title { font-size:0.65rem; text-transform:uppercase; letter-spacing:0.08em; color:var(--muted); margin-bottom:8px; }
.usa-sugs-grid { display:flex; flex-wrap:wrap; gap:6px; margin-bottom:1.5rem; }
.usa-sug-pill { display:flex; align-items:center; gap:8px; background:var(--dark2); border:0.5px solid var(--border); border-radius:10px; padding:0.5rem 0.85rem; cursor:pointer; transition:all 0.2s; font-family:'DM Sans',sans-serif; }
.usa-sug-pill:hover { border-color:rgba(201,168,76,0.4); background:rgba(201,168,76,0.05); transform:translateY(-1px); }
.usa-sug-ticker { font-size:0.85rem; font-weight:600; color:#F3F4F8; }
.usa-sug-name { font-size:0.7rem; color:var(--muted); }
.usa-sug-price { font-size:0.82rem; color:var(--gold); font-variant-numeric:tabular-nums; }
.usa-sug-chg { font-size:0.72rem; font-weight:500; }
.usa-cambio-strip { display:flex; align-items:center; gap:12px; background:rgba(59,130,246,0.06); border:0.5px solid rgba(59,130,246,0.18); border-radius:10px; padding:0.6rem 1rem; margin-bottom:1.5rem; flex-wrap:wrap; }
.usa-cambio-item { display:flex; align-items:center; gap:6px; font-size:0.78rem; color:var(--muted); }
.usa-cambio-val { font-weight:600; color:#3B82F6; }
.usa-cambio-div { width:1px; height:16px; background:var(--border); }
.usa-qcard { background:var(--dark2); border:0.5px solid var(--border); border-radius:14px; padding:1.5rem; margin-bottom:1rem; transition:border-color 0.2s; }
.usa-qcard-header { display:flex; align-items:flex-start; justify-content:space-between; flex-wrap:wrap; gap:12px; margin-bottom:1.25rem; }
.usa-company-info { display:flex; align-items:center; gap:10px; }
.usa-company-logo { width:36px; height:36px; border-radius:8px; background:rgba(201,168,76,0.1); border:0.5px solid rgba(201,168,76,0.2); display:flex; align-items:center; justify-content:center; font-size:1rem; flex-shrink:0; }
.usa-ticker-lg { font-family:'Playfair Display',serif; font-size:1.8rem; color:#F3F4F8; line-height:1; }
.usa-company-name { font-size:0.78rem; color:var(--muted); margin-top:2px; }
.usa-sector-badge { font-size:0.65rem; padding:0.18rem 0.6rem; background:rgba(139,92,246,0.12); color:#8B5CF6; border:0.5px solid rgba(139,92,246,0.25); border-radius:10px; margin-top:4px; display:inline-block; }
.usa-price-block { text-align:right; }
.usa-price-usd { font-family:'Playfair Display',serif; font-size:2.4rem; color:#F3F4F8; line-height:1; font-variant-numeric:tabular-nums; letter-spacing:-0.02em; }
.usa-price-brl-equiv { font-size:0.82rem; color:var(--muted); margin-top:3px; }
.usa-chg-pill { display:inline-flex; align-items:center; font-size:0.88rem; font-weight:500; padding:0.28rem 0.8rem; border-radius:20px; margin-top:5px; }
.usa-chg-pill.up { background:rgba(29,185,84,0.12); color:#1DB954; }
.usa-chg-pill.dn { background:rgba(231,76,60,0.12); color:#E74C3C; }
.usa-meta-row { font-size:0.75rem; color:var(--muted); margin-bottom:1.1rem; }
.usa-ttm-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(120px,1fr)); gap:8px; }
.usa-ttm-card { background:var(--dark3); border-radius:9px; padding:0.75rem 0.85rem; }
.usa-ttm-lbl { font-size:0.63rem; text-transform:uppercase; letter-spacing:0.06em; color:var(--muted); margin-bottom:4px; }
.usa-ttm-val { font-size:0.95rem; font-weight:500; font-variant-numeric:tabular-nums; }
.usa-ttm-val.gold   { color:var(--gold); }
.usa-ttm-val.green  { color:#1DB954; }
.usa-ttm-val.red    { color:#E74C3C; }
.usa-ttm-val.blue   { color:#3B82F6; }
.usa-ttm-val.purple { color:#8B5CF6; }
.usa-ttm-sub { font-size:0.68rem; color:var(--muted2); margin-top:2px; }
.usa-chart-card { background:var(--dark2); border:0.5px solid var(--border); border-radius:14px; padding:1.25rem; margin-bottom:1rem; }
.usa-chart-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:1rem; flex-wrap:wrap; gap:8px; }
.usa-chart-title-txt { font-size:0.72rem; text-transform:uppercase; letter-spacing:0.07em; color:var(--muted); }
.usa-period-tabs { display:flex; gap:3px; }
.usa-ptab { padding:0.28rem 0.75rem; border-radius:6px; font-size:0.75rem; color:var(--muted); cursor:pointer; border:0.5px solid transparent; background:none; font-family:'DM Sans',sans-serif; transition:all 0.2s; }
.usa-ptab.active { border-color:var(--gold); color:var(--gold); }
.usa-chart-wrap { position:relative; height:280px; width:100%; }
.usa-chart-src { font-size:0.68rem; color:var(--muted2); margin-top:0.5rem; opacity:0.7; }
.usa-section { margin-bottom:1.25rem; }
.usa-section-title { font-size:0.65rem; text-transform:uppercase; letter-spacing:0.1em; color:var(--gold); margin-bottom:0.85rem; padding-bottom:0.5rem; border-bottom:0.5px solid var(--border); display:flex; align-items:center; gap:8px; }
.usa-fin-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(150px,1fr)); gap:10px; }
.usa-fin-card { background:var(--dark3); border-radius:10px; padding:0.85rem 1rem; }
.usa-fin-lbl { font-size:0.65rem; text-transform:uppercase; letter-spacing:0.05em; color:var(--muted); margin-bottom:5px; }
.usa-fin-val { font-size:0.95rem; font-weight:500; font-variant-numeric:tabular-nums; }
.usa-fin-val.up { color:#1DB954; }
.usa-fin-val.dn { color:#E74C3C; }
.usa-fin-val.gold { color:var(--gold); }
.usa-fin-sub { font-size:0.68rem; color:var(--muted2); margin-top:3px; }
.usa-peer-row { display:grid; grid-template-columns:70px 90px 55px 65px 65px 65px 1fr; gap:6px; align-items:center; padding:0.55rem 0.75rem; border-radius:9px; border:0.5px solid var(--border); margin-bottom:6px; font-size:0.82rem; }
.usa-peer-row.main { background:rgba(201,168,76,0.06); border-color:rgba(201,168,76,0.3); }
.usa-peer-row:hover { border-color:rgba(201,168,76,0.25); cursor:pointer; }
.usa-peer-header { font-size:0.63rem; text-transform:uppercase; letter-spacing:0.05em; color:var(--muted); padding:0 0.75rem 0.4rem; display:grid; grid-template-columns:70px 90px 55px 65px 65px 65px 1fr; gap:6px; }
.usa-ai-badge { display:flex; align-items:center; gap:7px; font-size:0.72rem; color:var(--gold); background:rgba(201,168,76,0.08); border:0.5px solid rgba(201,168,76,0.22); padding:0.28rem 0.85rem; border-radius:20px; }
.usa-ai-dot { width:5px; height:5px; border-radius:50%; background:var(--gold); animation:pulse 2s infinite; }
.usa-empty { text-align:center; padding:3rem 1rem; }
.usa-empty-icon { font-size:3.5rem; margin-bottom:1rem; }
.usa-empty-title { font-family:'Playfair Display',serif; font-size:1.2rem; color:var(--muted); }
.usa-empty-sub { font-size:0.85rem; color:var(--muted2); margin-top:0.4rem; }
`;

var USA_TICKERS = [
    { t:'AAPL',  n:'Apple Inc.',           emoji:'🍎', setor:'Technology',            ex:'NASDAQ' },
    { t:'MSFT',  n:'Microsoft',            emoji:'🪟', setor:'Technology',            ex:'NASDAQ' },
    { t:'NVDA',  n:'NVIDIA Corp.',         emoji:'🟢', setor:'Semicondutores',        ex:'NASDAQ' },
    { t:'GOOGL', n:'Alphabet (Google)',    emoji:'🔍', setor:'Communication Services', ex:'NASDAQ' },
    { t:'AMZN',  n:'Amazon.com',           emoji:'📦', setor:'Consumer Cyclical',     ex:'NASDAQ' },
    { t:'MELI',  n:'MercadoLibre',         emoji:'🛒', setor:'E-commerce LatAm',      ex:'NASDAQ' },
    { t:'KO',    n:'Coca-Cola Co.',        emoji:'🥤', setor:'Consumer Defensive',    ex:'NYSE'   },
    { t:'V',     n:'Visa Inc.',            emoji:'💳', setor:'Financial Services',    ex:'NYSE'   },
    { t:'JPM',   n:'JPMorgan Chase',       emoji:'🏦', setor:'Financials',            ex:'NYSE'   },
    { t:'DIS',   n:'Walt Disney Co.',      emoji:'🏰', setor:'Communication Services', ex:'NYSE'  },
];

var USA_PEERS_MAP = {
    'Technology':             ['AAPL','MSFT','GOOGL','NVDA','META'],
    'Semicondutores':         ['NVDA','AMD','INTC','QCOM','AVGO'],
    'Consumer Cyclical':      ['AMZN','TSLA','HD','NKE','MCD'],
    'E-commerce LatAm':       ['MELI','AMZN','SHOP','SE'],
    'Consumer Defensive':     ['KO','PEP','PG','JNJ','WMT'],
    'Financial Services':     ['V','MA','PYPL','AXP','JPM'],
    'Financials':              ['JPM','BAC','GS','MS','WFC'],
    'Communication Services': ['GOOGL','META','NFLX','DIS','T'],
};

var USA_V2 = { chart:null, currentTicker:null, sugPrices:{}, loadingSugs:false };

function usa2_usd(v, dec) {
    if (v == null || isNaN(v) || v === 0) return '—';
    dec = dec !== undefined ? dec : 2;
    return 'US$ ' + (+v).toLocaleString('en-US', {minimumFractionDigits:dec, maximumFractionDigits:dec});
}
function usa2_brl(v) {
    if (v == null || isNaN(v)) return '—';
    return 'R$ ' + (+v).toLocaleString('pt-BR', {minimumFractionDigits:2, maximumFractionDigits:2});
}
function usa2_num(v) {
    if (v == null || isNaN(v)) return '—';
    var n = +v;
    if (Math.abs(n) >= 1e12) return 'US$ ' + (n/1e12).toFixed(2) + 'T';
    if (Math.abs(n) >= 1e9)  return 'US$ ' + (n/1e9).toFixed(2)  + 'B';
    if (Math.abs(n) >= 1e6)  return 'US$ ' + (n/1e6).toFixed(2)  + 'M';
    return 'US$ ' + n.toFixed(2);
}
function usa2_pct(v) {
    if (v == null || isNaN(v)) return '—';
    return (v >= 0 ? '+' : '') + (+v).toFixed(2) + '%';
}
function usa2_cambio() { return (window.MACRO_CACHE && window.MACRO_CACHE.camFocus) || 5.70; }
function usa2_x(v, dec) {
    if (v == null || isNaN(v)) return '—';
    return (+v).toFixed(dec || 1) + 'x';
}

function usa2_injectCSS() {
    if (!document.getElementById('usa-v2-style')) {
        var s = document.createElement('style');
        s.id = 'usa-v2-style';
        s.textContent = USA_CSS_V2;
        document.head.appendChild(s);
    }
}

async function usa2_fetch(ticker) {
    var bt = (typeof getBT === 'function') ? getBT() : '';
    var url = 'https://brapi.dev/api/quote/' + ticker.toUpperCase()
        + '?fundamental=true' + (bt ? '&token=' + bt : '');
    var r = await fetch(url);
    if (!r.ok) throw new Error('Ticker "' + ticker + '" não encontrado');
    var d = await r.json();
    if (!d.results || !d.results[0]) throw new Error('Sem dados para "' + ticker + '"');
    return d.results[0];
}

async function usa2_fetchHist(ticker, range, interval) {
    var bt = (typeof getBT === 'function') ? getBT() : '';
    var url = 'https://brapi.dev/api/quote/' + ticker.toUpperCase()
        + '?range=' + range + '&interval=' + interval + (bt ? '&token=' + bt : '');
    var r = await fetch(url);
    var d = await r.json();
    return (d.results && d.results[0] && d.results[0].historicalDataPrice) || [];
}

async function usa2_loadSugPrices() {
    if (USA_V2.loadingSugs) return;
    USA_V2.loadingSugs = true;
    var bt = (typeof getBT === 'function') ? getBT() : '';
    try {
        var tickers = USA_TICKERS.map(function(u){ return u.t; }).join(',');
        var url = 'https://brapi.dev/api/quote/' + tickers + (bt ? '?token=' + bt : '');
        var r = await fetch(url);
        var d = await r.json();
        if (d.results) {
            d.results.forEach(function(q) {
                USA_V2.sugPrices[q.symbol] = { price: q.regularMarketPrice, chgPct: q.regularMarketChangePercent };
            });
            usa2_renderSugPills();
        }
    } catch(e) {}
    USA_V2.loadingSugs = false;
}

function usa2_renderSugPills() {
    var container = document.getElementById('usa-sug-grid');
    if (!container) return;
    container.innerHTML = USA_TICKERS.map(function(u) {
        var p = USA_V2.sugPrices[u.t];
        var priceStr = p ? 'US$ ' + p.price.toFixed(2) : '';
        var chgStr   = p ? usa2_pct(p.chgPct) : '';
        var chgCls   = p ? (p.chgPct >= 0 ? 'color:#1DB954' : 'color:#E74C3C') : 'color:var(--muted)';
        return '<div class="usa-sug-pill" onclick="usa2_search(\'' + u.t + '\')">'
            + '<span style="font-size:1.1rem">' + u.emoji + '</span>'
            + '<div><div class="usa-sug-ticker">' + u.t + '</div><div class="usa-sug-name">' + u.n + '</div></div>'
            + (priceStr ? '<div style="text-align:right"><div class="usa-sug-price">' + priceStr + '</div><div class="usa-sug-chg" style="' + chgCls + '">' + chgStr + '</div></div>' : '')
            + '</div>';
    }).join('');
}

window.usa2_showPanel = function() {
    var panel = document.getElementById('main-panel');
    if (!panel) return;
    usa2_injectCSS();
    var cambio = usa2_cambio();

    panel.innerHTML = '<div class="usa-wrap">'
        + '<div class="usa-topbar">'
        + '<div class="usa-topbar-left"><div class="usa-flag-big">🇺🇸</div>'
        + '<div><div class="usa-topbar-title">Ações Americanas</div>'
        + '<div class="usa-topbar-sub">NYSE · NASDAQ · S&amp;P 500 — Análise fundamentalista em USD</div></div></div>'
        + '<span class="usa-exchange-badge">Wall Street</span>'
        + '</div>'
        + '<div class="usa-search-bar">'
        + '<input id="usa2-search-in" type="text" placeholder="Busque qualquer ticker — TSLA, META, NFLX, BRK-B..." autocomplete="off" />'
        + '<button class="usa-search-go" onclick="usa2_search(document.getElementById(\'usa2-search-in\').value)">Analisar →</button>'
        + '</div>'
        + '<div class="usa-cambio-strip">'
        + '<div class="usa-cambio-item">💱 USD/BRL <span class="usa-cambio-val">R$ ' + cambio.toFixed(2).replace('.', ',') + '</span></div>'
        + '<div class="usa-cambio-div"></div>'
        + '<div class="usa-cambio-item">Fonte: <span style="color:var(--muted)">Boletim Focus · Bacen</span></div>'
        + '<div class="usa-cambio-div"></div>'
        + '<div class="usa-cambio-item" style="font-size:0.72rem;color:var(--muted2)">Clique em qualquer ticker para analisar</div>'
        + '</div>'
        + '<div class="usa-sugs-title">🏆 Big Techs &amp; Blue Chips — Seleção do Gestor</div>'
        + '<div class="usa-sugs-grid" id="usa-sug-grid">'
        + USA_TICKERS.map(function(u) {
            return '<div class="usa-sug-pill" onclick="usa2_search(\'' + u.t + '\')">'
                + '<span style="font-size:1.1rem">' + u.emoji + '</span>'
                + '<div><div class="usa-sug-ticker">' + u.t + '</div><div class="usa-sug-name">' + u.n + '</div></div>'
                + '<div style="text-align:right"><div style="font-size:0.7rem;color:var(--muted2)">' + u.ex + '</div></div>'
                + '</div>';
        }).join('')
        + '</div>'
        + '<div style="background:rgba(201,168,76,0.04);border:0.5px solid rgba(201,168,76,0.18);border-radius:12px;padding:1rem 1.25rem;margin-top:0.5rem">'
        + '<div style="font-size:0.65rem;text-transform:uppercase;letter-spacing:0.08em;color:var(--gold);margin-bottom:0.65rem">💡 Por que essas ações?</div>'
        + '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:8px;font-size:0.78rem;color:var(--muted);line-height:1.55">'
        + '<div><strong style="color:#F3F4F8">🟢 NVDA</strong> — A bola da vez da IA. Dominância em GPUs para data centers.</div>'
        + '<div><strong style="color:#F3F4F8">🥤 KO &amp; 💳 V</strong> — Favoritas de dividendos e valor. Estabilidade para o portfolio.</div>'
        + '<div><strong style="color:#F3F4F8">🛒 MELI</strong> — NASDAQ, a preferida dos brasileiros que investem fora.</div>'
        + '</div></div>'
        + '</div>';

    var inp = document.getElementById('usa2-search-in');
    if (inp) inp.addEventListener('keydown', function(e){ if(e.key==='Enter') usa2_search(inp.value); });
    setTimeout(usa2_loadSugPrices, 400);
};

window.usa2_search = async function(ticker) {
    if (!ticker) { if (typeof toast==='function') toast('Digite um ticker americano'); return; }
    ticker = ticker.trim().toUpperCase();
    USA_V2.currentTicker = ticker;
    var panel = document.getElementById('main-panel');
    usa2_injectCSS();
    panel.innerHTML = '<div class="usa-wrap"><div style="display:flex;align-items:center;gap:12px;padding:3rem 1rem;color:var(--muted);font-size:0.88rem;justify-content:center"><div class="spinner"></div>Buscando ' + ticker + ' em NYSE/NASDAQ...</div></div>';
    if (typeof setStatus === 'function') setStatus('loading', 'Buscando ' + ticker + '...');
    try {
        var q = await usa2_fetch(ticker);
        if (typeof addWL === 'function') addWL(ticker, q.regularMarketPrice, q.regularMarketChangePercent);
        usa2_renderQuote(q, ticker);
        if (typeof setStatus === 'function') setStatus('live', ticker + ' · NYSE/NASDAQ · ' + new Date().toLocaleTimeString('pt-BR'));
    } catch(e) {
        if (typeof setStatus === 'function') setStatus('err', e.message);
        panel.innerHTML = '<div class="usa-wrap"><div class="usa-empty">'
            + '<div class="usa-empty-icon">⚠️</div>'
            + '<div class="usa-empty-title">' + e.message + '</div>'
            + '<div class="usa-empty-sub">Verifique o ticker. Ex: AAPL, TSLA, META, BRK-B</div>'
            + '<button class="btn-ai" style="margin-top:1.5rem" onclick="usa2_showPanel()">← Voltar às sugestões</button>'
            + '</div></div>';
    }
};

function usa2_renderQuote(q, ticker) {
    var panel = document.getElementById('main-panel');
    usa2_injectCSS();
    var cambio  = usa2_cambio();
    var price   = q.regularMarketPrice;
    var priceBRL= price ? price * cambio : null;
    var chgPct  = q.regularMarketChangePercent;
    var chgAbs  = q.regularMarketChange;
    var isUp    = chgPct >= 0;
    var cc      = isUp ? 'up' : 'dn';
    var fd  = q.financialData || {};
    var ks  = q.defaultKeyStatistics || {};
    var sd  = q.summaryDetail || {};
    var pe  = q.priceEarnings || sd.trailingPE || ks.trailingPE;
    var pb  = q.priceToBook || ks.priceToBook;
    var eps = ks.trailingEps || ks.forwardEps;
    var dy  = q.dividendYield || sd.dividendYield;
    var mc  = q.marketCap;
    var roe = fd.returnOnEquity != null ? fd.returnOnEquity * 100 : null;
    var roa = fd.returnOnAssets != null ? fd.returnOnAssets * 100 : null;
    var rev = fd.totalRevenue || q.revenue;
    var ebitda = fd.ebitda || q.ebitda;
    var grossM = fd.grossMargins != null ? fd.grossMargins * 100 : null;
    var netM   = fd.profitMargins != null ? fd.profitMargins * 100 : null;
    var debtEq = fd.debtToEquity;
    var beta   = ks.beta;
    var hi52   = q.fiftyTwoWeekHigh;
    var lo52   = q.fiftyTwoWeekLow;
    var vol    = q.regularMarketVolume;
    var info   = USA_TICKERS.find(function(u){ return u.t === ticker; }) || { emoji:'🏢', setor:'—', ex:'NYSE/NASDAQ' };
    var hasKey = (typeof getAK === 'function') ? !!getAK() : false;
    var fmtVol = (typeof fmt === 'function') ? fmt(vol) : (vol||'—');

    panel.innerHTML = '<div class="usa-wrap">'
        + '<div style="display:flex;align-items:center;gap:10px;margin-bottom:1.25rem;flex-wrap:wrap">'
        + '<button class="btn-outline" style="font-size:0.78rem;padding:0.38rem 0.85rem" onclick="usa2_showPanel()">← EUA</button>'
        + '<div class="usa-search-bar" style="flex:1;min-width:200px;margin:0">'
        + '<input id="usa2-search-in" type="text" placeholder="Buscar outro ticker..." autocomplete="off" />'
        + '<button class="usa-search-go" onclick="usa2_search(document.getElementById(\'usa2-search-in\').value)">→</button>'
        + '</div>'
        + '</div>'

        + '<div class="usa-qcard">'
        + '<div class="usa-qcard-header">'
        + '<div class="usa-company-info">'
        + '<div class="usa-company-logo">' + info.emoji + '</div>'
        + '<div>'
        + '<div class="usa-ticker-lg">' + ticker + '</div>'
        + '<div class="usa-company-name">' + (q.longName || q.shortName || '—') + '</div>'
        + '<span class="usa-sector-badge">' + (q.sector || info.setor || '—') + ' · ' + info.ex + '</span>'
        + '</div></div>'
        + '<div class="usa-price-block">'
        + '<div class="usa-price-usd">' + (price ? 'US$ ' + price.toFixed(2) : '—') + '</div>'
        + (priceBRL ? '<div class="usa-price-brl-equiv">≈ ' + usa2_brl(priceBRL) + ' (USD/BRL ' + cambio.toFixed(2) + ')</div>' : '')
        + (chgPct != null ? '<div><span class="usa-chg-pill ' + cc + '">' + (isUp?'+':'') + chgPct.toFixed(2) + '% (' + (isUp?'+':'') + 'US$ ' + Math.abs(chgAbs||0).toFixed(2) + ')</span></div>' : '')
        + '</div></div>'
        + '<div class="usa-meta-row">Mín: US$' + (q.regularMarketDayLow||'—') + ' · Máx: US$' + (q.regularMarketDayHigh||'—') + ' · Vol: ' + fmtVol + ' · 52S: US$' + ((lo52||0).toFixed(2)) + ' – US$' + ((hi52||0).toFixed(2)) + '</div>'
        + '<div class="usa-ttm-grid">'
        + ttmC('P/L (TTM)', pe?usa2_x(pe):'—', 'Price/Earnings', pe&&pe<25?'green':pe&&pe>40?'red':'gold')
        + ttmC('P/VP', pb?usa2_x(pb):'—', 'Price/Book', pb&&pb<3?'green':'gold')
        + ttmC('EPS', eps?'US$'+eps.toFixed(2):'—', 'Lucro/Ação TTM', eps&&eps>0?'green':'red')
        + ttmC('Div. Yield', dy?dy.toFixed(2)+'%':'—', 'Rendimento dividendos', dy&&dy>2?'green':'gold')
        + ttmC('Market Cap', usa2_num(mc), 'Valor de mercado', '')
        + ttmC('ROE', roe!=null?roe.toFixed(1)+'%':'—', 'Retorno sobre PL', roe&&roe>15?'green':roe&&roe<5?'red':'gold')
        + ttmC('Beta', beta?beta.toFixed(2):'—', 'Volatilidade vs S&P 500', beta&&beta<1?'green':beta&&beta>1.5?'red':'gold')
        + ttmC('Mg. Líquida', netM!=null?netM.toFixed(1)+'%':'—', 'Margem líquida TTM', netM&&netM>15?'green':netM&&netM<5?'red':'gold')
        + '</div></div>'

        + '<div class="usa-chart-card">'
        + '<div class="usa-chart-header">'
        + '<div class="usa-chart-title-txt">Performance · ' + ticker + ' (USD + conversão BRL)</div>'
        + '<div class="usa-period-tabs">'
        + '<button class="usa-ptab active" data-p="1mo" onclick="usa2_chgPeriod(this)">1M</button>'
        + '<button class="usa-ptab" data-p="3mo" onclick="usa2_chgPeriod(this)">3M</button>'
        + '<button class="usa-ptab" data-p="6mo" onclick="usa2_chgPeriod(this)">6M</button>'
        + '<button class="usa-ptab" data-p="1y"  onclick="usa2_chgPeriod(this)">1A</button>'
        + '<button class="usa-ptab" data-p="5y"  onclick="usa2_chgPeriod(this)">5A</button>'
        + '</div></div>'
        + '<div class="usa-chart-wrap"><canvas id="usa2-chart"></canvas></div>'
        + '<div class="usa-chart-src" id="usa2-chart-src">Carregando histórico...</div>'
        + '</div>'

        + '<div class="usa-section">'
        + '<div class="usa-section-title">📊 Dados Financeiros (TTM)</div>'
        + '<div class="usa-fin-grid">'
        + finC('Receita', usa2_num(rev), '')
        + finC('EBITDA', usa2_num(ebitda), '')
        + finC('Margem Bruta', grossM!=null?grossM.toFixed(1)+'%':'—', grossM&&grossM>40?'up':grossM&&grossM<20?'dn':'')
        + finC('Margem Líquida', netM!=null?netM.toFixed(1)+'%':'—', netM&&netM>15?'up':netM&&netM<5?'dn':'')
        + finC('ROE', roe!=null?roe.toFixed(1)+'%':'—', roe&&roe>15?'up':roe&&roe<5?'dn':'')
        + finC('ROA', roa!=null?roa.toFixed(1)+'%':'—', roa&&roa>5?'up':roa&&roa<2?'dn':'')
        + finC('Dívida/PL', debtEq!=null?usa2_x(debtEq):'—', debtEq&&debtEq>2?'dn':debtEq&&debtEq<0.5?'up':'')
        + finC('52S Máx', usa2_usd(hi52), 'up')
        + finC('52S Mín', usa2_usd(lo52), 'dn')
        + '</div>'
        + '<div style="font-size:0.68rem;color:var(--muted2);margin-top:0.5rem;opacity:0.7">Fonte: Brapi.dev · Dados em USD · Plano gratuito pode ter cobertura parcial</div>'
        + '</div>'

        + '<div class="usa-section">'
        + '<div class="usa-section-title">🏆 Comparativo com Pares do Setor</div>'
        + '<div id="usa2-peers-wrap"><div style="color:var(--muted);font-size:0.82rem;padding:0.5rem"><div class="spinner" style="display:inline-block;width:14px;height:14px;margin-right:8px"></div>Carregando pares...</div></div>'
        + '</div>'

        + '<div class="card" id="usa2-ai-card">'
        + '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem;flex-wrap:wrap;gap:8px">'
        + '<div class="usa-ai-badge"><div class="usa-ai-dot"></div>Análise IA · Buffett + Fisher + Dalio</div>'
        + (hasKey ? '<button class="btn-ai" id="usa2-ai-btn" onclick="usa2_runAI()">Gerar análise →</button>'
                  : '<button class="btn-ai" onclick="openModal()">Configurar chave Anthropic →</button>')
        + '</div>'
        + '<div class="ai-tabs">'
        + '<button class="ai-tab active" onclick="usa2_switchTab(\'negocio\')">Negócio</button>'
        + '<button class="ai-tab" onclick="usa2_switchTab(\'vantagens\')">Moat</button>'
        + '<button class="ai-tab" onclick="usa2_switchTab(\'cenarios\')">Cenários</button>'
        + '<button class="ai-tab" onclick="usa2_switchTab(\'riscos\')">Riscos</button>'
        + '<button class="ai-tab" onclick="usa2_switchTab(\'perspectiva\')">Perspectiva</button>'
        + '</div>'
        + '<div class="ai-content active" id="usa2-negocio"><div class="ai-text">' + (hasKey?'Clique em "Gerar análise" para análise fundamentalista com IA.':'Configure sua chave Anthropic para análise com IA.') + '</div></div>'
        + '<div class="ai-content" id="usa2-vantagens"><div class="ai-text" id="usa2-vantagens-txt">Aguardando...</div></div>'
        + '<div class="ai-content" id="usa2-cenarios"><div id="usa2-cen-pills"></div></div>'
        + '<div class="ai-content" id="usa2-riscos"><div class="ai-text" id="usa2-riscos-txt">Aguardando...</div></div>'
        + '<div class="ai-content" id="usa2-perspectiva"><div id="usa2-rating-el"></div><div class="ai-text" id="usa2-perspectiva-txt">Aguardando...</div></div>'
        + '</div>'
        + '</div>';

    var inp = document.getElementById('usa2-search-in');
    if (inp) inp.addEventListener('keydown', function(e){ if(e.key==='Enter') usa2_search(inp.value); });

    setTimeout(function(){ usa2_drawChart('1mo', '1d'); }, 80);
    setTimeout(function(){ usa2_loadPeers(q.sector || info.setor, ticker); }, 250);
}

function ttmC(lbl, val, sub, cls) {
    return '<div class="usa-ttm-card"><div class="usa-ttm-lbl">' + lbl + '</div><div class="usa-ttm-val ' + cls + '">' + val + '</div>' + (sub ? '<div class="usa-ttm-sub">' + sub + '</div>' : '') + '</div>';
}
function finC(lbl, val, cls) {
    return '<div class="usa-fin-card"><div class="usa-fin-lbl">' + lbl + '</div><div class="usa-fin-val ' + cls + '">' + val + '</div></div>';
}

window.usa2_chgPeriod = function(btn) {
    document.querySelectorAll('.usa-ptab').forEach(function(b){ b.classList.remove('active'); });
    btn.classList.add('active');
    var p = btn.getAttribute('data-p');
    var intMap = { '1mo':'1d', '3mo':'1d', '6mo':'1d', '1y':'1wk', '5y':'1mo' };
    usa2_drawChart(p, intMap[p]||'1d');
};

async function usa2_drawChart(range, interval) {
    if (!USA_V2.currentTicker) return;
    interval = interval || '1d';
    var src = document.getElementById('usa2-chart-src');
    if (src) src.textContent = 'Carregando histórico...';
    try {
        var hist = await usa2_fetchHist(USA_V2.currentTicker, range, interval);
        hist = hist.map(function(h){ return { date:new Date(h.date*1000), close:h.close?+h.close:null }; }).filter(function(h){ return h.close; });
        var ctx = document.getElementById('usa2-chart');
        if (!ctx) return;
        if (USA_V2.chart) { USA_V2.chart.destroy(); USA_V2.chart = null; }
        if (!hist.length) { if(src) src.textContent='Histórico não disponível'; return; }
        var vals   = hist.map(function(h){ return h.close; });
        var isUp   = vals[vals.length-1] >= vals[0];
        var color  = isUp ? '#1DB954' : '#E74C3C';
        var pctChg = vals[0] > 0 ? ((vals[vals.length-1]-vals[0])/vals[0]*100) : 0;
        var cambio = usa2_cambio();
        var useLong = range==='1y'||range==='5y';
        var labels = hist.map(function(h){
            return useLong ? h.date.toLocaleDateString('pt-BR',{month:'short',year:'2-digit'}) : h.date.toLocaleDateString('pt-BR',{day:'2-digit',month:'short'});
        });
        USA_V2.chart = new Chart(ctx, {
            type:'line',
            data:{ labels:labels, datasets:[{ data:vals, borderColor:color, borderWidth:1.5, pointRadius:0, pointHoverRadius:5, tension:0.3, fill:true, backgroundColor:isUp?'rgba(29,185,84,0.07)':'rgba(231,76,60,0.07)' }] },
            options:{
                responsive:true, maintainAspectRatio:false,
                interaction:{ mode:'index', intersect:false },
                plugins:{
                    legend:{display:false},
                    tooltip:{backgroundColor:'#1C2638',borderColor:'#2E3A50',borderWidth:0.5,titleColor:'#7B8DB0',bodyColor:'#E8EAF0',
                        callbacks:{label:function(c){ return '  US$ '+c.raw.toFixed(2)+' · R$ '+(c.raw*cambio).toFixed(2).replace('.',','); }}}
                },
                scales:{
                    x:{ ticks:{color:'#7B8DB0',font:{size:10},maxTicksLimit:8,autoSkip:true}, grid:{color:'rgba(42,51,71,0.4)',lineWidth:0.5}, border:{display:false} },
                    y:{ position:'right', ticks:{color:'#7B8DB0',font:{size:10},callback:function(v){return 'US$'+v.toFixed(0);}}, grid:{color:'rgba(42,51,71,0.4)',lineWidth:0.5}, border:{display:false} }
                }
            }
        });
        if (src) src.textContent = 'Brapi · NYSE/NASDAQ · ' + hist.length + ' pts · ' + (pctChg>=0?'+':'') + pctChg.toFixed(2) + '% no período · Tooltip: USD + BRL';
    } catch(e) { if(src) src.textContent = 'Erro: ' + e.message; }
}

async function usa2_loadPeers(sector, exclude) {
    var el = document.getElementById('usa2-peers-wrap');
    if (!el) return;
    var peers = [];
    var sLow = (sector||'').toLowerCase();
    for (var key in USA_PEERS_MAP) {
        if (sLow.includes(key.toLowerCase()) || key.toLowerCase().includes(sLow)) {
            peers = USA_PEERS_MAP[key].filter(function(t){ return t !== exclude; }).slice(0, 4);
            break;
        }
    }
    if (!peers.length) {
        el.innerHTML = '<div style="color:var(--muted);font-size:0.82rem;padding:0.5rem">Pares não identificados. Setor: ' + (sector||'N/A') + '</div>'; return;
    }
    try {
        var bt = (typeof getBT==='function')?getBT():'';
        var url = 'https://brapi.dev/api/quote/' + peers.join(',') + '?fundamental=true' + (bt?'&token='+bt:'');
        var r = await fetch(url); var d = await r.json(); var results = d.results || [];
        if (!results.length) { el.innerHTML='<div style="color:var(--muted);font-size:0.82rem">Dados dos pares não disponíveis</div>'; return; }
        var header = '<div class="usa-peer-header"><div>Ticker</div><div>Preço</div><div>Var.</div><div style="text-align:center">P/L</div><div style="text-align:center">P/VP</div><div style="text-align:center">D.Yield</div><div style="text-align:right">Mkt Cap</div></div>';
        var rows = results.map(function(q2){
            var chg2=q2.regularMarketChangePercent;
            return '<div class="usa-peer-row" onclick="usa2_search(\''+(q2.symbol||'')+'\')">'
                + '<div style="font-weight:500;color:#F3F4F8">'+(q2.symbol||'—')+'</div>'
                + '<div>'+(q2.regularMarketPrice?'US$'+q2.regularMarketPrice.toFixed(2):'—')+'</div>'
                + '<div style="color:'+(chg2>=0?'#1DB954':'#E74C3C')+'">'+(chg2!=null?(chg2>=0?'+':'')+chg2.toFixed(2)+'%':'—')+'</div>'
                + '<div style="text-align:center;color:'+(q2.priceEarnings&&q2.priceEarnings<25?'#1DB954':q2.priceEarnings&&q2.priceEarnings>40?'#E74C3C':'var(--gold)')+'">'+  (q2.priceEarnings?q2.priceEarnings.toFixed(1)+'x':'—')+'</div>'
                + '<div style="text-align:center">'+(q2.priceToBook?q2.priceToBook.toFixed(2)+'x':'—')+'</div>'
                + '<div style="text-align:center;color:#1DB954">'+(q2.dividendYield?q2.dividendYield.toFixed(2)+'%':'—')+'</div>'
                + '<div style="text-align:right;font-size:0.78rem;color:var(--muted)">'+usa2_num(q2.marketCap)+'</div>'
                + '</div>';
        }).join('');
        el.innerHTML = header + rows + '<div style="font-size:0.72rem;color:var(--muted2);margin-top:6px">Clique em qualquer ticker para analisar</div>';
    } catch(e) { el.innerHTML='<div style="color:var(--muted);font-size:0.82rem">Erro: '+e.message+'</div>'; }
}

window.usa2_switchTab = function(name) {
    var names=['negocio','vantagens','cenarios','riscos','perspectiva'];
    var card = document.getElementById('usa2-ai-card');
    if (!card) return;
    var tabs=card.querySelectorAll('.ai-tab'), contents=card.querySelectorAll('.ai-content');
    for(var i=0;i<tabs.length;i++){ tabs[i].classList.toggle('active',names[i]===name); contents[i].classList.toggle('active',names[i]===name); }
};

window.usa2_runAI = async function() {
    if (typeof getAK==='function' && !getAK()) { if(typeof openModal==='function') openModal(); return; }
    var btn=document.getElementById('usa2-ai-btn');
    if(btn){btn.disabled=true;btn.textContent='Gerando...';}
    if(typeof setStatus==='function') setStatus('loading','Gerando análise com IA...');
    var ticker=USA_V2.currentTicker;
    var priceEl=document.querySelector('.usa-price-usd');
    var price=priceEl?priceEl.textContent.replace('US$ ','').trim():'—';
    var ctx='TICKER: '+ticker+' (Ação americana - NYSE/NASDAQ)\nPREÇO USD: '+price+'\nFoco: análise para investidor brasileiro via conta internacional ou BDR';
    var tabs=[
        {id:'negocio',el:'usa2-negocio',prompt:'Analise o modelo de negócio e fluxos de receita de '+ticker+'. Perspectiva de Buffett e Peter Lynch. 3 parágrafos em português brasileiro.\n\n'+ctx},
        {id:'vantagens',el:'usa2-vantagens-txt',prompt:'Analise o moat (vantagem competitiva) de '+ticker+' e tendência do setor em 10 anos. 3 parágrafos em pt-BR.\n\n'+ctx},
        {id:'cenarios',el:'usa2-cenarios-txt',prompt:'3 cenários para '+ticker+' em 12-24 meses. APENAS JSON: {"bull":{"preco":"US$X","desc":"..."},"base":{"preco":"US$X","desc":"..."},"bear":{"preco":"US$X","desc":"..."}}.\n\n'+ctx},
        {id:'riscos',el:'usa2-riscos-txt',prompt:'4 principais riscos de '+ticker+': regulatório, competitivo, macro, geopolítico. 4 parágrafos pt-BR.\n\n'+ctx},
        {id:'perspectiva',el:'usa2-perspectiva-txt',prompt:'Perspectiva 12-24 meses para '+ticker+'. Compare valuation. Termine com RATING: COMPRAR, AGUARDAR ou EVITAR. pt-BR.\n\n'+ctx}
    ];
    for(var i=0;i<tabs.length;i++){
        var tab=tabs[i];
        try {
            var result=await callAPI(tab.prompt);
            if(tab.id==='cenarios'){
                try{
                    var data=JSON.parse(result.replace(/```json|```/g,'').trim());
                    var pEl=document.getElementById('usa2-cen-pills');
                    if(pEl) pEl.innerHTML='<div class="scen-row"><div class="scen bull"><div class="scen-lbl">Alta</div><div class="scen-price">'+(data.bull&&data.bull.preco||'—')+'</div><div class="scen-desc">'+(data.bull&&data.bull.desc||'')+'</div></div><div class="scen base"><div class="scen-lbl">Base</div><div class="scen-price">'+(data.base&&data.base.preco||'—')+'</div><div class="scen-desc">'+(data.base&&data.base.desc||'')+'</div></div><div class="scen bear"><div class="scen-lbl">Baixa</div><div class="scen-price">'+(data.bear&&data.bear.preco||'—')+'</div><div class="scen-desc">'+(data.bear&&data.bear.desc||'')+'</div></div></div>';
                }catch(e2){var cEl=document.getElementById(tab.el);if(cEl){cEl.innerHTML='<p>'+result+'</p>';cEl.style.display='block';}}
            } else if(tab.id==='perspectiva'){
                var m=result.match(/RATING:\s*(COMPRAR|AGUARDAR|EVITAR)/i);
                if(m){var rEl=document.getElementById('usa2-rating-el');var rCls=m[1]==='COMPRAR'?'r-buy':m[1]==='AGUARDAR'?'r-hold':'r-sell';if(rEl)rEl.innerHTML='<div class="rating-pill '+rCls+'">'+m[1].toUpperCase()+'</div>';}
                var pEl2=document.getElementById(tab.el);if(pEl2)pEl2.innerHTML='<p>'+result.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\n\n/g,'</p><p>')+'</p>';
            } else if(tab.id==='negocio'){
                var nEl=document.getElementById(tab.el);if(nEl)nEl.innerHTML='<div class="ai-text"><p>'+result.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\n\n/g,'</p><p>')+'</p></div>';
            } else {
                var gEl=document.getElementById(tab.el);if(gEl)gEl.innerHTML='<p>'+result.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\n\n/g,'</p><p>')+'</p>';
            }
        }catch(e){var errEl=document.getElementById(tab.el);if(errEl)errEl.innerHTML='<span style="color:var(--red)">Erro: '+e.message+'</span>';}
    }
    if(btn){btn.disabled=false;btn.textContent='Reanalisar →';}
    if(typeof setStatus==='function') setStatus('live','Análise EUA concluída · '+new Date().toLocaleTimeString('pt-BR'));
};

// Patch na função atbSetMkt para incluir USA
var _origAtbSetMkt = window.atbSetMkt;
window.atbSetMkt = function(m) {
    if (m === 'USA') {
        // Atualiza tabs
        ['BR','CRYPTO','RF','FII','CART','SCR','CAL','USA'].forEach(function(k) {
            var el = document.getElementById('mkt-'+k);
            if (el) el.classList.toggle('active', k === m);
        });
        var srch = document.getElementById('atb-search');
        if (srch) srch.style.display = 'none';
        usa2_showPanel();
        return;
    }
    if (typeof _origAtbSetMkt === 'function') _origAtbSetMkt(m);
};

// Patch na fetchStock para delegar USA ao módulo novo
var _origFetchStockEUA = window.fetchStock;
window.fetchStock = async function(t) {
    if (window.MKT === 'USA') {
        await usa2_search(t);
        var go = document.getElementById('search-go');
        if (go) go.disabled = false;
        return;
    }
    if (typeof _origFetchStockEUA === 'function') return _origFetchStockEUA(t);
};

console.log('[Bussola] Módulo EUA v2 carregado ✓');
})();
