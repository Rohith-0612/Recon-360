const fs = require('fs');
const path = require('path');

const DATA_PATH = path.resolve(__dirname, '..', '..', 'apps', 'api', 'src', 'data', 'clients.data.ts');

function loadClientsModule() {
  const text = fs.readFileSync(DATA_PATH, 'utf8');
  const stripped = text
    .replace(/^import .*$/m, '')
    .replace(/export const MONTHS: string\[\] =/, 'exports.MONTHS =')
    .replace(/export const DRIVER_WEIGHTS: Record<string, number> =/, 'exports.DRIVER_WEIGHTS =')
    .replace(/export const PORTFOLIO: RawPortfolio =/, 'exports.PORTFOLIO =')
    .replace(/export const CLIENTS: RawClient\[\] =/, 'exports.CLIENTS =');
  const module = { exports: {} };
  new Function('exports', stripped)(module.exports);
  return module.exports;
}

module.exports = { DATA_PATH, loadClientsModule };
