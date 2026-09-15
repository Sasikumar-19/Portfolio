/* ═══════════════════════════════════════════════════════════════
   case-studies.js  ·  Interactive Dashboards for Portfolio
   ═══════════════════════════════════════════════════════════════ */

// ── Chart.js default overrides ──
Chart.defaults.color = '#a1a1aa';
Chart.defaults.borderColor = 'rgba(255,255,255,0.06)';
Chart.defaults.font.family = "'Inter', sans-serif";

/* ─────────────────────────────────────────────────────────────
   CASE STUDY SWITCHER
   ───────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const switchBtns = document.querySelectorAll('.switch-case-btn');
  const caseBlocks = document.querySelectorAll('.case-study-block');

  switchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target');

      // Toggle active state on buttons
      switchBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Show/hide case study blocks
      caseBlocks.forEach(block => {
        if (block.id === target) {
          block.classList.toggle('hidden');
          if (!block.classList.contains('hidden')) {
            block.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        } else {
          block.classList.add('hidden');
        }
      });
    });
  });

  // ── Initialize both dashboards ──
  initFinanceDashboard();
  initChurnDashboard();
});

/* ═══════════════════════════════════════════════════════════════
   CASE STUDY 1: PERSONAL FINANCE AUDIT
   ═══════════════════════════════════════════════════════════════ */

let DEFAULT_FINANCE_DATA = [
  { date:'2025-01-05', amount:2450, category:'Food & Dining', desc:'Swiggy Orders', anomaly:false },
  { date:'2025-01-08', amount:1200, category:'Transport', desc:'Uber Rides', anomaly:false },
  { date:'2025-01-12', amount:4500, category:'Shopping', desc:'Amazon Purchase', anomaly:false },
  { date:'2025-01-15', amount:8500, category:'Bills & Rent', desc:'House Rent', anomaly:false },
  { date:'2025-01-18', amount:999, category:'Entertainment', desc:'Netflix + Spotify', anomaly:false },
  { date:'2025-01-22', amount:650, category:'Health', desc:'Apollo Pharmacy', anomaly:false },
  { date:'2025-01-25', amount:15000, category:'Shopping', desc:'Flipkart Electronics', anomaly:true },
  { date:'2025-02-03', amount:1800, category:'Food & Dining', desc:'Zomato + Blinkit', anomaly:false },
  { date:'2025-02-06', amount:950, category:'Transport', desc:'Ola + Metro', anomaly:false },
  { date:'2025-02-10', amount:2200, category:'Education', desc:'Udemy Courses', anomaly:false },
  { date:'2025-02-14', amount:3500, category:'Food & Dining', desc:'Valentine Dinner', anomaly:true },
  { date:'2025-02-18', amount:8500, category:'Bills & Rent', desc:'Rent + Electricity', anomaly:false },
  { date:'2025-02-22', amount:750, category:'Entertainment', desc:'BookMyShow', anomaly:false },
  { date:'2025-02-28', amount:12000, category:'Travel', desc:'Goa Trip Booking', anomaly:true },
  { date:'2025-03-02', amount:2100, category:'Food & Dining', desc:'Swiggy + Cafe', anomaly:false },
  { date:'2025-03-07', amount:1450, category:'Transport', desc:'Uber + Petrol', anomaly:false },
  { date:'2025-03-10', amount:3200, category:'Shopping', desc:'Myntra Clothing', anomaly:false },
  { date:'2025-03-14', amount:8500, category:'Bills & Rent', desc:'Rent', anomaly:false },
  { date:'2025-03-18', amount:500, category:'Health', desc:'Gym Membership', anomaly:false },
  { date:'2025-03-22', amount:1800, category:'UPI Transfer', desc:'Sent to Friend', anomaly:false },
  { date:'2025-03-28', amount:22000, category:'UPI Transfer', desc:'Large UPI Transfer', anomaly:true },
  { date:'2025-04-01', amount:2600, category:'Food & Dining', desc:'Dominos + Zomato', anomaly:false },
  { date:'2025-04-05', amount:1100, category:'Transport', desc:'Rapido + Bus', anomaly:false },
  { date:'2025-04-10', amount:8500, category:'Bills & Rent', desc:'Rent + Broadband', anomaly:false },
  { date:'2025-04-14', amount:6500, category:'Shopping', desc:'Phone Accessories', anomaly:false },
  { date:'2025-04-18', amount:999, category:'Entertainment', desc:'Streaming Subs', anomaly:false },
  { date:'2025-04-22', amount:1500, category:'Education', desc:'Coursera Cert', anomaly:false },
  { date:'2025-04-28', amount:350, category:'Health', desc:'1mg Medicines', anomaly:false },
  { date:'2025-05-03', amount:1950, category:'Food & Dining', desc:'Swiggy + Blinkit', anomaly:false },
  { date:'2025-05-08', amount:800, category:'Transport', desc:'Metro Pass', anomaly:false },
  { date:'2025-05-12', amount:8500, category:'Bills & Rent', desc:'Rent', anomaly:false },
  { date:'2025-05-16', amount:2800, category:'Shopping', desc:'Amazon Books + Gadgets', anomaly:false },
  { date:'2025-05-20', amount:450, category:'Entertainment', desc:'PVR Cinema', anomaly:false },
  { date:'2025-05-25', amount:35000, category:'Travel', desc:'Flight + Hotel Kerala', anomaly:true },
  { date:'2025-06-01', amount:2300, category:'Food & Dining', desc:'Dining Out + Zomato', anomaly:false },
  { date:'2025-06-06', amount:1350, category:'Transport', desc:'Uber + Ola', anomaly:false },
  { date:'2025-06-10', amount:8500, category:'Bills & Rent', desc:'Rent + Electricity', anomaly:false },
  { date:'2025-06-14', amount:1200, category:'Health', desc:'Doctor Visit + Meds', anomaly:false },
  { date:'2025-06-18', amount:999, category:'Entertainment', desc:'Subscriptions', anomaly:false },
  { date:'2025-06-22', amount:5200, category:'Shopping', desc:'Flipkart Sale', anomaly:false },
  { date:'2025-06-28', amount:18500, category:'UPI Transfer', desc:'Duplicate UPI Charge', anomaly:true },
];

let FINANCE_DATA = [...DEFAULT_FINANCE_DATA];

const FINANCE_CATEGORIES = ['Food & Dining','Transport','Shopping','Bills & Rent','Entertainment','Health','Education','Travel','UPI Transfer','Others'];
const FINANCE_CAT_COLORS = {
  'Food & Dining':'#E74C3C','Transport':'#3498DB','Shopping':'#9B59B6',
  'Bills & Rent':'#E67E22','Entertainment':'#1ABC9C','Health':'#27AE60',
  'Education':'#2980B9','Travel':'#F39C12','UPI Transfer':'#EC407A','Others':'#95A5A6'
};

const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

let financeDonutChart = null;
let financeTrendChart = null;

// Helper to parse dates robustly from DD/MM/YYYY, YYYY-MM-DD, DD-MM-YYYY, etc.
function parseTxnDate(raw) {
  if (!raw) return { year: 2025, month: 0, monthKey: 'Jan 2025', monthLabel: 'Jan', dateStr: '2025-01-01' };
  raw = String(raw).trim();
  
  let d = new Date(raw);
  // Check if DD/MM/YYYY or DD-MM-YYYY format
  if (isNaN(d.getTime())) {
    const parts = raw.split(/[\/\-\.\s]/);
    if (parts.length >= 3) {
      let day = parseInt(parts[0]);
      let month = parseInt(parts[1]) - 1;
      let year = parseInt(parts[2]);
      if (year < 100) year += 2000;
      d = new Date(year, month, day);
    }
  }
  
  if (isNaN(d.getTime())) {
    d = new Date();
  }

  const year = d.getFullYear();
  const month = d.getMonth();
  const monthLabel = MONTH_NAMES[month];
  const monthKey = `${monthLabel} ${year}`;
  const dateStr = d.toISOString().split('T')[0];

  return { year, month, monthKey, monthLabel, dateStr };
}

function initFinanceDashboard() {
  const filterMonth = document.getElementById('fin-filter-month');
  const filterCat = document.getElementById('fin-filter-category');
  const filterAnomaly = document.getElementById('fin-filter-anomaly');
  const fileInput = document.getElementById('fin-file-upload');

  if (!filterMonth) return;

  filterMonth.addEventListener('change', updateFinanceDashboard);
  filterCat.addEventListener('change', updateFinanceDashboard);
  filterAnomaly.addEventListener('change', updateFinanceDashboard);

  if (fileInput) {
    fileInput.addEventListener('change', handleFinanceFileUpload);
  }

  syncFinanceFilterDropdowns();
  updateFinanceDashboard();
}

// Dynamically sync filter dropdown options based on current dataset
function syncFinanceFilterDropdowns() {
  const filterMonth = document.getElementById('fin-filter-month');
  const filterCat = document.getElementById('fin-filter-category');

  if (!filterMonth || !filterCat) return;

  const selMonth = filterMonth.value;
  const selCat = filterCat.value;

  const monthsMap = new Map();
  FINANCE_DATA.forEach(t => {
    const p = parseTxnDate(t.date);
    if (!monthsMap.has(p.monthKey)) {
      monthsMap.set(p.monthKey, { label: p.monthKey, monthIdx: p.month, year: p.year });
    }
  });

  const sortedMonths = Array.from(monthsMap.values()).sort((a, b) => (a.year * 12 + a.monthIdx) - (b.year * 12 + b.monthIdx));

  filterMonth.innerHTML = '<option value="all">All Months</option>' +
    sortedMonths.map(m => `<option value="${m.label}">${m.label}</option>`).join('');

  if (monthsMap.has(selMonth)) filterMonth.value = selMonth;

  const catsInUse = Array.from(new Set(FINANCE_DATA.map(t => t.category)));
  filterCat.innerHTML = '<option value="all">All Categories</option>' +
    catsInUse.map(c => `<option value="${c}">${c}</option>`).join('');

  if (catsInUse.includes(selCat)) filterCat.value = selCat;
}

function handleFinanceFileUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  const statusEl = document.getElementById('fin-upload-status');
  statusEl.textContent = '⏳ Processing ' + file.name + '...';

  const reader = new FileReader();
  reader.onload = function(evt) {
    try {
      const text = evt.target.result;
      const lines = text.split(/\r?\n/).filter(l => l.trim().length > 0);
      if (lines.length < 2) {
        statusEl.textContent = '⚠️ CSV file seems empty.';
        return;
      }

      const sampleLine = lines[0];
      const delimiter = sampleLine.includes(';') && !sampleLine.includes(',') ? ';' : ',';

      const rawHeaders = lines[0].split(delimiter).map(h => h.trim().replace(/^"|"$/g, ''));
      const headers = rawHeaders.map(h => h.toLowerCase().replace(/[^a-z0-9]/g, ''));

      const dateIdx = headers.findIndex(h => h.includes('date') || h.includes('time') || h.includes('txn') || h.includes('val'));
      const amtIdx = headers.findIndex(h => h.includes('amount') || h.includes('debit') || h.includes('spend') || h.includes('value') || h.includes('withdrawal'));
      const catIdx = headers.findIndex(h => h.includes('category') || h.includes('type') || h.includes('tag') || h.includes('head'));
      const descIdx = headers.findIndex(h => h.includes('desc') || h.includes('narration') || h.includes('remarks') || h.includes('particulars') || h.includes('payee') || h.includes('name'));

      const parsedData = [];
      const amounts = [];

      for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split(new RegExp(`${delimiter}(?=(?:(?:[^"]*"){2})*[^"]*$)`)).map(c => c.trim().replace(/^"|"$/g, ''));
        if (cols.length < 2) continue;

        let rawDate = dateIdx !== -1 && cols[dateIdx] ? cols[dateIdx] : cols[0];
        let pDate = parseTxnDate(rawDate);

        let rawAmt = amtIdx !== -1 && cols[amtIdx] ? cols[amtIdx] : cols[1];
        let amount = parseFloat(String(rawAmt).replace(/[^0-9.]/g, '')) || 0;
        if (amount <= 0) continue;

        let category = catIdx !== -1 && cols[catIdx] ? cols[catIdx] : '';
        let desc = descIdx !== -1 && cols[descIdx] ? cols[descIdx] : (rawHeaders[0] ? cols[0] : 'Transaction');

        if (!category || category.toLowerCase() === 'others' || !FINANCE_CATEGORIES.includes(category)) {
          const textSearch = (category + ' ' + desc).toLowerCase();
          if (textSearch.match(/swiggy|zomato|blinkit|zepto|food|restaurant|cafe|dine|hotel|kfc|mcdonald|domino/)) category = 'Food & Dining';
          else if (textSearch.match(/uber|ola|rapido|metro|petrol|fuel|travel|flight|irctc|redbus|fastag/)) category = 'Transport';
          else if (textSearch.match(/amazon|flipkart|myntra|meesho|shopping|store|retail|electronics/)) category = 'Shopping';
          else if (textSearch.match(/rent|electricity|bescom|airtel|jio|bill|broadband|water|maintenance/)) category = 'Bills & Rent';
          else if (textSearch.match(/netflix|spotify|prime|youtube|cinema|pvr|movie|hotstar|game/)) category = 'Entertainment';
          else if (textSearch.match(/apollo|pharmacy|1mg|doctor|hospital|health|gym|cult/)) category = 'Health';
          else if (textSearch.match(/udemy|coursera|college|school|fee|course|book|education/)) category = 'Education';
          else if (textSearch.match(/flight|hotel|resort|trip|makemytrip|goibibo|airbnb/)) category = 'Travel';
          else if (textSearch.match(/upi|gpay|paytm|phonepe|transfer|sent/)) category = 'UPI Transfer';
          else category = 'Others';
        }

        amounts.push(amount);
        parsedData.push({
          date: pDate.dateStr,
          amount: amount,
          category: category,
          desc: desc.substring(0, 40),
          monthKey: pDate.monthKey,
          monthLabel: pDate.monthLabel
        });
      }

      if (parsedData.length > 0) {
        const mean = amounts.reduce((s, a) => s + a, 0) / amounts.length;
        const stdDev = Math.sqrt(amounts.reduce((s, a) => s + Math.pow(a - mean, 2), 0) / amounts.length);
        const anomalyCutoff = Math.max(10000, mean + 1.8 * stdDev);

        parsedData.forEach(t => {
          t.anomaly = t.amount >= anomalyCutoff;
        });

        FINANCE_DATA.length = 0;
        FINANCE_DATA.push(...parsedData);

        syncFinanceFilterDropdowns();
        updateFinanceDashboard();
        statusEl.textContent = `✅ Successfully analyzed ${parsedData.length} transactions from "${file.name}"!`;
      } else {
        statusEl.textContent = '⚠️ Could not extract valid debit/spending transactions from CSV.';
      }
    } catch (err) {
      statusEl.textContent = '❌ Error parsing CSV file: ' + err.message;
    }
  };
  reader.readAsText(file);
}

function getFilteredFinanceData() {
  const monthVal = document.getElementById('fin-filter-month').value;
  const catVal = document.getElementById('fin-filter-category').value;
  const anomalyVal = document.getElementById('fin-filter-anomaly').value;

  return FINANCE_DATA.filter(t => {
    const pDate = parseTxnDate(t.date);
    if (monthVal !== 'all' && pDate.monthKey !== monthVal && pDate.monthLabel !== monthVal) return false;
    if (catVal !== 'all' && t.category !== catVal) return false;
    if (anomalyVal === 'anomaly' && !t.anomaly) return false;
    if (anomalyVal === 'normal' && t.anomaly) return false;
    return true;
  });
}

function updateFinanceDashboard() {
  const data = getFilteredFinanceData();

  const distinctMonthsMap = new Map();
  FINANCE_DATA.forEach(t => {
    const p = parseTxnDate(t.date);
    distinctMonthsMap.set(p.monthKey, true);
  });
  const totalMonthsCount = Math.max(1, distinctMonthsMap.size);

  const totalSpend = data.reduce((s, t) => s + t.amount, 0);
  const anomalyCount = data.filter(t => t.anomaly).length;
  const avgMonthly = totalSpend / totalMonthsCount;
  const anomalySpendSum = data.filter(t => t.anomaly).reduce((s, t) => s + t.amount, 0);
  const savingsPotential = Math.round(anomalySpendSum + (totalSpend * 0.08));

  document.getElementById('fin-kpi-total').textContent = '₹' + Math.round(totalSpend).toLocaleString('en-IN');
  document.getElementById('fin-kpi-avg').textContent = '₹' + Math.round(avgMonthly).toLocaleString('en-IN');
  document.getElementById('fin-kpi-anomalies').textContent = anomalyCount;
  document.getElementById('fin-kpi-savings').textContent = '₹' + Math.round(savingsPotential).toLocaleString('en-IN');

  const catTotals = {};
  FINANCE_CATEGORIES.forEach(c => catTotals[c] = 0);
  data.forEach(t => { catTotals[t.category] = (catTotals[t.category] || 0) + t.amount; });
  const activeCats = Object.keys(catTotals).filter(c => catTotals[c] > 0);

  const donutCtx = document.getElementById('fin-donut-chart').getContext('2d');
  if (financeDonutChart) financeDonutChart.destroy();
  financeDonutChart = new Chart(donutCtx, {
    type: 'doughnut',
    data: {
      labels: activeCats,
      datasets: [{
        data: activeCats.map(c => catTotals[c]),
        backgroundColor: activeCats.map(c => FINANCE_CAT_COLORS[c] || '#95A5A6'),
        borderWidth: 0,
        hoverOffset: 8
      }]
    },
    options: {
      cutout: '65%',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'right', labels: { padding: 12, usePointStyle: true, pointStyleWidth: 10 } },
        tooltip: {
          callbacks: {
            label: ctx => ` ${ctx.label}: ₹${ctx.raw.toLocaleString('en-IN')} (${totalSpend > 0 ? ((ctx.raw/totalSpend)*100).toFixed(1) : 0}%)`
          }
        }
      }
    }
  });

  const monthGroupMap = new Map();
  data.forEach(t => {
    const p = parseTxnDate(t.date);
    if (!monthGroupMap.has(p.monthKey)) {
      monthGroupMap.set(p.monthKey, { label: p.monthKey, normal: 0, anomaly: 0, sortKey: p.year * 12 + p.month });
    }
    const g = monthGroupMap.get(p.monthKey);
    if (t.anomaly) g.anomaly += t.amount;
    else g.normal += t.amount;
  });

  const sortedMonthGroups = Array.from(monthGroupMap.values()).sort((a, b) => a.sortKey - b.sortKey);
  const trendLabels = sortedMonthGroups.length ? sortedMonthGroups.map(g => g.label) : ['No Data'];
  const normalData = sortedMonthGroups.length ? sortedMonthGroups.map(g => g.normal) : [0];
  const anomalyData = sortedMonthGroups.length ? sortedMonthGroups.map(g => g.anomaly) : [0];

  const trendCtx = document.getElementById('fin-trend-chart').getContext('2d');
  if (financeTrendChart) financeTrendChart.destroy();
  financeTrendChart = new Chart(trendCtx, {
    type: 'bar',
    data: {
      labels: trendLabels,
      datasets: [
        {
          label: 'Normal Spend',
          data: normalData,
          backgroundColor: 'rgba(14, 165, 233, 0.7)',
          borderRadius: 6,
          borderSkipped: false,
        },
        {
          label: '🚨 Anomaly Spend',
          data: anomalyData,
          backgroundColor: 'rgba(231, 76, 60, 0.8)',
          borderRadius: 6,
          borderSkipped: false,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { stacked: true, grid: { display: false } },
        y: {
          stacked: true,
          ticks: { callback: v => '₹' + (v >= 1000 ? (v/1000).toFixed(0) + 'K' : v) }
        }
      },
      plugins: {
        legend: { position: 'top', labels: { usePointStyle: true } },
        tooltip: {
          callbacks: {
            label: ctx => ` ${ctx.dataset.label}: ₹${ctx.raw.toLocaleString('en-IN')}`
          }
        }
      }
    }
  });

  const tbody = document.getElementById('fin-anomaly-tbody');
  const anomalies = data.filter(t => t.anomaly);
  tbody.innerHTML = anomalies.length ? anomalies.map(t =>
    `<tr>
      <td>${new Date(t.date).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'})}</td>
      <td>₹${t.amount.toLocaleString('en-IN')}</td>
      <td>${t.category}</td>
      <td>${t.desc}</td>
      <td><span class="severity-high">🚨 Flagged</span></td>
    </tr>`
  ).join('') : '<tr><td colspan="5" style="text-align:center;color:var(--text-secondary)">No anomalies detected in current filter</td></tr>';

  updatePersonaCards(data);
  updateSavingsTips(data, catTotals, totalSpend, avgMonthly);
}

function updatePersonaCards(currentData) {
  const container = document.getElementById('fin-persona-cards');
  if (!container) return;

  const datasetToUse = currentData || FINANCE_DATA;
  const monthTotalsMap = new Map();

  datasetToUse.forEach(t => {
    const p = parseTxnDate(t.date);
    monthTotalsMap.set(p.monthKey, (monthTotalsMap.get(p.monthKey) || 0) + t.amount);
  });

  const monthEntries = Array.from(monthTotalsMap.entries());
  if (monthEntries.length === 0) {
    container.innerHTML = '<p style="color:var(--text-secondary);grid-column:1/-1;">No persona data available.</p>';
    return;
  }

  const overallTotal = monthEntries.reduce((s, [, tot]) => s + tot, 0);
  const monthlyAvg = overallTotal / monthEntries.length;

  container.innerHTML = monthEntries.map(([mKey, total]) => {
    let persona = '🔵 Balanced';
    let cls = 'balanced';
    if (total < 0.85 * monthlyAvg) {
      persona = '🟢 Saver';
      cls = 'saver';
    } else if (total > 1.18 * monthlyAvg) {
      persona = '🔴 High Spender';
      cls = 'high-spender';
    }
    return `
      <div class="persona-card ${cls}">
        <div class="persona-month">${mKey}</div>
        <div class="persona-label">${persona}</div>
        <div class="persona-amount">₹${Math.round(total).toLocaleString('en-IN')}</div>
      </div>`;
  }).join('');
}

function updateSavingsTips(data, catTotals, totalSpend, avgMonthly) {
  const tipsContainer = document.getElementById('fin-savings-tips');
  if (!tipsContainer) return;

  if (totalSpend === 0) {
    tipsContainer.innerHTML = '<p style="color:var(--text-secondary);">No spending data to analyze recommendations.</p>';
    return;
  }

  const sortedCats = Object.entries(catTotals).sort((a, b) => b[1] - a[1]);
  const top1 = sortedCats[0];
  const top2 = sortedCats[1];

  const highAnomalies = data.filter(t => t.anomaly);
  const totalAnomalyAmt = highAnomalies.reduce((s, t) => s + t.amount, 0);

  const tipsHTML = [];

  if (top1 && top1[1] > 0) {
    const pct1 = ((top1[1] / totalSpend) * 100).toFixed(1);
    const saveAmt = Math.round(top1[1] * 0.15);
    tipsHTML.push(`
      <div class="savings-tip tip-high">
        <span class="tip-badge">🔴 High</span>
        <strong>${top1[0]}</strong> — ${pct1}% of total spend (₹${Math.round(top1[1]).toLocaleString('en-IN')}). A 15% reduction saves <strong>₹${saveAmt.toLocaleString('en-IN')}</strong>.
      </div>
    `);
  }

  if (top2 && top2[1] > 0) {
    const pct2 = ((top2[1] / totalSpend) * 100).toFixed(1);
    tipsHTML.push(`
      <div class="savings-tip tip-medium">
        <span class="tip-badge">🟡 Medium</span>
        <strong>${top2[0]}</strong> — ${pct2}% of spending. Setting a weekly cap can optimize budget by <strong>₹${Math.round(top2[1] * 0.1).toLocaleString('en-IN')}</strong>.
      </div>
    `);
  }

  if (totalAnomalyAmt > 0) {
    tipsHTML.push(`
      <div class="savings-tip tip-high">
        <span class="tip-badge">🚨 Anomaly Alert</span>
        <strong>Flagged Spending</strong> — ₹${Math.round(totalAnomalyAmt).toLocaleString('en-IN')} detected across ${highAnomalies.length} unusual transactions. Review for duplicates or impulse purchases.
      </div>
    `);
  }

  const yearlyPotential = Math.round((totalSpend * 0.12) * 2);
  tipsHTML.push(`
    <div class="savings-tip tip-opportunity">
      <span class="tip-badge">🟢 Opportunity</span>
      <strong>Annual Savings Potential</strong> — Maintaining a balanced monthly budget can save up to <strong>₹${yearlyPotential.toLocaleString('en-IN')}/year</strong>.
    </div>
  `);

  tipsContainer.innerHTML = tipsHTML.join('');
}


/* ═══════════════════════════════════════════════════════════════
   CASE STUDY 2: CUSTOMER CHURN ANALYSIS
   ═══════════════════════════════════════════════════════════════ */

// Aggregated data from the IBM Telco dataset (7,043 customers)
const CHURN_KPI = {
  totalCustomers: 7043,
  churned: 1869,
  churnRate: 26.5,
  annualRevenueLost: 1669570,
  highRiskActive: 296,
  monthlyRecoverable: 23386,
  avgMonthlyChurned: 74.44,
};

const CHURN_BY_CONTRACT = [
  { contract: 'Month-to-month', total: 3875, churned: 1655, rate: 42.7 },
  { contract: 'One year', total: 1473, churned: 166, rate: 11.3 },
  { contract: 'Two year', total: 1695, churned: 48, rate: 2.8 },
];

const CHURN_BY_TENURE = [
  { band: '0–12m', rate: 47.7 },
  { band: '13–24m', rate: 28.4 },
  { band: '25–36m', rate: 20.1 },
  { band: '37–48m', rate: 17.5 },
  { band: '49–60m', rate: 14.2 },
  { band: '61–72m', rate: 6.6 },
];

const CHURN_RISK_TIERS = [
  { tier: 'High Risk', total: 931, churned: 635, active: 296, rate: 68.2, avgCharge: 81.08, color: '#FF6B6B' },
  { tier: 'Medium Risk', total: 3105, churned: 1028, active: 2077, rate: 33.1, avgCharge: 60.25, color: '#F6C90E' },
  { tier: 'Low Risk', total: 3007, churned: 206, active: 2801, rate: 6.9, avgCharge: 64.37, color: '#3FB950' },
];

const CHURN_HIGH_RISK_SAMPLE = [
  { id:'4929-XIHVW', contract:'Month-to-month', tenure:2, monthly:95.50, internet:'Fiber optic', techSupport:'No', payment:'Electronic check', score:9, churn:'No' },
  { id:'8168-UQWWF', contract:'Month-to-month', tenure:11, monthly:97.85, internet:'Fiber optic', techSupport:'No', payment:'Electronic check', score:9, churn:'Yes' },
  { id:'9237-HQITU', contract:'Month-to-month', tenure:2, monthly:70.70, internet:'Fiber optic', techSupport:'No', payment:'Electronic check', score:9, churn:'Yes' },
  { id:'9305-CDSKC', contract:'Month-to-month', tenure:8, monthly:99.65, internet:'Fiber optic', techSupport:'No', payment:'Electronic check', score:9, churn:'Yes' },
  { id:'6047-YHPVI', contract:'Month-to-month', tenure:5, monthly:69.70, internet:'Fiber optic', techSupport:'No', payment:'Electronic check', score:9, churn:'Yes' },
  { id:'2520-SGTTA', contract:'Month-to-month', tenure:3, monthly:85.40, internet:'Fiber optic', techSupport:'No', payment:'Electronic check', score:9, churn:'No' },
  { id:'7892-POOKP', contract:'Month-to-month', tenure:1, monthly:91.10, internet:'Fiber optic', techSupport:'No', payment:'Electronic check', score:9, churn:'Yes' },
  { id:'1452-KIOVK', contract:'Month-to-month', tenure:7, monthly:78.30, internet:'Fiber optic', techSupport:'No', payment:'Electronic check', score:9, churn:'No' },
];

let churnDonutChart = null;
let churnBarChart = null;
let churnTenureChart = null;

function initChurnDashboard() {
  const filterContract = document.getElementById('churn-filter-contract');
  const filterTier = document.getElementById('churn-filter-tier');
  if (!filterContract) return;

  filterContract.addEventListener('change', updateChurnDashboard);
  filterTier.addEventListener('change', updateChurnDashboard);

  // ROI Simulator sliders
  const retSlider = document.getElementById('churn-retention-rate');
  const costSlider = document.getElementById('churn-cost-per-cust');
  if (retSlider) {
    retSlider.addEventListener('input', updateROISimulator);
    costSlider.addEventListener('input', updateROISimulator);
  }

  updateChurnDashboard();
  updateROISimulator();
}

function updateChurnDashboard() {
  const filterTier = document.getElementById('churn-filter-tier').value;

  // KPIs
  let displayTotal, displayChurned, displayRate, displayRevLost;
  if (filterTier === 'all') {
    displayTotal = CHURN_KPI.totalCustomers;
    displayChurned = CHURN_KPI.churned;
    displayRate = CHURN_KPI.churnRate;
    displayRevLost = CHURN_KPI.annualRevenueLost;
  } else {
    const tier = CHURN_RISK_TIERS.find(t => t.tier === filterTier);
    displayTotal = tier.total;
    displayChurned = tier.churned;
    displayRate = tier.rate;
    displayRevLost = Math.round(tier.churned * tier.avgCharge * 12);
  }

  document.getElementById('churn-kpi-rate').textContent = displayRate.toFixed(1) + '%';
  document.getElementById('churn-kpi-rev').textContent = '$' + displayRevLost.toLocaleString();
  document.getElementById('churn-kpi-highrisk').textContent = CHURN_KPI.highRiskActive;
  document.getElementById('churn-kpi-recover').textContent = '$' + CHURN_KPI.monthlyRecoverable.toLocaleString() + '/mo';

  // Risk Tier Donut
  const donutCtx = document.getElementById('churn-donut-chart').getContext('2d');
  if (churnDonutChart) churnDonutChart.destroy();
  churnDonutChart = new Chart(donutCtx, {
    type: 'doughnut',
    data: {
      labels: CHURN_RISK_TIERS.map(t => t.tier),
      datasets: [{
        data: CHURN_RISK_TIERS.map(t => t.total),
        backgroundColor: CHURN_RISK_TIERS.map(t => t.color),
        borderWidth: 0,
        hoverOffset: 8
      }]
    },
    options: {
      cutout: '65%',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'right', labels: { padding: 12, usePointStyle: true } },
        tooltip: {
          callbacks: {
            label: ctx => ` ${ctx.label}: ${ctx.raw.toLocaleString()} customers (${((ctx.raw/7043)*100).toFixed(1)}%)`
          }
        }
      }
    }
  });

  // Contract Bar Chart
  const barCtx = document.getElementById('churn-contract-chart').getContext('2d');
  if (churnBarChart) churnBarChart.destroy();
  churnBarChart = new Chart(barCtx, {
    type: 'bar',
    data: {
      labels: CHURN_BY_CONTRACT.map(c => c.contract),
      datasets: [{
        label: 'Churn Rate %',
        data: CHURN_BY_CONTRACT.map(c => c.rate),
        backgroundColor: ['#FF6B6B','#F6C90E','#3FB950'],
        borderRadius: 6,
        borderSkipped: false,
        barThickness: 50,
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { max: 55, ticks: { callback: v => v + '%' }, grid: { color: 'rgba(255,255,255,0.04)' } },
        y: { grid: { display: false } }
      },
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: ctx => ` Churn Rate: ${ctx.raw}%` } }
      }
    }
  });

  // Tenure Line Chart
  const tenureCtx = document.getElementById('churn-tenure-chart').getContext('2d');
  if (churnTenureChart) churnTenureChart.destroy();
  churnTenureChart = new Chart(tenureCtx, {
    type: 'line',
    data: {
      labels: CHURN_BY_TENURE.map(t => t.band),
      datasets: [{
        label: 'Churn Rate %',
        data: CHURN_BY_TENURE.map(t => t.rate),
        borderColor: '#FF6B6B',
        backgroundColor: 'rgba(255,107,107,0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: '#FF6B6B',
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: { ticks: { callback: v => v + '%' } },
        x: { grid: { display: false } }
      },
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: ctx => ` Churn: ${ctx.raw}%` } }
      }
    }
  });

  // High Risk Table
  const tbody = document.getElementById('churn-risk-tbody');
  tbody.innerHTML = CHURN_HIGH_RISK_SAMPLE.map(c =>
    `<tr>
      <td><code>${c.id}</code></td>
      <td>${c.contract}</td>
      <td>${c.tenure} mo</td>
      <td>$${c.monthly.toFixed(2)}</td>
      <td>${c.internet}</td>
      <td><span class="risk-score-badge">${c.score}/10</span></td>
      <td><span class="${c.churn === 'Yes' ? 'severity-high' : 'severity-safe'}">${c.churn === 'Yes' ? '❌ Churned' : '✅ Active'}</span></td>
    </tr>`
  ).join('');
}

function updateROISimulator() {
  const retRate = parseInt(document.getElementById('churn-retention-rate').value);
  const costPer = parseInt(document.getElementById('churn-cost-per-cust').value);
  const pool = CHURN_KPI.highRiskActive; // 296
  const avgMonthly = 79.01;
  const ltvMonths = 24;

  document.getElementById('churn-ret-val').textContent = retRate + '%';
  document.getElementById('churn-cost-val').textContent = '$' + costPer;

  const nRetained = Math.round(pool * retRate / 100);
  const revSaved = Math.round(nRetained * avgMonthly * ltvMonths);
  const totalCost = pool * costPer;
  const netBenefit = revSaved - totalCost;
  const roi = totalCost > 0 ? Math.round((netBenefit / totalCost) * 100) : Infinity;

  document.getElementById('roi-retained').textContent = nRetained;
  document.getElementById('roi-revenue').textContent = '$' + revSaved.toLocaleString();
  document.getElementById('roi-cost').textContent = '$' + totalCost.toLocaleString();
  document.getElementById('roi-pct').textContent = roi.toLocaleString() + '%';

  // Recommendation
  const recEl = document.getElementById('roi-recommendation');
  if (roi > 300) {
    recEl.innerHTML = '<span class="rec-badge rec-strong">✅ STRONG BUY</span> Immediate deployment recommended — ROI exceeds 300%.';
  } else if (roi > 100) {
    recEl.innerHTML = '<span class="rec-badge rec-good">👍 RECOMMENDED</span> Positive ROI. Test at small scale before full rollout.';
  } else if (roi > 0) {
    recEl.innerHTML = '<span class="rec-badge rec-marginal">⚠️ MARGINAL</span> Slim ROI. Reduce cost per customer or boost retention rate.';
  } else {
    recEl.innerHTML = '<span class="rec-badge rec-bad">❌ NOT VIABLE</span> Negative ROI at current parameters. Adjust inputs.';
  }
}
