const chokidar = require('chokidar');
const { syncOnce, EXCEL_PATH } = require('./lib/sync-core');

const DEBOUNCE_MS = 800; // Excel writes the file in several steps on save; wait for it to settle.
let timer = null;

function scheduleSync() {
  clearTimeout(timer);
  timer = setTimeout(() => {
    try {
      syncOnce();
    } catch (err) {
      console.error('[excel-watch] sync failed:', err.message);
    }
  }, DEBOUNCE_MS);
}

console.log(`[excel-watch] watching ${EXCEL_PATH} for changes...`);
console.log('[excel-watch] save the sheet and clients.data.ts will update automatically.');

chokidar
  .watch(EXCEL_PATH, { awaitWriteFinish: { stabilityThreshold: 300, pollInterval: 100 } })
  .on('change', scheduleSync)
  .on('error', (err) => console.error('[excel-watch] watcher error:', err.message));
