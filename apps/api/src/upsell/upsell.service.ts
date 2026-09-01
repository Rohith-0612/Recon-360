import { Injectable } from '@nestjs/common';
import { CLIENTS } from '../data/clients.data';
import { fmtMoney, mapProductStatus } from '../common/scoring.util';
import { UpsellPlay, UpsellResponse } from './upsell.types';

@Injectable()
export class UpsellService {
  /** Every client with a real upsell signal becomes a priced expansion play; retention-only accounts (signal: null) are excluded. */
  getUpsell(): UpsellResponse {
    let total = 0;
    const plays: UpsellPlay[] = [];

    CLIENTS.forEach((c) => {
      const { upsell } = c;
      if (!upsell.signal) return;

      const product = c.products.find((p) => p.bought === upsell.commit && p.used === upsell.actual);
      const uplift = upsell.acv_uplift ?? 0;

      plays.push({
        clientId: c.id,
        clientName: c.name,
        productName: product?.product ?? c.contracted_products[0] ?? '',
        signal: product && mapProductStatus(product.status) === 'over' ? 'over_usage' : 'whitespace',
        currentCommit: `${upsell.commit ?? 0} ${upsell.unit ?? ''}`.trim(),
        actualUsage: `${upsell.actual ?? 0} ${upsell.unit ?? ''}`.trim(),
        recommendation: upsell.recommendation ?? '',
        upliftAcv: uplift,
        upliftAcvLabel: fmtMoney(uplift),
        routedTo: upsell.owner ?? 'Sales',
      });
      total += uplift;
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
