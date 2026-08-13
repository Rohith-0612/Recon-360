import { Injectable } from '@nestjs/common';
import { CLIENTS } from '../data/clients.data';
import { computeScore, fmtMoney, parseAcv } from '../common/scoring.util';
import { MarginFlag, MarginResponse, MarginRow } from './margin.types';

@Injectable()
export class MarginService {
  /** Ports renderMargin(): cost-to-serve = base + usage-intensity + over-usage penalty, capped at 85%. */
  getMargin(basePct: number, intensityPct: number, overagePenaltyPct: number): MarginResponse {
    const base = basePct / 100;
    const intensity = intensityPct / 100;
    const overagePenalty = overagePenaltyPct / 100;

    let totalAcv = 0;
    let totalCost = 0;
    let hiddenLowMarginCount = 0;
    let marginDilutiveCount = 0;

    const rows: MarginRow[] = CLIENTS.map((c) => {
      const acv = parseAcv(c.acv);
      const avgUtil = c.products.reduce((t, p) => t + p.util, 0) / c.products.length;
      const hasOver = c.products.some((p) => p.util > 100);
      const costRatio = Math.min(base + (avgUtil / 100) * intensity + (hasOver ? overagePenalty : 0), 0.85);
      const cost = acv * costRatio;
      const margin = acv - cost;
      const marginPct = (1 - costRatio) * 100;
      const healthScore = computeScore(c);

      totalAcv += acv;
      totalCost += cost;
      if (marginPct < 40) marginDilutiveCount++;

      let flag: MarginFlag;
      if (healthScore >= 70 && marginPct < 50) {
        flag = 'hidden';
        hiddenLowMarginCount++;
      } else if (marginPct < 40) {
        flag = 'low';
      } else if (marginPct < 50) {
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
      assumptions: { basePct, intensityPct, overagePenaltyPct },
      rows,
      bookMarginPct: Math.round((1 - totalCost / totalAcv) * 100),
      hiddenLowMarginCount,
      marginDilutiveCount,
    };
  }
}
