const path = require('path');
const XLSX = require('xlsx');
const { loadClientsModule } = require('./lib/load-clients-data');

const { CLIENTS, MONTHS, DRIVER_WEIGHTS } = loadClientsModule();
const DRIVERS = Object.keys(DRIVER_WEIGHTS); // Utilization, Value Delivered, Timely Payments, Products, Relationship

function driverCols(client) {
  const byName = Object.fromEntries(client.score_drivers.map(d => [d.driver, d]));
  const cols = {};
  DRIVERS.forEach(name => {
    const key = name.replace(/[^A-Za-z]+/g, '_').replace(/^_+|_+$/g, '');
    const d = byName[name] || {};
    cols[`Driver_${key}_Score`] = d.score ?? '';
    cols[`Driver_${key}_QoQ`] = d.qoq_delta ?? '';
  });
  return cols;
}

const rows = [];
CLIENTS.forEach(c => {
  const base = {
    Client_ID: c.id,
    Client_Name: c.name,
    Salesforce_ID: c.salesforce_id,
    Status: c.status,
    ARR: c.arr,
    MRR: c.mrr,
    ACV: c.acv,
    Date_Onboarded: c.date_onboarded,
    Renewal_Date: c.renewal_date,
    Days_To_Renewal: c.days_to_renewal,
    Last_Upload_Date: c.last_upload_date,
    Months_Since_Upload: c.months_since_upload,
    Billing_Metrics: c.billing_metrics,
    CRM_Risk: c.crm_risk,
    Health_Score: c.health_score,
    Health_Tier: c.health_tier,
    ...driverCols(c),
    Product_Count: c.products.length,
    Margin_Pct: c.margin.margin_pct,
    Cost_To_Serve_Pct: c.margin.cost_to_serve_pct,
    Margin_Quadrant: c.margin.quadrant,
    Upsell_Commit: c.upsell.commit ?? '',
    Upsell_Actual: c.upsell.actual ?? '',
    Upsell_Unit: c.upsell.unit ?? '',
    Upsell_ACV_Uplift: c.upsell.acv_uplift ?? '',
    Risk_Flags: c.risk_flags.join('; '),
  };

  c.products.forEach(p => {
    const row = {
      ...base,
      Product_Name: p.product,
      Product_Bought: p.bought,
      Product_Used: p.used,
      Product_Billed: p.billed,
      Product_Unit: p.unit,
      Product_Utilization: p.utilization,
      Product_Status: p.status,
    };
    p.usage_series.forEach((v, i) => {
      row[`Usage_${MONTHS[i] || 'M' + (i + 1)}`] = v;
    });
    rows.push(row);
  });
});

const ws = XLSX.utils.json_to_sheet(rows);
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, 'Clients');

const outPath = path.resolve(__dirname, '..', 'Recon360_Clients.xlsx');
XLSX.writeFile(wb, outPath);
console.log(`Wrote ${rows.length} rows (${CLIENTS.length} clients) to ${outPath}`);
