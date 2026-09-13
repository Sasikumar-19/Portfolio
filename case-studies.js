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

const FINANCE_DATA = [
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

const FINANCE_CATEGORIES = ['Food & Dining','Transport','Shopping','Bills & Rent','Entertainment','Health','Education','Travel','UPI Transfer','Others'];
const FINANCE_CAT_COLORS = {
  'Food & Dining':'#E74C3C','Transport':'#3498DB','Shopping':'#9B59B6',
  'Bills & Rent':'#E67E22','Entertainment':'#1ABC9C','Health':'#27AE60',
  'Education':'#2980B9','Travel':'#F39C12','UPI Transfer':'#EC407A','Others':'#95A5A6'
};

const FINANCE_MONTHS = ['Jan','Feb','Mar','Apr','May','Jun'];
const PERSONA_DATA = {
  months: ['Jan','Feb','Mar','Apr','May','Jun'],
  personas: ['🟢 Saver','🔵 Balanced','🔵 Balanced','🔵 Balanced','🔴 High Spender','🔵 Balanced'],
  totals: [28299, 29700, 39550, 22054, 49500, 38049],
};

let financeDonutChart = null;
let financeTrendChart = null;

function initFinanceDashboard() {
  const filterMonth = document.getElementById('fin-filter-month');
  const filterCat = document.getElementById('fin-filter-category');
  const filterAnomaly = document.getElementById('fin-filter-anomaly');
  if (!filterMonth) return; // guard if HTML not loaded

  filterMonth.addEventListener('change', updateFinanceDashboard);
  filterCat.addEventListener('change', updateFinanceDashboard);
  filterAnomaly.addEventListener('change', updateFinanceDashboard);

  updateFinanceDashboard();
}

function getFilteredFinanceData() {
  const month = document.getElementById('fin-filter-month').value;
  const cat = document.getElementById('fin-filter-category').value;
  const anomaly = document.getElementById('fin-filter-anomaly').value;

  return FINANCE_DATA.filter(t => {
    const m = new Date(t.date).getMonth(); // 0-indexed
    if (month !== 'all' && m !== parseInt(month)) return false;
    if (cat !== 'all' && t.category !== cat) return false;
    if (anomaly === 'anomaly' && !t.anomaly) return false;
    if (anomaly === 'normal' && t.anomaly) return false;
    return true;
  });
}

function updateFinanceDashboard() {
  const data = getFilteredFinanceData();

  // KPIs
  const totalSpend = data.reduce((s, t) => s + t.amount, 0);
  const anomalyCount = data.filter(t => t.anomaly).length;
  const avgMonthly = totalSpend / 6;
  const savingsPotential = Math.round(totalSpend * 0.12);

  document.getElementById('fin-kpi-total').textContent = '₹' + totalSpend.toLocaleString('en-IN');
  document.getElementById('fin-kpi-avg').textContent = '₹' + Math.round(avgMonthly).toLocaleString('en-IN');
  document.getElementById('fin-kpi-anomalies').textContent = anomalyCount;
  document.getElementById('fin-kpi-savings').textContent = '₹' + savingsPotential.toLocaleString('en-IN');

  // Donut Chart
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
            label: ctx => ` ${ctx.label}: ₹${ctx.raw.toLocaleString('en-IN')} (${((ctx.raw/totalSpend)*100).toFixed(1)}%)`
          }
        }
      }
    }
  });

  // Monthly Trend Bar Chart
  const monthlyTotals = [0,0,0,0,0,0];
  const monthlyAnomalies = [0,0,0,0,0,0];
  data.forEach(t => {
    const m = new Date(t.date).getMonth();
    monthlyTotals[m] += t.amount;
    if (t.anomaly) monthlyAnomalies[m] += t.amount;
  });

  const trendCtx = document.getElementById('fin-trend-chart').getContext('2d');
  if (financeTrendChart) financeTrendChart.destroy();
  financeTrendChart = new Chart(trendCtx, {
    type: 'bar',
    data: {
      labels: FINANCE_MONTHS,
      datasets: [
        {
          label: 'Normal Spend',
          data: monthlyTotals.map((t,i) => t - monthlyAnomalies[i]),
          backgroundColor: 'rgba(14, 165, 233, 0.7)',
          borderRadius: 6,
          borderSkipped: false,
        },
        {
          label: '🚨 Anomaly Spend',
          data: monthlyAnomalies,
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
          ticks: { callback: v => '₹' + (v/1000).toFixed(0) + 'K' }
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

  // Anomaly Table
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
  ).join('') : '<tr><td colspan="5" style="text-align:center;color:var(--text-secondary)">No anomalies in current filter</td></tr>';

  // Persona cards
  updatePersonaCards();
}

function updatePersonaCards() {
  const container = document.getElementById('fin-persona-cards');
  if (!container) return;
  container.innerHTML = PERSONA_DATA.months.map((m, i) =>
    `<div class="persona-card ${PERSONA_DATA.personas[i].includes('Saver') ? 'saver' : PERSONA_DATA.personas[i].includes('High') ? 'high-spender' : 'balanced'}">
      <div class="persona-month">${m}</div>
      <div class="persona-label">${PERSONA_DATA.personas[i]}</div>
      <div class="persona-amount">₹${PERSONA_DATA.totals[i].toLocaleString('en-IN')}</div>
    </div>`
  ).join('');
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
