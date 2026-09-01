const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const { DATA_PATH, loadClientsModule } = require('./load-clients-data');

const EXCEL_PATH = path.resolve(__dirname, '..', '..', 'Recon360_Clients.xlsx');

function driverKey(name) {
  return name.replace(/[^A-Za-z]+/g, '_').replace(/^_+|_+$/g, '');
}

function num(v, fallback = 0) {
  if (v === '' || v === undefined || v === null) return fallback;
  const n = Number(v);
  return Number.isNaN(n) ? fallback : n;
}

function q(v) {
  return JSON.stringify(v);
}

function formatClient(c) {
  const lines = [];
  lines.push(`  {`);
  lines.push(`    "id": ${q(c.id)}, "name": ${q(c.name)}, "salesforce_id": ${q(c.salesforce_id)},`);
  lines.push(`    "status": ${q(c.status)}, "arr": ${c.arr}, "mrr": ${c.mrr}, "acv": ${c.acv},`);
  lines.push(`    "date_onboarded": ${q(c.date_onboarded)}, "renewal_date": ${q(c.renewal_date)}, "days_to_renewal": ${c.days_to_renewal},`);
  lines.push(`    "last_upload_date": ${q(c.last_upload_date)}, "months_since_upload": ${c.months_since_upload}, "billing_metrics": ${q(c.billing_metrics)}, "crm_risk": ${q(c.crm_risk)},`);
  lines.push(`    "contracted_products": ${q(c.contracted_products)}, "health_score": ${c.health_score}, "health_tier": ${q(c.health_tier)},`);
  lines.push(`    "score_drivers": [`);
  c.score_drivers.forEach((d, i) => {
    const comma = i < c.score_drivers.length - 1 ? ',' : '';
    lines.push(`      { "driver": ${q(d.driver)}, "weight": ${d.weight}, "score": ${d.score}, "qoq_delta": ${d.qoq_delta} }${comma}`);
  });
  lines.push(`    ],`);
  lines.push(`    "products": [`);
  c.products.forEach((p, i) => {
    const comma = i < c.products.length - 1 ? ',' : '';
    lines.push(`      { "product": ${q(p.product)}, "bought": ${p.bought}, "used": ${p.used}, "billed": ${p.billed}, "unit": ${q(p.unit)}, "utilization": ${p.utilization}, "status": ${q(p.status)},`);
    lines.push(`        "usage_series": ${q(p.usage_series)} }${comma}`);
  });
  lines.push(`    ],`);
  lines.push(`    "evidence": ${q(c.evidence)},`);
  lines.push(`    "recommended_action": ${q(c.recommended_action)}, "action_owner": ${q(c.action_owner)},`);
  lines.push(`    "margin": { "margin_pct": ${c.margin.margin_pct}, "cost_to_serve_pct": ${c.margin.cost_to_serve_pct}, "quadrant": ${q(c.margin.quadrant)} },`);
  lines.push(`    "upsell": ${q(c.upsell)},`);
  lines.push(`    "risk_flags": ${q(c.risk_flags)}`);
  lines.push(`  }`);
  return lines.join('\n');
}

/**
 * Reads Recon360_Clients.xlsx, merges it with the narrative fields already in
 * clients.data.ts (evidence/recommendations aren't in the sheet), and rewrites
 * clients.data.ts in place. Returns false without writing if nothing changed.
 */
function syncOnce({ silent = false } = {}) {
  const log = silent ? () => {} : (...args) => console.log(...args);

  const { CLIENTS: OLD_CLIENTS, MONTHS, DRIVER_WEIGHTS } = loadClientsModule();
  const DRIVERS = Object.keys(DRIVER_WEIGHTS);
  const oldById = Object.fromEntries(OLD_CLIENTS.map((c) => [c.id, c]));

  const wb = XLSX.readFile(EXCEL_PATH);
  const rows = XLSX.utils.sheet_to_json(wb.Sheets['Clients']);

  const groups = new Map();
  rows.forEach((r) => {
    const id = String(r.Client_ID).trim();
    if (!groups.has(id)) groups.set(id, []);
    groups.get(id).push(r);
  });

  function buildClient(id, groupRows) {
    const first = groupRows[0];
    const old = oldById[id] || {};

    const score_drivers = DRIVERS.map((name) => {
      const key = driverKey(name);
      return {
        driver: name,
        weight: DRIVER_WEIGHTS[name],
        score: num(first[`Driver_${key}_Score`]),
        qoq_delta: num(first[`Driver_${key}_QoQ`]),
      };
    });

    const products = groupRows.map((r) => {
      const usage_series = MONTHS.map((m, i) => num(r[`Usage_${m}`] ?? r[`Usage_M${i + 1}`]));
      return {
        product: r.Product_Name,
        bought: num(r.Product_Bought),
        used: num(r.Product_Used),
        billed: num(r.Product_Billed),
        unit: r.Product_Unit || '',
        utilization: num(r.Product_Utilization),
        status: r.Product_Status || '',
        usage_series,
      };
    });

    const oldUpsell = old.upsell || {};
    const upsellCommit = first.Upsell_Commit === '' || first.Upsell_Commit === undefined ? undefined : num(first.Upsell_Commit);

    return {
      id,
      name: first.Client_Name,
      salesforce_id: first.Salesforce_ID,
      status: first.Status,
      arr: num(first.ARR),
      mrr: num(first.MRR),
      acv: num(first.ACV),
      date_onboarded: first.Date_Onboarded,
      renewal_date: first.Renewal_Date,
      days_to_renewal: num(first.Days_To_Renewal),
      last_upload_date: first.Last_Upload_Date,
      months_since_upload: num(first.Months_Since_Upload),
      billing_metrics: first.Billing_Metrics,
      crm_risk: first.CRM_Risk,
      contracted_products: products.map((p) => p.product),
      health_score: num(first.Health_Score),
      health_tier: first.Health_Tier,
      score_drivers,
      products,
      evidence: old.evidence || [],
      recommended_action: old.recommended_action || '',
      action_owner: old.action_owner || '',
      margin: {
        margin_pct: num(first.Margin_Pct),
        cost_to_serve_pct: num(first.Cost_To_Serve_Pct),
        quadrant: first.Margin_Quadrant || '',
      },
      upsell: {
        signal: oldUpsell.signal ?? null,
        ...(upsellCommit !== undefined ? { commit: upsellCommit } : {}),
        ...(first.Upsell_Actual !== '' && first.Upsell_Actual !== undefined ? { actual: num(first.Upsell_Actual) } : {}),
        ...(first.Upsell_Unit ? { unit: first.Upsell_Unit } : {}),
        ...(oldUpsell.recommendation ? { recommendation: oldUpsell.recommendation } : {}),
        ...(first.Upsell_ACV_Uplift !== '' && first.Upsell_ACV_Uplift !== undefined ? { acv_uplift: num(first.Upsell_ACV_Uplift) } : {}),
        ...(oldUpsell.owner ? { owner: oldUpsell.owner } : {}),
        ...(oldUpsell.note ? { note: oldUpsell.note } : {}),
      },
      risk_flags: (first.Risk_Flags || '').split(';').map((s) => s.trim()).filter(Boolean),
    };
  }

  const orderedIds = [...OLD_CLIENTS.map((c) => c.id), ...[...groups.keys()].filter((id) => !oldById[id])];
  const NEW_CLIENTS = orderedIds.filter((id) => groups.has(id)).map((id) => buildClient(id, groups.get(id)));

  const originalText = fs.readFileSync(DATA_PATH, 'utf8');
  const marker = 'export const CLIENTS: RawClient[] = [';
  const idx = originalText.indexOf(marker);
  if (idx === -1) {
    throw new Error(`Could not find "${marker}" in ${DATA_PATH}`);
  }
  const prefix = originalText.slice(0, idx);
  const newText = prefix + `export const CLIENTS: RawClient[] = [\n${NEW_CLIENTS.map(formatClient).join(',\n')}\n];\n`;

  if (newText === originalText) {
    log('No changes detected — clients.data.ts already matches the spreadsheet.');
    return false;
  }

  fs.writeFileSync(DATA_PATH, newText);
  log(`Synced ${NEW_CLIENTS.length} clients from ${EXCEL_PATH} into ${DATA_PATH}`);
  return true;
}

module.exports = { syncOnce, EXCEL_PATH, formatClient };
