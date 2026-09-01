import { Injectable } from '@nestjs/common';
import { CLIENTS } from '../data/clients.data';
import { fmtMoney } from '../common/scoring.util';
import { MarginFlag, MarginResponse, MarginRow } from './margin.types';

const MARGIN_DILUTIVE_THRESHOLD = 40;
const MARGIN_WATCH_THRESHOLD = 50;
const HIDDEN_HEALTH_THRESHOLD = 70;

@Injectable()
export class MarginService {
  /** Real margin_pct/cost_to_serve_pct per client, straight from the dataset — no formula. */
  getMargin(): MarginResponse {
    let totalAcv = 0;
    let totalCost = 0;
    let hiddenLowMarginCount = 0;
    let marginDilutiveCount = 0;

    const rows: MarginRow[] = CLIENTS.map((c) => {
      const acv = c.arr;
      const marginPct = c.margin.margin_pct;
      const cost = acv * (c.margin.cost_to_serve_pct / 100);
      const margin = acv - cost;
      const healthScore = c.health_score;

      totalAcv += acv;
      totalCost += cost;
      if (marginPct < MARGIN_DILUTIVE_THRESHOLD) marginDilutiveCount++;

      let flag: MarginFlag;
      if (healthScore >= HIDDEN_HEALTH_THRESHOLD && marginPct < MARGIN_WATCH_THRESHOLD) {
        flag = 'hidden';
        hiddenLowMarginCount++;
      } else if (marginPct < MARGIN_DILUTIVE_THRESHOLD) {
        flag = 'low';
      } else if (marginPct < MARGIN_WATCH_THRESHOLD) {
        flag = 'watch';
      } else {
        flag = 'ok';
      }

      return {
        clientId: c.id,
        clientName: c.name,
        acv,
        acvLabel: fmtMoney(acv),
        costToServe: cost,
        costToServeLabel: fmtMoney(cost),
        grossMargin: margin,
        grossMarginLabel: fmtMoney(margin),
        marginPct,
        healthScore,
        flag,
      };
    }).sort((a, b) => a.marginPct - b.marginPct);

    return {
      rows,
      bookMarginPct: Math.round((1 - totalCost / totalAcv) * 100),
      hiddenLowMarginCount,
      marginDilutiveCount,
    };
  }
}
