import { Injectable } from '@nestjs/common';
import { CLIENTS, PMETA, SCALE } from '../data/clients.data';
import { fmtMoney, fmtN, parseAcv } from '../common/scoring.util';
import { UpsellPlay, UpsellResponse } from './upsell.types';

@Injectable()
export class UpsellService {
  /** Ports renderUpsell(): every over-usage line and every used-not-billed line becomes a priced expansion play. */
  getUpsell(): UpsellResponse {
    let total = 0;
    const plays: UpsellPlay[] = [];

    CLIENTS.forEach((c) => {
      const scale = SCALE[c.id] ?? 1;
      const acv = parseAcv(c.acv);
      c.products.forEach((p) => {
        const meta = PMETA[p.id];
        const contracted = (meta?.base ?? 100) * scale;
        const used = (p.util / 100) * contracted;
        const unit = meta?.unit ?? '';
        const mil = meta?.mil ?? false;

        if (p.util > 100) {
          const over = p.util - 100;
          const uplift = acv * 0.1 * (over / 15);
          plays.push({
            clientId: c.id,
            clientName: c.name,
            productName: p.name,
            signal: 'over_usage',
            currentCommit: `${fmtN(contracted, mil)} ${unit}`,
            actualUsage: `${fmtN(used, mil)} ${unit}`,
            recommendation: `Upgrade tier +${Math.ceil(over / 10) * 10}%`,
            upliftAcv: uplift,
            upliftAcvLabel: fmtMoney(uplift),
            routedTo: 'Sales quote · Finance overage',
          });
          total += uplift;
        } else if (p.status === 'usenobill') {
          const uplift = acv * 0.09;
          plays.push({
            clientId: c.id,
            clientName: c.name,
            productName: p.name,
            signal: 'whitespace',
            currentCommit: 'no contract',
            actualUsage: `${fmtN(used, mil)} ${unit}`,
            recommendation: 'New product line',
            upliftAcv: uplift,
            upliftAcvLabel: fmtMoney(uplift),
            routedTo: 'Sales quote',
          });
          total += uplift;
        }
      });
    });

    plays.sort((a, b) => b.upliftAcv - a.upliftAcv);

    return {
      plays,
      totalUplift: total,
      totalUpliftLabel: fmtMoney(total),
      playCount: plays.length,
    };
  }
}
