const fs = require('fs');
const { DATA_PATH, loadClientsModule } = require('./lib/load-clients-data');
const { formatClient } = require('./lib/sync-core');

// Old driver -> new driver name, and each new driver's weight.
const RENAME = {
  Utilization: 'Utilization',
  'Product Adoption': 'Products',
  'ROI / Value': 'Value Delivered',
  'Payment / AR': 'Timely Payments',
  Relationship: 'Relationship',
};
const NEW_WEIGHTS = {
  Utilization: 30,
  'Value Delivered': 30,
  'Timely Payments': 20,
  Products: 10,
  Relationship: 10,
};
const NEW_ORDER = ['Utilization', 'Value Delivered', 'Timely Payments', 'Products', 'Relationship'];
const OLD_NAME_FOR = Object.fromEntries(Object.entries(RENAME).map(([oldName, newName]) => [newName, oldName]));

const { CLIENTS } = loadClientsModule();

const migratedClients = CLIENTS.map((c) => {
  const byOldName = Object.fromEntries(c.score_drivers.map((d) => [d.driver, d]));
  const score_drivers = NEW_ORDER.map((newName) => {
    const old = byOldName[OLD_NAME_FOR[newName]];
    return { driver: newName, weight: NEW_WEIGHTS[newName], score: old.score, qoq_delta: old.qoq_delta };
  });
  return { ...c, score_drivers };
});

function formatDriverWeights() {
  const lines = ['export const DRIVER_WEIGHTS: Record<string, number> = {'];
  NEW_ORDER.forEach((name) => {
    const key = /^[A-Za-z]+$/.test(name) ? name : `'${name}'`;
    lines.push(`  ${key}: ${NEW_WEIGHTS[name]},`);
  });
  lines.push('};');
  return lines.join('\n');
}

let text = fs.readFileSync(DATA_PATH, 'utf8');

const dwMarker = 'export const DRIVER_WEIGHTS: Record<string, number> = {';
const dwStart = text.indexOf(dwMarker);
const dwEnd = text.indexOf('};', dwStart) + 2;
if (dwStart === -1) throw new Error('DRIVER_WEIGHTS block not found');
text = text.slice(0, dwStart) + formatDriverWeights() + text.slice(dwEnd);

const clientsMarker = 'export const CLIENTS: RawClient[] = [';
const cStart = text.indexOf(clientsMarker);
if (cStart === -1) throw new Error('CLIENTS block not found');
const prefix = text.slice(0, cStart);
const newClientsBlock = `export const CLIENTS: RawClient[] = [\n${migratedClients.map(formatClient).join(',\n')}\n];\n`;

fs.writeFileSync(DATA_PATH, prefix + newClientsBlock);
console.log(`Migrated score_drivers for ${migratedClients.length} clients and rewrote DRIVER_WEIGHTS in ${DATA_PATH}`);
