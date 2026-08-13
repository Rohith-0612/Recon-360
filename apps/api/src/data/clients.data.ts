import { ClientRecord, ProductMeta } from './types';

// Ported verbatim from product_360_demo.html (CLIENTS/PMETA/SCALE/WEIGHTS) — the mock dataset behind every endpoint.
export const CLIENTS: ClientRecord[] = [
  {
    "id": "orionautogroup",
    "name": "Orion Auto Group",
    "sub": "Automotive · CSM: Priya Nair · SFDC #A-10000",
    "avatar": "OA",
    "acv": "$770K",
    "tenure": "6.3 yrs",
    "renewal": "310 days",
    "delta": 2,
    "drivers": [
      {
        "name": "Utilization",
        "value": 90,
        "delta": 3,
        "color": "green",
        "related": []
      },
      {
        "name": "Product Adoption",
        "value": 83,
        "delta": 2,
        "color": "green",
        "related": []
      },
      {
        "name": "ROI / Value",
        "value": 92,
        "delta": 1,
        "color": "green",
        "related": []
      },
      {
        "name": "Payment / AR",
        "value": 92,
        "delta": 0,
        "color": "green",
        "related": []
      },
      {
        "name": "Relationship",
        "value": 87,
        "delta": 2,
        "color": "green",
        "related": []
      }
    ],
    "products": [
      {
        "id": "datacollab",
        "name": "Data Collaboration",
        "category": "clean-room",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 116,
        "trend": "up",
        "status": "over"
      },
      {
        "id": "identity",
        "name": "Identity Resolution (RampID)",
        "category": "identity",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 88,
        "trend": "up",
        "status": "healthy"
      },
      {
        "id": "activation",
        "name": "Activation / Destinations",
        "category": "activation",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 85,
        "trend": "up",
        "status": "healthy"
      },
      {
        "id": "measurement",
        "name": "Measurement",
        "category": "analytics",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 81,
        "trend": "up",
        "status": "healthy"
      },
      {
        "id": "ctv",
        "name": "TV / CTV Signal",
        "category": "media",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 76,
        "trend": "up",
        "status": "healthy"
      }
    ],
    "aiQuestion": "Is Orion Auto Group a reference-account candidate?",
    "aiAnswer": "Yes — <b>89 (▲2)</b>, one of the strongest accounts. Full suite adopted, all 5 products above 76% utilization, clean billing, renewal 310 days out. Ideal advocate / case-study candidate.",
    "insights": [
      {
        "tag": "grow",
        "label": "↗ Advocacy · CSM",
        "title": "Full-suite, high adoption",
        "desc": "Every owned product is highly adopted — a model account for a case study or reference.",
        "action": "→ Nominate for advocacy program"
      },
      {
        "tag": "grow",
        "label": "⚡ Overage trigger · Finance",
        "title": "Data Collaboration 16% over allotment",
        "desc": "A contracted product is over its committed volume — bill the overage and move to a higher tier.",
        "action": "→ Trigger overage bill + tier upgrade"
      },
      {
        "tag": "fin",
        "label": "⇄ Reconciliation · Finance",
        "title": "Clean billing alignment",
        "desc": "All lines reconcile — no disputes.",
        "action": "→ No action needed"
      }
    ],
    "narrative": "Orion Auto Group is a flagship account at <b>89 (▲2)</b>, with the full suite adopted and strong utilization across every line — <b>Data Collaboration is now 16% over its allotment</b>, a billable overage and tier-upgrade trigger. Renewal is 310 days out. An ideal <b>reference / advocacy candidate</b>."
  },
  {
    "id": "meridianairlin",
    "name": "Meridian Airlines",
    "sub": "Travel & Transport · CSM: Marco Ruiz · SFDC #A-10137",
    "avatar": "MA",
    "acv": "$1.32M",
    "tenure": "7.1 yrs",
    "renewal": "285 days",
    "delta": 2,
    "drivers": [
      {
        "name": "Utilization",
        "value": 91,
        "delta": 3,
        "color": "green",
        "related": []
      },
      {
        "name": "Product Adoption",
        "value": 83,
        "delta": 2,
        "color": "green",
        "related": []
      },
      {
        "name": "ROI / Value",
        "value": 88,
        "delta": 1,
        "color": "green",
        "related": []
      },
      {
        "name": "Payment / AR",
        "value": 95,
        "delta": 0,
        "color": "green",
        "related": []
      },
      {
        "name": "Relationship",
        "value": 81,
        "delta": 2,
        "color": "green",
        "related": []
      }
    ],
    "products": [
      {
        "id": "datacollab",
        "name": "Data Collaboration",
        "category": "clean-room",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 116,
        "trend": "up",
        "status": "over"
      },
      {
        "id": "identity",
        "name": "Identity Resolution (RampID)",
        "category": "identity",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 88,
        "trend": "up",
        "status": "healthy"
      },
      {
        "id": "activation",
        "name": "Activation / Destinations",
        "category": "activation",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 85,
        "trend": "up",
        "status": "healthy"
      },
      {
        "id": "measurement",
        "name": "Measurement",
        "category": "analytics",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 81,
        "trend": "up",
        "status": "healthy"
      },
      {
        "id": "ctv",
        "name": "TV / CTV Signal",
        "category": "media",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 76,
        "trend": "up",
        "status": "healthy"
      }
    ],
    "aiQuestion": "Is Meridian Airlines a reference-account candidate?",
    "aiAnswer": "Yes — <b>88 (▲2)</b>, one of the strongest accounts. Full suite adopted, all 5 products above 76% utilization, clean billing, renewal 285 days out. Ideal advocate / case-study candidate.",
    "insights": [
      {
        "tag": "grow",
        "label": "↗ Advocacy · CSM",
        "title": "Full-suite, high adoption",
        "desc": "Every owned product is highly adopted — a model account for a case study or reference.",
        "action": "→ Nominate for advocacy program"
      },
      {
        "tag": "grow",
        "label": "⚡ Overage trigger · Finance",
        "title": "Data Collaboration 16% over allotment",
        "desc": "A contracted product is over its committed volume — bill the overage and move to a higher tier.",
        "action": "→ Trigger overage bill + tier upgrade"
      },
      {
        "tag": "fin",
        "label": "⇄ Reconciliation · Finance",
        "title": "Clean billing alignment",
        "desc": "All lines reconcile — no disputes.",
        "action": "→ No action needed"
      }
    ],
    "narrative": "Meridian Airlines is a flagship account at <b>88 (▲2)</b>, with the full suite adopted and strong utilization across every line — <b>Data Collaboration is now 16% over its allotment</b>, a billable overage and tier-upgrade trigger. Renewal is 285 days out. An ideal <b>reference / advocacy candidate</b>."
  },
  {
    "id": "cascadebeverag",
    "name": "Cascade Beverages",
    "sub": "CPG · CSM: Dana Kim · SFDC #A-10274",
    "avatar": "CB",
    "acv": "$910K",
    "tenure": "4.8 yrs",
    "renewal": "260 days",
    "delta": 2,
    "drivers": [
      {
        "name": "Utilization",
        "value": 92,
        "delta": 3,
        "color": "green",
        "related": []
      },
      {
        "name": "Product Adoption",
        "value": 83,
        "delta": 2,
        "color": "green",
        "related": []
      },
      {
        "name": "ROI / Value",
        "value": 90,
        "delta": 1,
        "color": "green",
        "related": []
      },
      {
        "name": "Payment / AR",
        "value": 91,
        "delta": 0,
        "color": "green",
        "related": []
      },
      {
        "name": "Relationship",
        "value": 87,
        "delta": 2,
        "color": "green",
        "related": []
      }
    ],
    "products": [
      {
        "id": "datacollab",
        "name": "Data Collaboration",
        "category": "clean-room",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 112,
        "trend": "up",
        "status": "over"
      },
      {
        "id": "identity",
        "name": "Identity Resolution (RampID)",
        "category": "identity",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 88,
        "trend": "up",
        "status": "healthy"
      },
      {
        "id": "activation",
        "name": "Activation / Destinations",
        "category": "activation",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 85,
        "trend": "up",
        "status": "healthy"
      },
      {
        "id": "measurement",
        "name": "Measurement",
        "category": "analytics",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 81,
        "trend": "up",
        "status": "healthy"
      },
      {
        "id": "ctv",
        "name": "TV / CTV Signal",
        "category": "media",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 76,
        "trend": "up",
        "status": "healthy"
      }
    ],
    "aiQuestion": "Is Cascade Beverages a reference-account candidate?",
    "aiAnswer": "Yes — <b>89 (▲2)</b>, one of the strongest accounts. Full suite adopted, all 5 products above 76% utilization, clean billing, renewal 260 days out. Ideal advocate / case-study candidate.",
    "insights": [
      {
        "tag": "grow",
        "label": "↗ Advocacy · CSM",
        "title": "Full-suite, high adoption",
        "desc": "Every owned product is highly adopted — a model account for a case study or reference.",
        "action": "→ Nominate for advocacy program"
      },
      {
        "tag": "grow",
        "label": "⚡ Overage trigger · Finance",
        "title": "Data Collaboration 12% over allotment",
        "desc": "A contracted product is over its committed volume — bill the overage and move to a higher tier.",
        "action": "→ Trigger overage bill + tier upgrade"
      },
      {
        "tag": "fin",
        "label": "⇄ Reconciliation · Finance",
        "title": "Clean billing alignment",
        "desc": "All lines reconcile — no disputes.",
        "action": "→ No action needed"
      }
    ],
    "narrative": "Cascade Beverages is a flagship account at <b>89 (▲2)</b>, with the full suite adopted and strong utilization across every line — <b>Data Collaboration is now 12% over its allotment</b>, a billable overage and tier-upgrade trigger. Renewal is 260 days out. An ideal <b>reference / advocacy candidate</b>."
  },
  {
    "id": "atlasfinancial",
    "name": "Atlas Financial Services",
    "sub": "BFSI · CSM: Sofia Alvarez · SFDC #A-10411",
    "avatar": "AF",
    "acv": "$1.15M",
    "tenure": "5.1 yrs",
    "renewal": "240 days",
    "delta": 4,
    "drivers": [
      {
        "name": "Utilization",
        "value": 83,
        "delta": 5,
        "color": "green",
        "related": [
          "marketplace"
        ]
      },
      {
        "name": "Product Adoption",
        "value": 82,
        "delta": 3,
        "color": "green",
        "related": []
      },
      {
        "name": "ROI / Value",
        "value": 87,
        "delta": 6,
        "color": "green",
        "related": []
      },
      {
        "name": "Payment / AR",
        "value": 92,
        "delta": 0,
        "color": "green",
        "related": []
      },
      {
        "name": "Relationship",
        "value": 76,
        "delta": 1,
        "color": "green",
        "related": []
      }
    ],
    "products": [
      {
        "id": "datacollab",
        "name": "Data Collaboration",
        "category": "clean-room",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 115,
        "trend": "up",
        "status": "over"
      },
      {
        "id": "identity",
        "name": "Identity Resolution (RampID)",
        "category": "identity",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 85,
        "trend": "up",
        "status": "healthy"
      },
      {
        "id": "activation",
        "name": "Activation / Destinations",
        "category": "activation",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 79,
        "trend": "up",
        "status": "healthy"
      },
      {
        "id": "measurement",
        "name": "Measurement",
        "category": "analytics",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 68,
        "trend": "up",
        "status": "healthy"
      },
      {
        "id": "marketplace",
        "name": "Data Marketplace",
        "category": "data",
        "bought": 0,
        "used": 0.5,
        "billed": 0,
        "util": 28,
        "trend": "up",
        "status": "usenobill"
      }
    ],
    "aiQuestion": "Is Atlas Financial Services a candidate for expansion this quarter?",
    "aiAnswer": "Yes. Atlas Financial Services is <b>healthy (84, ▲4)</b> with rising utilization; <b>Data Collaboration is 15% over its allotment</b> (a billable overage and tier-upgrade trigger) and it is <b>consuming Data Marketplace with no contract</b> — clean expansion signals before renewal in 240 days.",
    "insights": [
      {
        "tag": "grow",
        "label": "↗ Expansion · Sales",
        "title": "Data Marketplace used, not owned",
        "desc": "Rising consumption with no contract line — a strong, low-friction upsell.",
        "action": "→ Draft Data Marketplace expansion quote"
      },
      {
        "tag": "grow",
        "label": "⚡ Overage trigger · Sales",
        "title": "Data Collaboration 15% over allotment",
        "desc": "Sustained over-consumption on a contracted product — bill the overage and upsell a higher committed tier.",
        "action": "→ Trigger overage bill + tier upgrade"
      },
      {
        "tag": "fin",
        "label": "⇄ Reconciliation · Finance",
        "title": "Clean billing alignment",
        "desc": "Bought/used/billed reconcile on contracted lines — no disputes expected.",
        "action": "→ No action needed"
      }
    ],
    "narrative": "Atlas Financial Services is a healthy, expanding account at <b>84 (▲4)</b> with rising utilization. <b>data collaboration is 15% over its allotment</b> (a billable overage and tier-upgrade trigger) and it is <b>consuming data marketplace with no contract</b>. With renewal 240 days out, recommend triggering the overage bill, a committed-tier upgrade, and a Data Marketplace upsell."
  },
  {
    "id": "lumenstreaming",
    "name": "Lumen Streaming",
    "sub": "Media & Entertainment · CSM: James Okoro · SFDC #A-10548",
    "avatar": "LS",
    "acv": "$680K",
    "tenure": "2.9 yrs",
    "renewal": "200 days",
    "delta": 4,
    "drivers": [
      {
        "name": "Utilization",
        "value": 87,
        "delta": 5,
        "color": "green",
        "related": [
          "marketplace"
        ]
      },
      {
        "name": "Product Adoption",
        "value": 77,
        "delta": 3,
        "color": "green",
        "related": []
      },
      {
        "name": "ROI / Value",
        "value": 89,
        "delta": 6,
        "color": "green",
        "related": []
      },
      {
        "name": "Payment / AR",
        "value": 91,
        "delta": 0,
        "color": "green",
        "related": []
      },
      {
        "name": "Relationship",
        "value": 76,
        "delta": 1,
        "color": "green",
        "related": []
      }
    ],
    "products": [
      {
        "id": "datacollab",
        "name": "Data Collaboration",
        "category": "clean-room",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 114,
        "trend": "up",
        "status": "over"
      },
      {
        "id": "identity",
        "name": "Identity Resolution (RampID)",
        "category": "identity",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 85,
        "trend": "up",
        "status": "healthy"
      },
      {
        "id": "activation",
        "name": "Activation / Destinations",
        "category": "activation",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 79,
        "trend": "up",
        "status": "healthy"
      },
      {
        "id": "measurement",
        "name": "Measurement",
        "category": "analytics",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 68,
        "trend": "up",
        "status": "healthy"
      },
      {
        "id": "marketplace",
        "name": "Data Marketplace",
        "category": "data",
        "bought": 0,
        "used": 0.5,
        "billed": 0,
        "util": 21,
        "trend": "up",
        "status": "usenobill"
      }
    ],
    "aiQuestion": "Is Lumen Streaming a candidate for expansion this quarter?",
    "aiAnswer": "Yes. Lumen Streaming is <b>healthy (84, ▲4)</b> with rising utilization; <b>Data Collaboration is 14% over its allotment</b> (a billable overage and tier-upgrade trigger) and it is <b>consuming Data Marketplace with no contract</b> — clean expansion signals before renewal in 200 days.",
    "insights": [
      {
        "tag": "grow",
        "label": "↗ Expansion · Sales",
        "title": "Data Marketplace used, not owned",
        "desc": "Rising consumption with no contract line — a strong, low-friction upsell.",
        "action": "→ Draft Data Marketplace expansion quote"
      },
      {
        "tag": "grow",
        "label": "⚡ Overage trigger · Sales",
        "title": "Data Collaboration 14% over allotment",
        "desc": "Sustained over-consumption on a contracted product — bill the overage and upsell a higher committed tier.",
        "action": "→ Trigger overage bill + tier upgrade"
      },
      {
        "tag": "fin",
        "label": "⇄ Reconciliation · Finance",
        "title": "Clean billing alignment",
        "desc": "Bought/used/billed reconcile on contracted lines — no disputes expected.",
        "action": "→ No action needed"
      }
    ],
    "narrative": "Lumen Streaming is a healthy, expanding account at <b>84 (▲4)</b> with rising utilization. <b>data collaboration is 14% over its allotment</b> (a billable overage and tier-upgrade trigger) and it is <b>consuming data marketplace with no contract</b>. With renewal 200 days out, recommend triggering the overage bill, a committed-tier upgrade, and a Data Marketplace upsell."
  },
  {
    "id": "vaultlineinsur",
    "name": "Vaultline Insurance",
    "sub": "Insurance · CSM: Wei Chen · SFDC #A-10685",
    "avatar": "VI",
    "acv": "$840K",
    "tenure": "3.6 yrs",
    "renewal": "175 days",
    "delta": 4,
    "drivers": [
      {
        "name": "Utilization",
        "value": 86,
        "delta": 5,
        "color": "green",
        "related": [
          "marketplace"
        ]
      },
      {
        "name": "Product Adoption",
        "value": 77,
        "delta": 3,
        "color": "green",
        "related": []
      },
      {
        "name": "ROI / Value",
        "value": 83,
        "delta": 6,
        "color": "green",
        "related": []
      },
      {
        "name": "Payment / AR",
        "value": 90,
        "delta": 0,
        "color": "green",
        "related": []
      },
      {
        "name": "Relationship",
        "value": 76,
        "delta": 1,
        "color": "green",
        "related": []
      }
    ],
    "products": [
      {
        "id": "datacollab",
        "name": "Data Collaboration",
        "category": "clean-room",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 115,
        "trend": "up",
        "status": "over"
      },
      {
        "id": "identity",
        "name": "Identity Resolution (RampID)",
        "category": "identity",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 85,
        "trend": "up",
        "status": "healthy"
      },
      {
        "id": "activation",
        "name": "Activation / Destinations",
        "category": "activation",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 79,
        "trend": "up",
        "status": "healthy"
      },
      {
        "id": "measurement",
        "name": "Measurement",
        "category": "analytics",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 68,
        "trend": "up",
        "status": "healthy"
      },
      {
        "id": "marketplace",
        "name": "Data Marketplace",
        "category": "data",
        "bought": 0,
        "used": 0.5,
        "billed": 0,
        "util": 26,
        "trend": "up",
        "status": "usenobill"
      }
    ],
    "aiQuestion": "Is Vaultline Insurance a candidate for expansion this quarter?",
    "aiAnswer": "Yes. Vaultline Insurance is <b>healthy (83, ▲4)</b> with rising utilization; <b>Data Collaboration is 15% over its allotment</b> (a billable overage and tier-upgrade trigger) and it is <b>consuming Data Marketplace with no contract</b> — clean expansion signals before renewal in 175 days.",
    "insights": [
      {
        "tag": "grow",
        "label": "↗ Expansion · Sales",
        "title": "Data Marketplace used, not owned",
        "desc": "Rising consumption with no contract line — a strong, low-friction upsell.",
        "action": "→ Draft Data Marketplace expansion quote"
      },
      {
        "tag": "grow",
        "label": "⚡ Overage trigger · Sales",
        "title": "Data Collaboration 15% over allotment",
        "desc": "Sustained over-consumption on a contracted product — bill the overage and upsell a higher committed tier.",
        "action": "→ Trigger overage bill + tier upgrade"
      },
      {
        "tag": "fin",
        "label": "⇄ Reconciliation · Finance",
        "title": "Clean billing alignment",
        "desc": "Bought/used/billed reconcile on contracted lines — no disputes expected.",
        "action": "→ No action needed"
      }
    ],
    "narrative": "Vaultline Insurance is a healthy, expanding account at <b>83 (▲4)</b> with rising utilization. <b>data collaboration is 15% over its allotment</b> (a billable overage and tier-upgrade trigger) and it is <b>consuming data marketplace with no contract</b>. With renewal 175 days out, recommend triggering the overage bill, a committed-tier upgrade, and a Data Marketplace upsell."
  },
  {
    "id": "brightwavetele",
    "name": "Brightwave Telecom",
    "sub": "Telecom · CSM: Priya Nair · SFDC #A-10822",
    "avatar": "BT",
    "acv": "$1.24M",
    "tenure": "4.2 yrs",
    "renewal": "220 days",
    "delta": 4,
    "drivers": [
      {
        "name": "Utilization",
        "value": 87,
        "delta": 5,
        "color": "green",
        "related": [
          "marketplace"
        ]
      },
      {
        "name": "Product Adoption",
        "value": 80,
        "delta": 3,
        "color": "green",
        "related": []
      },
      {
        "name": "ROI / Value",
        "value": 83,
        "delta": 6,
        "color": "green",
        "related": []
      },
      {
        "name": "Payment / AR",
        "value": 92,
        "delta": 0,
        "color": "green",
        "related": []
      },
      {
        "name": "Relationship",
        "value": 75,
        "delta": 1,
        "color": "green",
        "related": []
      }
    ],
    "products": [
      {
        "id": "datacollab",
        "name": "Data Collaboration",
        "category": "clean-room",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 113,
        "trend": "up",
        "status": "over"
      },
      {
        "id": "identity",
        "name": "Identity Resolution (RampID)",
        "category": "identity",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 85,
        "trend": "up",
        "status": "healthy"
      },
      {
        "id": "activation",
        "name": "Activation / Destinations",
        "category": "activation",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 79,
        "trend": "up",
        "status": "healthy"
      },
      {
        "id": "measurement",
        "name": "Measurement",
        "category": "analytics",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 68,
        "trend": "up",
        "status": "healthy"
      },
      {
        "id": "marketplace",
        "name": "Data Marketplace",
        "category": "data",
        "bought": 0,
        "used": 0.5,
        "billed": 0,
        "util": 20,
        "trend": "up",
        "status": "usenobill"
      }
    ],
    "aiQuestion": "Is Brightwave Telecom a candidate for expansion this quarter?",
    "aiAnswer": "Yes. Brightwave Telecom is <b>healthy (84, ▲4)</b> with rising utilization; <b>Data Collaboration is 13% over its allotment</b> (a billable overage and tier-upgrade trigger) and it is <b>consuming Data Marketplace with no contract</b> — clean expansion signals before renewal in 220 days.",
    "insights": [
      {
        "tag": "grow",
        "label": "↗ Expansion · Sales",
        "title": "Data Marketplace used, not owned",
        "desc": "Rising consumption with no contract line — a strong, low-friction upsell.",
        "action": "→ Draft Data Marketplace expansion quote"
      },
      {
        "tag": "grow",
        "label": "⚡ Overage trigger · Sales",
        "title": "Data Collaboration 13% over allotment",
        "desc": "Sustained over-consumption on a contracted product — bill the overage and upsell a higher committed tier.",
        "action": "→ Trigger overage bill + tier upgrade"
      },
      {
        "tag": "fin",
        "label": "⇄ Reconciliation · Finance",
        "title": "Clean billing alignment",
        "desc": "Bought/used/billed reconcile on contracted lines — no disputes expected.",
        "action": "→ No action needed"
      }
    ],
    "narrative": "Brightwave Telecom is a healthy, expanding account at <b>84 (▲4)</b> with rising utilization. <b>data collaboration is 13% over its allotment</b> (a billable overage and tier-upgrade trigger) and it is <b>consuming data marketplace with no contract</b>. With renewal 220 days out, recommend triggering the overage bill, a committed-tier upgrade, and a Data Marketplace upsell."
  },
  {
    "id": "harborretailco",
    "name": "Harbor Retail Co.",
    "sub": "Retail · CSM: Marco Ruiz · SFDC #A-10959",
    "avatar": "HR",
    "acv": "$295K",
    "tenure": "2.7 yrs",
    "renewal": "155 days",
    "delta": 1,
    "drivers": [
      {
        "name": "Utilization",
        "value": 68,
        "delta": 2,
        "color": "amber",
        "related": [
          "identity"
        ]
      },
      {
        "name": "Product Adoption",
        "value": 65,
        "delta": -2,
        "color": "amber",
        "related": []
      },
      {
        "name": "ROI / Value",
        "value": 75,
        "delta": 3,
        "color": "green",
        "related": []
      },
      {
        "name": "Payment / AR",
        "value": 85,
        "delta": 0,
        "color": "green",
        "related": []
      },
      {
        "name": "Relationship",
        "value": 70,
        "delta": 1,
        "color": "green",
        "related": []
      }
    ],
    "products": [
      {
        "id": "activation",
        "name": "Activation / Destinations",
        "category": "activation",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 80,
        "trend": "up",
        "status": "healthy"
      },
      {
        "id": "datacollab",
        "name": "Data Collaboration",
        "category": "clean-room",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 72,
        "trend": "up",
        "status": "healthy"
      },
      {
        "id": "identity",
        "name": "Identity Resolution (RampID)",
        "category": "identity",
        "bought": 1,
        "used": 0.5,
        "billed": 1,
        "util": 51,
        "trend": "down",
        "status": "under"
      },
      {
        "id": "measurement",
        "name": "Measurement",
        "category": "analytics",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 64,
        "trend": "flat",
        "status": "under"
      }
    ],
    "aiQuestion": "Anything to watch on Harbor Retail Co.?",
    "aiAnswer": "Broadly healthy (<b>71, ▲1</b>). One watch item: <b>Identity Resolution (RampID) utilization at 51%</b>. No billing mismatches and renewal is 155 days out.",
    "insights": [
      {
        "tag": "risk",
        "label": "⚠ Adoption · CSM",
        "title": "Identity Resolution (RampID) utilization slipping",
        "desc": "A contracted product dipped to 51% — worth a nudge before it affects renewal.",
        "action": "→ Share Identity Resolution (RampID) best-practices"
      },
      {
        "tag": "grow",
        "label": "↗ Expansion · Sales",
        "title": "Strong core adoption",
        "desc": "Healthy usage on core products is a proof point for a cross-sell.",
        "action": "→ Explore Measurement add-on"
      },
      {
        "tag": "fin",
        "label": "⇄ Reconciliation · Finance",
        "title": "Clean billing alignment",
        "desc": "All lines reconcile — no disputes expected.",
        "action": "→ No action needed"
      }
    ],
    "narrative": "Harbor Retail Co. is a stable account at <b>71 (▲1)</b> with strong core usage. The single watch item is <b>Identity Resolution (RampID) slipping to 51%</b>. Billing is clean and renewal is 155 days out — a good candidate for a light-touch adoption nudge and a cross-sell conversation."
  },
  {
    "id": "cedargrocerygr",
    "name": "Cedar Grocery Group",
    "sub": "Grocery · CSM: Dana Kim · SFDC #A-11096",
    "avatar": "CG",
    "acv": "$430K",
    "tenure": "3.9 yrs",
    "renewal": "140 days",
    "delta": 1,
    "drivers": [
      {
        "name": "Utilization",
        "value": 68,
        "delta": 2,
        "color": "amber",
        "related": [
          "identity"
        ]
      },
      {
        "name": "Product Adoption",
        "value": 63,
        "delta": -2,
        "color": "amber",
        "related": []
      },
      {
        "name": "ROI / Value",
        "value": 76,
        "delta": 3,
        "color": "green",
        "related": []
      },
      {
        "name": "Payment / AR",
        "value": 82,
        "delta": 0,
        "color": "green",
        "related": []
      },
      {
        "name": "Relationship",
        "value": 64,
        "delta": 1,
        "color": "amber",
        "related": []
      }
    ],
    "products": [
      {
        "id": "activation",
        "name": "Activation / Destinations",
        "category": "activation",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 80,
        "trend": "up",
        "status": "healthy"
      },
      {
        "id": "datacollab",
        "name": "Data Collaboration",
        "category": "clean-room",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 72,
        "trend": "up",
        "status": "healthy"
      },
      {
        "id": "identity",
        "name": "Identity Resolution (RampID)",
        "category": "identity",
        "bought": 1,
        "used": 0.5,
        "billed": 1,
        "util": 46,
        "trend": "down",
        "status": "under"
      }
    ],
    "aiQuestion": "Anything to watch on Cedar Grocery Group?",
    "aiAnswer": "Broadly healthy (<b>70, ▲1</b>). One watch item: <b>Identity Resolution (RampID) utilization at 46%</b>. No billing mismatches and renewal is 140 days out.",
    "insights": [
      {
        "tag": "risk",
        "label": "⚠ Adoption · CSM",
        "title": "Identity Resolution (RampID) utilization slipping",
        "desc": "A contracted product dipped to 46% — worth a nudge before it affects renewal.",
        "action": "→ Share Identity Resolution (RampID) best-practices"
      },
      {
        "tag": "grow",
        "label": "↗ Expansion · Sales",
        "title": "Strong core adoption",
        "desc": "Healthy usage on core products is a proof point for a cross-sell.",
        "action": "→ Explore Measurement add-on"
      },
      {
        "tag": "fin",
        "label": "⇄ Reconciliation · Finance",
        "title": "Clean billing alignment",
        "desc": "All lines reconcile — no disputes expected.",
        "action": "→ No action needed"
      }
    ],
    "narrative": "Cedar Grocery Group is a stable account at <b>70 (▲1)</b> with strong core usage. The single watch item is <b>Identity Resolution (RampID) slipping to 46%</b>. Billing is clean and renewal is 140 days out — a good candidate for a light-touch adoption nudge and a cross-sell conversation."
  },
  {
    "id": "ironcladlogist",
    "name": "Ironclad Logistics",
    "sub": "Logistics · CSM: Sofia Alvarez · SFDC #A-11233",
    "avatar": "IL",
    "acv": "$360K",
    "tenure": "5.4 yrs",
    "renewal": "190 days",
    "delta": 1,
    "drivers": [
      {
        "name": "Utilization",
        "value": 69,
        "delta": 2,
        "color": "amber",
        "related": [
          "identity"
        ]
      },
      {
        "name": "Product Adoption",
        "value": 64,
        "delta": -2,
        "color": "amber",
        "related": []
      },
      {
        "name": "ROI / Value",
        "value": 76,
        "delta": 3,
        "color": "green",
        "related": []
      },
      {
        "name": "Payment / AR",
        "value": 84,
        "delta": 0,
        "color": "green",
        "related": []
      },
      {
        "name": "Relationship",
        "value": 68,
        "delta": 1,
        "color": "amber",
        "related": []
      }
    ],
    "products": [
      {
        "id": "activation",
        "name": "Activation / Destinations",
        "category": "activation",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 80,
        "trend": "up",
        "status": "healthy"
      },
      {
        "id": "datacollab",
        "name": "Data Collaboration",
        "category": "clean-room",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 72,
        "trend": "up",
        "status": "healthy"
      },
      {
        "id": "identity",
        "name": "Identity Resolution (RampID)",
        "category": "identity",
        "bought": 1,
        "used": 0.5,
        "billed": 1,
        "util": 40,
        "trend": "down",
        "status": "under"
      },
      {
        "id": "measurement",
        "name": "Measurement",
        "category": "analytics",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 64,
        "trend": "flat",
        "status": "under"
      }
    ],
    "aiQuestion": "Anything to watch on Ironclad Logistics?",
    "aiAnswer": "Broadly healthy (<b>71, ▲1</b>). One watch item: <b>Identity Resolution (RampID) utilization at 40%</b>. No billing mismatches and renewal is 190 days out.",
    "insights": [
      {
        "tag": "risk",
        "label": "⚠ Adoption · CSM",
        "title": "Identity Resolution (RampID) utilization slipping",
        "desc": "A contracted product dipped to 40% — worth a nudge before it affects renewal.",
        "action": "→ Share Identity Resolution (RampID) best-practices"
      },
      {
        "tag": "grow",
        "label": "↗ Expansion · Sales",
        "title": "Strong core adoption",
        "desc": "Healthy usage on core products is a proof point for a cross-sell.",
        "action": "→ Explore Measurement add-on"
      },
      {
        "tag": "fin",
        "label": "⇄ Reconciliation · Finance",
        "title": "Clean billing alignment",
        "desc": "All lines reconcile — no disputes expected.",
        "action": "→ No action needed"
      }
    ],
    "narrative": "Ironclad Logistics is a stable account at <b>71 (▲1)</b> with strong core usage. The single watch item is <b>Identity Resolution (RampID) slipping to 40%</b>. Billing is clean and renewal is 190 days out — a good candidate for a light-touch adoption nudge and a cross-sell conversation."
  },
  {
    "id": "northstarbank",
    "name": "Northstar Bank",
    "sub": "Banking · CSM: James Okoro · SFDC #A-11370",
    "avatar": "NB",
    "acv": "$720K",
    "tenure": "6.0 yrs",
    "renewal": "210 days",
    "delta": 1,
    "drivers": [
      {
        "name": "Utilization",
        "value": 68,
        "delta": 2,
        "color": "amber",
        "related": [
          "identity"
        ]
      },
      {
        "name": "Product Adoption",
        "value": 62,
        "delta": -2,
        "color": "amber",
        "related": []
      },
      {
        "name": "ROI / Value",
        "value": 73,
        "delta": 3,
        "color": "green",
        "related": []
      },
      {
        "name": "Payment / AR",
        "value": 80,
        "delta": 0,
        "color": "green",
        "related": []
      },
      {
        "name": "Relationship",
        "value": 69,
        "delta": 1,
        "color": "amber",
        "related": []
      }
    ],
    "products": [
      {
        "id": "activation",
        "name": "Activation / Destinations",
        "category": "activation",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 80,
        "trend": "up",
        "status": "healthy"
      },
      {
        "id": "datacollab",
        "name": "Data Collaboration",
        "category": "clean-room",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 72,
        "trend": "up",
        "status": "healthy"
      },
      {
        "id": "identity",
        "name": "Identity Resolution (RampID)",
        "category": "identity",
        "bought": 1,
        "used": 0.5,
        "billed": 1,
        "util": 48,
        "trend": "down",
        "status": "under"
      }
    ],
    "aiQuestion": "Anything to watch on Northstar Bank?",
    "aiAnswer": "Broadly healthy (<b>69, ▲1</b>). One watch item: <b>Identity Resolution (RampID) utilization at 48%</b>. No billing mismatches and renewal is 210 days out.",
    "insights": [
      {
        "tag": "risk",
        "label": "⚠ Adoption · CSM",
        "title": "Identity Resolution (RampID) utilization slipping",
        "desc": "A contracted product dipped to 48% — worth a nudge before it affects renewal.",
        "action": "→ Share Identity Resolution (RampID) best-practices"
      },
      {
        "tag": "grow",
        "label": "↗ Expansion · Sales",
        "title": "Strong core adoption",
        "desc": "Healthy usage on core products is a proof point for a cross-sell.",
        "action": "→ Explore Measurement add-on"
      },
      {
        "tag": "fin",
        "label": "⇄ Reconciliation · Finance",
        "title": "Clean billing alignment",
        "desc": "All lines reconcile — no disputes expected.",
        "action": "→ No action needed"
      }
    ],
    "narrative": "Northstar Bank is a stable account at <b>69 (▲1)</b> with strong core usage. The single watch item is <b>Identity Resolution (RampID) slipping to 48%</b>. Billing is clean and renewal is 210 days out — a good candidate for a light-touch adoption nudge and a cross-sell conversation."
  },
  {
    "id": "northwindappar",
    "name": "Northwind Apparel Group",
    "sub": "Retail & CPG · CSM: Wei Chen · SFDC #A-11507",
    "avatar": "NA",
    "acv": "$480K",
    "tenure": "3.2 yrs",
    "renewal": "62 days",
    "delta": -2,
    "drivers": [
      {
        "name": "Utilization",
        "value": 61,
        "delta": -5,
        "color": "amber",
        "related": [
          "marketplace",
          "measurement"
        ]
      },
      {
        "name": "Product Adoption",
        "value": 65,
        "delta": -1,
        "color": "amber",
        "related": [
          "marketplace"
        ]
      },
      {
        "name": "ROI / Value",
        "value": 68,
        "delta": -2,
        "color": "amber",
        "related": []
      },
      {
        "name": "Payment / AR",
        "value": 84,
        "delta": 0,
        "color": "green",
        "related": []
      },
      {
        "name": "Relationship",
        "value": 73,
        "delta": 0,
        "color": "green",
        "related": []
      }
    ],
    "products": [
      {
        "id": "datacollab",
        "name": "Data Collaboration",
        "category": "clean-room",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 77,
        "trend": "up",
        "status": "healthy"
      },
      {
        "id": "identity",
        "name": "Identity Resolution (RampID)",
        "category": "identity",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 64,
        "trend": "flat",
        "status": "under"
      },
      {
        "id": "marketplace",
        "name": "Data Marketplace",
        "category": "data",
        "bought": 1,
        "used": 0,
        "billed": 1,
        "util": 6,
        "trend": "down",
        "status": "billnouse"
      },
      {
        "id": "measurement",
        "name": "Measurement",
        "category": "analytics",
        "bought": 0,
        "used": 0.5,
        "billed": 0,
        "util": 26,
        "trend": "up",
        "status": "usenobill"
      }
    ],
    "aiQuestion": "What’s driving Northwind Apparel Group’s dip?",
    "aiAnswer": "Minor dip (<b>68 (▼2)</b>) mostly from <b>Data Marketplace billed at 6% usage</b> dragging utilization; offset by <b>Measurement being trialed without a contract</b> (an upsell). Renewal in 62 days.",
    "insights": [
      {
        "tag": "fin",
        "label": "⇄ Reconciliation · Finance",
        "title": "Data Marketplace billed at 6%",
        "desc": "A contracted product barely used — reconcile before the 62 days renewal.",
        "action": "→ Open reconciliation review"
      },
      {
        "tag": "grow",
        "label": "↗ Expansion · Sales",
        "title": "Measurement used, not owned",
        "desc": "Client is trialing this without a contract — convert to a paid line.",
        "action": "→ Draft Measurement quote"
      },
      {
        "tag": "risk",
        "label": "⚠ Renewal · CSM",
        "title": "Renewal in 62 days",
        "desc": "Address the mismatch proactively to protect the renewal.",
        "action": "→ Schedule value review"
      }
    ],
    "narrative": "Northwind Apparel Group dipped slightly to <b>68 (▼2)</b>, driven mostly by <b>Data Marketplace being billed at just 6% usage</b>. Core products remain healthy, and the client is <b>trialing Measurement without a contract</b> — an upsell opportunity. With renewal 62 days out, recommend a Finance reconciliation pass and a Measurement conversion conversation."
  },
  {
    "id": "summithealthsy",
    "name": "Summit Health Systems",
    "sub": "Healthcare · CSM: Priya Nair · SFDC #A-11644",
    "avatar": "SH",
    "acv": "$540K",
    "tenure": "4.0 yrs",
    "renewal": "88 days",
    "delta": -2,
    "drivers": [
      {
        "name": "Utilization",
        "value": 57,
        "delta": -5,
        "color": "amber",
        "related": [
          "marketplace",
          "measurement"
        ]
      },
      {
        "name": "Product Adoption",
        "value": 64,
        "delta": -1,
        "color": "amber",
        "related": [
          "marketplace"
        ]
      },
      {
        "name": "ROI / Value",
        "value": 65,
        "delta": -2,
        "color": "amber",
        "related": []
      },
      {
        "name": "Payment / AR",
        "value": 84,
        "delta": 0,
        "color": "green",
        "related": []
      },
      {
        "name": "Relationship",
        "value": 69,
        "delta": 0,
        "color": "amber",
        "related": []
      }
    ],
    "products": [
      {
        "id": "datacollab",
        "name": "Data Collaboration",
        "category": "clean-room",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 77,
        "trend": "up",
        "status": "healthy"
      },
      {
        "id": "identity",
        "name": "Identity Resolution (RampID)",
        "category": "identity",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 64,
        "trend": "flat",
        "status": "under"
      },
      {
        "id": "marketplace",
        "name": "Data Marketplace",
        "category": "data",
        "bought": 1,
        "used": 0,
        "billed": 1,
        "util": 6,
        "trend": "down",
        "status": "billnouse"
      },
      {
        "id": "measurement",
        "name": "Measurement",
        "category": "analytics",
        "bought": 0,
        "used": 0.5,
        "billed": 0,
        "util": 24,
        "trend": "up",
        "status": "usenobill"
      }
    ],
    "aiQuestion": "What’s driving Summit Health Systems’s dip?",
    "aiAnswer": "Minor dip (<b>66 (▼2)</b>) mostly from <b>Data Marketplace billed at 6% usage</b> dragging utilization; offset by <b>Measurement being trialed without a contract</b> (an upsell). Renewal in 88 days.",
    "insights": [
      {
        "tag": "fin",
        "label": "⇄ Reconciliation · Finance",
        "title": "Data Marketplace billed at 6%",
        "desc": "A contracted product barely used — reconcile before the 88 days renewal.",
        "action": "→ Open reconciliation review"
      },
      {
        "tag": "grow",
        "label": "↗ Expansion · Sales",
        "title": "Measurement used, not owned",
        "desc": "Client is trialing this without a contract — convert to a paid line.",
        "action": "→ Draft Measurement quote"
      },
      {
        "tag": "risk",
        "label": "⚠ Renewal · CSM",
        "title": "Renewal in 88 days",
        "desc": "Address the mismatch proactively to protect the renewal.",
        "action": "→ Schedule value review"
      }
    ],
    "narrative": "Summit Health Systems dipped slightly to <b>66 (▼2)</b>, driven mostly by <b>Data Marketplace being billed at just 6% usage</b>. Core products remain healthy, and the client is <b>trialing Measurement without a contract</b> — an upsell opportunity. With renewal 88 days out, recommend a Finance reconciliation pass and a Measurement conversion conversation."
  },
  {
    "id": "deltapharma",
    "name": "Delta Pharma",
    "sub": "Pharma · CSM: Marco Ruiz · SFDC #A-11781",
    "avatar": "DP",
    "acv": "$960K",
    "tenure": "5.7 yrs",
    "renewal": "120 days",
    "delta": -2,
    "drivers": [
      {
        "name": "Utilization",
        "value": 60,
        "delta": -5,
        "color": "amber",
        "related": [
          "marketplace",
          "measurement"
        ]
      },
      {
        "name": "Product Adoption",
        "value": 67,
        "delta": -1,
        "color": "amber",
        "related": [
          "marketplace"
        ]
      },
      {
        "name": "ROI / Value",
        "value": 63,
        "delta": -2,
        "color": "amber",
        "related": []
      },
      {
        "name": "Payment / AR",
        "value": 89,
        "delta": 0,
        "color": "green",
        "related": []
      },
      {
        "name": "Relationship",
        "value": 70,
        "delta": 0,
        "color": "green",
        "related": []
      }
    ],
    "products": [
      {
        "id": "datacollab",
        "name": "Data Collaboration",
        "category": "clean-room",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 77,
        "trend": "up",
        "status": "healthy"
      },
      {
        "id": "identity",
        "name": "Identity Resolution (RampID)",
        "category": "identity",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 64,
        "trend": "flat",
        "status": "under"
      },
      {
        "id": "marketplace",
        "name": "Data Marketplace",
        "category": "data",
        "bought": 1,
        "used": 0,
        "billed": 1,
        "util": 7,
        "trend": "down",
        "status": "billnouse"
      },
      {
        "id": "measurement",
        "name": "Measurement",
        "category": "analytics",
        "bought": 0,
        "used": 0.5,
        "billed": 0,
        "util": 26,
        "trend": "up",
        "status": "usenobill"
      }
    ],
    "aiQuestion": "What’s driving Delta Pharma’s dip?",
    "aiAnswer": "Minor dip (<b>68 (▼2)</b>) mostly from <b>Data Marketplace billed at 7% usage</b> dragging utilization; offset by <b>Measurement being trialed without a contract</b> (an upsell). Renewal in 120 days.",
    "insights": [
      {
        "tag": "fin",
        "label": "⇄ Reconciliation · Finance",
        "title": "Data Marketplace billed at 7%",
        "desc": "A contracted product barely used — reconcile before the 120 days renewal.",
        "action": "→ Open reconciliation review"
      },
      {
        "tag": "grow",
        "label": "↗ Expansion · Sales",
        "title": "Measurement used, not owned",
        "desc": "Client is trialing this without a contract — convert to a paid line.",
        "action": "→ Draft Measurement quote"
      },
      {
        "tag": "risk",
        "label": "⚠ Renewal · CSM",
        "title": "Renewal in 120 days",
        "desc": "Address the mismatch proactively to protect the renewal.",
        "action": "→ Schedule value review"
      }
    ],
    "narrative": "Delta Pharma dipped slightly to <b>68 (▼2)</b>, driven mostly by <b>Data Marketplace being billed at just 7% usage</b>. Core products remain healthy, and the client is <b>trialing Measurement without a contract</b> — an upsell opportunity. With renewal 120 days out, recommend a Finance reconciliation pass and a Measurement conversion conversation."
  },
  {
    "id": "pinnaclefitnes",
    "name": "Pinnacle Fitness",
    "sub": "Wellness · CSM: Dana Kim · SFDC #A-11918",
    "avatar": "PF",
    "acv": "$210K",
    "tenure": "0.9 yrs",
    "renewal": "150 days",
    "delta": 4,
    "drivers": [
      {
        "name": "Utilization",
        "value": 57,
        "delta": 6,
        "color": "amber",
        "related": [
          "datacollab",
          "identity",
          "measurement"
        ]
      },
      {
        "name": "Product Adoption",
        "value": 57,
        "delta": 4,
        "color": "amber",
        "related": [
          "identity"
        ]
      },
      {
        "name": "ROI / Value",
        "value": 60,
        "delta": 3,
        "color": "amber",
        "related": []
      },
      {
        "name": "Payment / AR",
        "value": 72,
        "delta": 1,
        "color": "green",
        "related": []
      },
      {
        "name": "Relationship",
        "value": 63,
        "delta": 2,
        "color": "amber",
        "related": []
      }
    ],
    "products": [
      {
        "id": "activation",
        "name": "Activation / Destinations",
        "category": "activation",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 55,
        "trend": "up",
        "status": "under"
      },
      {
        "id": "datacollab",
        "name": "Data Collaboration",
        "category": "clean-room",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 54,
        "trend": "up",
        "status": "under"
      },
      {
        "id": "identity",
        "name": "Identity Resolution (RampID)",
        "category": "identity",
        "bought": 1,
        "used": 0.5,
        "billed": 1,
        "util": 33,
        "trend": "up",
        "status": "gap"
      },
      {
        "id": "measurement",
        "name": "Measurement",
        "category": "analytics",
        "bought": 0,
        "used": 0.5,
        "billed": 0,
        "util": 24,
        "trend": "up",
        "status": "usenobill"
      }
    ],
    "aiQuestion": "How is Pinnacle Fitness’s onboarding tracking?",
    "aiAnswer": "Ramping (<b>60, ▲4</b>). Adoption climbing on <b>Activation / Destinations (55%)</b>, with <b>Measurement</b> being trialed and still to convert. Renewal 150 days out.",
    "insights": [
      {
        "tag": "grow",
        "label": "↗ Adoption · CSM",
        "title": "Activation / Destinations adoption climbing",
        "desc": "Usage on Activation / Destinations is trending up — reinforce the momentum with enablement.",
        "action": "→ Run onboarding milestone review"
      },
      {
        "tag": "grow",
        "label": "↗ Expansion · Sales",
        "title": "Measurement used, not owned",
        "desc": "Client is trialing this without a contract — convert once adoption stabilizes.",
        "action": "→ Line up Measurement quote"
      },
      {
        "tag": "risk",
        "label": "⚠ Onboarding · CSM",
        "title": "Identity Resolution (RampID) still ramping",
        "desc": "Identity Resolution (RampID) at 33% — ensure onboarding completes to protect first renewal.",
        "action": "→ Technical enablement session"
      }
    ],
    "narrative": "Pinnacle Fitness is a newer account ramping at <b>60 (▲4)</b>, with adoption climbing on <b>Activation / Destinations</b> and <b>Measurement being trialed without a contract</b>. <b>Identity Resolution (RampID) is still ramping at 33%</b>. Renewal is 150 days out — focus on onboarding completion and a Measurement conversion."
  },
  {
    "id": "auroracosmetic",
    "name": "Aurora Cosmetics",
    "sub": "Beauty · CSM: Sofia Alvarez · SFDC #A-12055",
    "avatar": "AC",
    "acv": "$330K",
    "tenure": "1.3 yrs",
    "renewal": "175 days",
    "delta": 4,
    "drivers": [
      {
        "name": "Utilization",
        "value": 60,
        "delta": 6,
        "color": "amber",
        "related": [
          "identity",
          "measurement"
        ]
      },
      {
        "name": "Product Adoption",
        "value": 53,
        "delta": 4,
        "color": "amber",
        "related": []
      },
      {
        "name": "ROI / Value",
        "value": 62,
        "delta": 3,
        "color": "amber",
        "related": []
      },
      {
        "name": "Payment / AR",
        "value": 76,
        "delta": 1,
        "color": "green",
        "related": []
      },
      {
        "name": "Relationship",
        "value": 61,
        "delta": 2,
        "color": "amber",
        "related": []
      }
    ],
    "products": [
      {
        "id": "activation",
        "name": "Activation / Destinations",
        "category": "activation",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 58,
        "trend": "up",
        "status": "under"
      },
      {
        "id": "identity",
        "name": "Identity Resolution (RampID)",
        "category": "identity",
        "bought": 1,
        "used": 0.5,
        "billed": 1,
        "util": 42,
        "trend": "up",
        "status": "under"
      },
      {
        "id": "measurement",
        "name": "Measurement",
        "category": "analytics",
        "bought": 0,
        "used": 0.5,
        "billed": 0,
        "util": 24,
        "trend": "up",
        "status": "usenobill"
      }
    ],
    "aiQuestion": "How is Aurora Cosmetics’s onboarding tracking?",
    "aiAnswer": "Ramping (<b>61, ▲4</b>). Adoption climbing on <b>Activation / Destinations (58%)</b>, with <b>Measurement</b> being trialed and still to convert. Renewal 175 days out.",
    "insights": [
      {
        "tag": "grow",
        "label": "↗ Adoption · CSM",
        "title": "Activation / Destinations adoption climbing",
        "desc": "Usage on Activation / Destinations is trending up — reinforce the momentum with enablement.",
        "action": "→ Run onboarding milestone review"
      },
      {
        "tag": "grow",
        "label": "↗ Expansion · Sales",
        "title": "Measurement used, not owned",
        "desc": "Client is trialing this without a contract — convert once adoption stabilizes.",
        "action": "→ Line up Measurement quote"
      },
      {
        "tag": "risk",
        "label": "⚠ Onboarding · CSM",
        "title": "Identity Resolution (RampID) still ramping",
        "desc": "Identity Resolution (RampID) at 42% — ensure onboarding completes to protect first renewal.",
        "action": "→ Technical enablement session"
      }
    ],
    "narrative": "Aurora Cosmetics is a newer account ramping at <b>61 (▲4)</b>, with adoption climbing on <b>Activation / Destinations</b> and <b>Measurement being trialed without a contract</b>. <b>Identity Resolution (RampID) is still ramping at 42%</b>. Renewal is 175 days out — focus on onboarding completion and a Measurement conversion."
  },
  {
    "id": "riverstonehote",
    "name": "Riverstone Hotels",
    "sub": "Hospitality · CSM: James Okoro · SFDC #A-12192",
    "avatar": "RH",
    "acv": "$390K",
    "tenure": "1.1 yrs",
    "renewal": "205 days",
    "delta": 4,
    "drivers": [
      {
        "name": "Utilization",
        "value": 60,
        "delta": 6,
        "color": "amber",
        "related": [
          "identity",
          "measurement"
        ]
      },
      {
        "name": "Product Adoption",
        "value": 59,
        "delta": 4,
        "color": "amber",
        "related": []
      },
      {
        "name": "ROI / Value",
        "value": 60,
        "delta": 3,
        "color": "amber",
        "related": []
      },
      {
        "name": "Payment / AR",
        "value": 75,
        "delta": 1,
        "color": "green",
        "related": []
      },
      {
        "name": "Relationship",
        "value": 67,
        "delta": 2,
        "color": "amber",
        "related": []
      }
    ],
    "products": [
      {
        "id": "activation",
        "name": "Activation / Destinations",
        "category": "activation",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 66,
        "trend": "up",
        "status": "healthy"
      },
      {
        "id": "identity",
        "name": "Identity Resolution (RampID)",
        "category": "identity",
        "bought": 1,
        "used": 0.5,
        "billed": 1,
        "util": 41,
        "trend": "up",
        "status": "under"
      },
      {
        "id": "measurement",
        "name": "Measurement",
        "category": "analytics",
        "bought": 0,
        "used": 0.5,
        "billed": 0,
        "util": 26,
        "trend": "up",
        "status": "usenobill"
      }
    ],
    "aiQuestion": "How is Riverstone Hotels’s onboarding tracking?",
    "aiAnswer": "Ramping (<b>63, ▲4</b>). Adoption climbing on <b>Activation / Destinations (66%)</b>, with <b>Measurement</b> being trialed and still to convert. Renewal 205 days out.",
    "insights": [
      {
        "tag": "grow",
        "label": "↗ Adoption · CSM",
        "title": "Activation / Destinations adoption climbing",
        "desc": "Usage on Activation / Destinations is trending up — reinforce the momentum with enablement.",
        "action": "→ Run onboarding milestone review"
      },
      {
        "tag": "grow",
        "label": "↗ Expansion · Sales",
        "title": "Measurement used, not owned",
        "desc": "Client is trialing this without a contract — convert once adoption stabilizes.",
        "action": "→ Line up Measurement quote"
      },
      {
        "tag": "risk",
        "label": "⚠ Onboarding · CSM",
        "title": "Identity Resolution (RampID) still ramping",
        "desc": "Identity Resolution (RampID) at 41% — ensure onboarding completes to protect first renewal.",
        "action": "→ Technical enablement session"
      }
    ],
    "narrative": "Riverstone Hotels is a newer account ramping at <b>63 (▲4)</b>, with adoption climbing on <b>Activation / Destinations</b> and <b>Measurement being trialed without a contract</b>. <b>Identity Resolution (RampID) is still ramping at 41%</b>. Renewal is 205 days out — focus on onboarding completion and a Measurement conversion."
  },
  {
    "id": "quantumgaming",
    "name": "Quantum Gaming",
    "sub": "Gaming · CSM: Wei Chen · SFDC #A-12329",
    "avatar": "QG",
    "acv": "$450K",
    "tenure": "1.6 yrs",
    "renewal": "230 days",
    "delta": 4,
    "drivers": [
      {
        "name": "Utilization",
        "value": 56,
        "delta": 6,
        "color": "amber",
        "related": [
          "identity",
          "measurement"
        ]
      },
      {
        "name": "Product Adoption",
        "value": 56,
        "delta": 4,
        "color": "amber",
        "related": []
      },
      {
        "name": "ROI / Value",
        "value": 59,
        "delta": 3,
        "color": "amber",
        "related": []
      },
      {
        "name": "Payment / AR",
        "value": 77,
        "delta": 1,
        "color": "green",
        "related": []
      },
      {
        "name": "Relationship",
        "value": 63,
        "delta": 2,
        "color": "amber",
        "related": []
      }
    ],
    "products": [
      {
        "id": "activation",
        "name": "Activation / Destinations",
        "category": "activation",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 70,
        "trend": "up",
        "status": "healthy"
      },
      {
        "id": "datacollab",
        "name": "Data Collaboration",
        "category": "clean-room",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 60,
        "trend": "up",
        "status": "under"
      },
      {
        "id": "identity",
        "name": "Identity Resolution (RampID)",
        "category": "identity",
        "bought": 1,
        "used": 0.5,
        "billed": 1,
        "util": 44,
        "trend": "up",
        "status": "under"
      },
      {
        "id": "measurement",
        "name": "Measurement",
        "category": "analytics",
        "bought": 0,
        "used": 0.5,
        "billed": 0,
        "util": 30,
        "trend": "up",
        "status": "usenobill"
      }
    ],
    "aiQuestion": "How is Quantum Gaming’s onboarding tracking?",
    "aiAnswer": "Ramping (<b>60, ▲4</b>). Adoption climbing on <b>Activation / Destinations (70%)</b>, with <b>Measurement</b> being trialed and still to convert. Renewal 230 days out.",
    "insights": [
      {
        "tag": "grow",
        "label": "↗ Adoption · CSM",
        "title": "Activation / Destinations adoption climbing",
        "desc": "Usage on Activation / Destinations is trending up — reinforce the momentum with enablement.",
        "action": "→ Run onboarding milestone review"
      },
      {
        "tag": "grow",
        "label": "↗ Expansion · Sales",
        "title": "Measurement used, not owned",
        "desc": "Client is trialing this without a contract — convert once adoption stabilizes.",
        "action": "→ Line up Measurement quote"
      },
      {
        "tag": "risk",
        "label": "⚠ Onboarding · CSM",
        "title": "Identity Resolution (RampID) still ramping",
        "desc": "Identity Resolution (RampID) at 44% — ensure onboarding completes to protect first renewal.",
        "action": "→ Technical enablement session"
      }
    ],
    "narrative": "Quantum Gaming is a newer account ramping at <b>60 (▲4)</b>, with adoption climbing on <b>Activation / Destinations</b> and <b>Measurement being trialed without a contract</b>. <b>Identity Resolution (RampID) is still ramping at 44%</b>. Renewal is 230 days out — focus on onboarding completion and a Measurement conversion."
  },
  {
    "id": "vertexmediahol",
    "name": "Vertex Media Holdings",
    "sub": "Media & Entertainment · CSM: Priya Nair · SFDC #A-12466",
    "avatar": "VM",
    "acv": "$620K",
    "tenure": "1.4 yrs",
    "renewal": "34 days",
    "delta": -11,
    "drivers": [
      {
        "name": "Utilization",
        "value": 36,
        "delta": -18,
        "color": "red",
        "related": [
          "datacollab",
          "activation",
          "measurement"
        ]
      },
      {
        "name": "Product Adoption",
        "value": 38,
        "delta": -10,
        "color": "red",
        "related": [
          "activation",
          "measurement"
        ]
      },
      {
        "name": "ROI / Value",
        "value": 52,
        "delta": -6,
        "color": "amber",
        "related": []
      },
      {
        "name": "Payment / AR",
        "value": 60,
        "delta": -8,
        "color": "amber",
        "related": [
          "ar"
        ]
      },
      {
        "name": "Relationship",
        "value": 60,
        "delta": -3,
        "color": "amber",
        "related": []
      }
    ],
    "products": [
      {
        "id": "datacollab",
        "name": "Data Collaboration",
        "category": "clean-room",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 61,
        "trend": "down",
        "status": "under"
      },
      {
        "id": "activation",
        "name": "Activation / Destinations",
        "category": "activation",
        "bought": 1,
        "used": 0.5,
        "billed": 1,
        "util": 21,
        "trend": "down",
        "status": "gap"
      },
      {
        "id": "measurement",
        "name": "Measurement",
        "category": "analytics",
        "bought": 1,
        "used": 0,
        "billed": 1,
        "util": 8,
        "trend": "down",
        "status": "billnouse"
      },
      {
        "id": "identity",
        "name": "Identity Resolution (RampID)",
        "category": "identity",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 41,
        "trend": "down",
        "status": "under"
      }
    ],
    "aiQuestion": "How urgent is Vertex Media Holdings, and why?",
    "aiAnswer": "<b>Critical.</b> Score dropped <b>11 pts to 46</b> with renewal in <b>34 days</b>, broad utilization decline, an <b>overdue AR balance</b>, and <b>Measurement billed at 8% usage</b>. Needs immediate cross-functional intervention.",
    "insights": [
      {
        "tag": "risk",
        "label": "⚠ Renewal Risk · CSM",
        "title": "Renewal in 34 days, score falling",
        "desc": "Utilization down across the board — high churn probability.",
        "action": "→ Escalate to exec sponsor now"
      },
      {
        "tag": "fin",
        "label": "⇄ Reconciliation · Finance",
        "title": "Overdue AR + billing mismatch",
        "desc": "Payment slippage plus Measurement billed at 8% compounds renewal risk.",
        "action": "→ AR follow-up + reconciliation"
      },
      {
        "tag": "risk",
        "label": "⚠ Adoption · CSM",
        "title": "Measurement collapsed to 8%",
        "desc": "A core product’s usage is cratering — likely an onboarding or integration failure.",
        "action": "→ Technical enablement session"
      }
    ],
    "narrative": "Vertex Media Holdings is an urgent account: <b>46 (▼11)</b> with renewal in just <b>34 days</b>. Utilization is falling across products, <b>Measurement collapsed to 8%</b>, and <b>Measurement is billed at only 8% usage</b>. Combined with an overdue AR balance, this is a red account needing immediate CSM escalation, a Finance AR + reconciliation pass, and technical enablement."
  },
  {
    "id": "emberfoods",
    "name": "Ember Foods",
    "sub": "QSR · CSM: Marco Ruiz · SFDC #A-12603",
    "avatar": "EF",
    "acv": "$380K",
    "tenure": "2.1 yrs",
    "renewal": "48 days",
    "delta": -11,
    "drivers": [
      {
        "name": "Utilization",
        "value": 38,
        "delta": -18,
        "color": "red",
        "related": [
          "datacollab",
          "activation",
          "measurement"
        ]
      },
      {
        "name": "Product Adoption",
        "value": 38,
        "delta": -10,
        "color": "red",
        "related": [
          "activation",
          "measurement"
        ]
      },
      {
        "name": "ROI / Value",
        "value": 58,
        "delta": -6,
        "color": "amber",
        "related": []
      },
      {
        "name": "Payment / AR",
        "value": 58,
        "delta": -8,
        "color": "amber",
        "related": [
          "ar"
        ]
      },
      {
        "name": "Relationship",
        "value": 58,
        "delta": -3,
        "color": "amber",
        "related": []
      }
    ],
    "products": [
      {
        "id": "datacollab",
        "name": "Data Collaboration",
        "category": "clean-room",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 55,
        "trend": "down",
        "status": "under"
      },
      {
        "id": "activation",
        "name": "Activation / Destinations",
        "category": "activation",
        "bought": 1,
        "used": 0.5,
        "billed": 1,
        "util": 20,
        "trend": "down",
        "status": "gap"
      },
      {
        "id": "measurement",
        "name": "Measurement",
        "category": "analytics",
        "bought": 1,
        "used": 0,
        "billed": 1,
        "util": 4,
        "trend": "down",
        "status": "billnouse"
      },
      {
        "id": "identity",
        "name": "Identity Resolution (RampID)",
        "category": "identity",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 41,
        "trend": "down",
        "status": "under"
      }
    ],
    "aiQuestion": "How urgent is Ember Foods, and why?",
    "aiAnswer": "<b>Critical.</b> Score dropped <b>11 pts to 47</b> with renewal in <b>48 days</b>, broad utilization decline, an <b>overdue AR balance</b>, and <b>Measurement billed at 4% usage</b>. Needs immediate cross-functional intervention.",
    "insights": [
      {
        "tag": "risk",
        "label": "⚠ Renewal Risk · CSM",
        "title": "Renewal in 48 days, score falling",
        "desc": "Utilization down across the board — high churn probability.",
        "action": "→ Escalate to exec sponsor now"
      },
      {
        "tag": "fin",
        "label": "⇄ Reconciliation · Finance",
        "title": "Overdue AR + billing mismatch",
        "desc": "Payment slippage plus Measurement billed at 4% compounds renewal risk.",
        "action": "→ AR follow-up + reconciliation"
      },
      {
        "tag": "risk",
        "label": "⚠ Adoption · CSM",
        "title": "Measurement collapsed to 4%",
        "desc": "A core product’s usage is cratering — likely an onboarding or integration failure.",
        "action": "→ Technical enablement session"
      }
    ],
    "narrative": "Ember Foods is an urgent account: <b>47 (▼11)</b> with renewal in just <b>48 days</b>. Utilization is falling across products, <b>Measurement collapsed to 4%</b>, and <b>Measurement is billed at only 4% usage</b>. Combined with an overdue AR balance, this is a red account needing immediate CSM escalation, a Finance AR + reconciliation pass, and technical enablement."
  },
  {
    "id": "halcyontravel",
    "name": "Halcyon Travel",
    "sub": "Travel · CSM: Dana Kim · SFDC #A-12740",
    "avatar": "HT",
    "acv": "$560K",
    "tenure": "2.4 yrs",
    "renewal": "40 days",
    "delta": -11,
    "drivers": [
      {
        "name": "Utilization",
        "value": 36,
        "delta": -18,
        "color": "red",
        "related": [
          "datacollab",
          "activation",
          "measurement"
        ]
      },
      {
        "name": "Product Adoption",
        "value": 41,
        "delta": -10,
        "color": "red",
        "related": [
          "activation",
          "measurement"
        ]
      },
      {
        "name": "ROI / Value",
        "value": 53,
        "delta": -6,
        "color": "amber",
        "related": []
      },
      {
        "name": "Payment / AR",
        "value": 62,
        "delta": -8,
        "color": "amber",
        "related": [
          "ar"
        ]
      },
      {
        "name": "Relationship",
        "value": 61,
        "delta": -3,
        "color": "amber",
        "related": []
      }
    ],
    "products": [
      {
        "id": "datacollab",
        "name": "Data Collaboration",
        "category": "clean-room",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 56,
        "trend": "down",
        "status": "under"
      },
      {
        "id": "activation",
        "name": "Activation / Destinations",
        "category": "activation",
        "bought": 1,
        "used": 0.5,
        "billed": 1,
        "util": 15,
        "trend": "down",
        "status": "gap"
      },
      {
        "id": "measurement",
        "name": "Measurement",
        "category": "analytics",
        "bought": 1,
        "used": 0,
        "billed": 1,
        "util": 6,
        "trend": "down",
        "status": "billnouse"
      },
      {
        "id": "identity",
        "name": "Identity Resolution (RampID)",
        "category": "identity",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 46,
        "trend": "down",
        "status": "under"
      }
    ],
    "aiQuestion": "How urgent is Halcyon Travel, and why?",
    "aiAnswer": "<b>Critical.</b> Score dropped <b>11 pts to 47</b> with renewal in <b>40 days</b>, broad utilization decline, an <b>overdue AR balance</b>, and <b>Measurement billed at 6% usage</b>. Needs immediate cross-functional intervention.",
    "insights": [
      {
        "tag": "risk",
        "label": "⚠ Renewal Risk · CSM",
        "title": "Renewal in 40 days, score falling",
        "desc": "Utilization down across the board — high churn probability.",
        "action": "→ Escalate to exec sponsor now"
      },
      {
        "tag": "fin",
        "label": "⇄ Reconciliation · Finance",
        "title": "Overdue AR + billing mismatch",
        "desc": "Payment slippage plus Measurement billed at 6% compounds renewal risk.",
        "action": "→ AR follow-up + reconciliation"
      },
      {
        "tag": "risk",
        "label": "⚠ Adoption · CSM",
        "title": "Measurement collapsed to 6%",
        "desc": "A core product’s usage is cratering — likely an onboarding or integration failure.",
        "action": "→ Technical enablement session"
      }
    ],
    "narrative": "Halcyon Travel is an urgent account: <b>47 (▼11)</b> with renewal in just <b>40 days</b>. Utilization is falling across products, <b>Measurement collapsed to 6%</b>, and <b>Measurement is billed at only 6% usage</b>. Combined with an overdue AR balance, this is a red account needing immediate CSM escalation, a Finance AR + reconciliation pass, and technical enablement."
  },
  {
    "id": "nimbussaas",
    "name": "Nimbus SaaS",
    "sub": "Technology · CSM: Sofia Alvarez · SFDC #A-12877",
    "avatar": "NS",
    "acv": "$700K",
    "tenure": "1.8 yrs",
    "renewal": "55 days",
    "delta": -11,
    "drivers": [
      {
        "name": "Utilization",
        "value": 38,
        "delta": -18,
        "color": "red",
        "related": [
          "datacollab",
          "activation",
          "measurement"
        ]
      },
      {
        "name": "Product Adoption",
        "value": 40,
        "delta": -10,
        "color": "red",
        "related": [
          "activation",
          "measurement"
        ]
      },
      {
        "name": "ROI / Value",
        "value": 58,
        "delta": -6,
        "color": "amber",
        "related": []
      },
      {
        "name": "Payment / AR",
        "value": 62,
        "delta": -8,
        "color": "amber",
        "related": [
          "ar"
        ]
      },
      {
        "name": "Relationship",
        "value": 59,
        "delta": -3,
        "color": "amber",
        "related": []
      }
    ],
    "products": [
      {
        "id": "datacollab",
        "name": "Data Collaboration",
        "category": "clean-room",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 63,
        "trend": "down",
        "status": "under"
      },
      {
        "id": "activation",
        "name": "Activation / Destinations",
        "category": "activation",
        "bought": 1,
        "used": 0.5,
        "billed": 1,
        "util": 17,
        "trend": "down",
        "status": "gap"
      },
      {
        "id": "measurement",
        "name": "Measurement",
        "category": "analytics",
        "bought": 1,
        "used": 0,
        "billed": 1,
        "util": 7,
        "trend": "down",
        "status": "billnouse"
      },
      {
        "id": "identity",
        "name": "Identity Resolution (RampID)",
        "category": "identity",
        "bought": 1,
        "used": 1,
        "billed": 1,
        "util": 43,
        "trend": "down",
        "status": "under"
      }
    ],
    "aiQuestion": "How urgent is Nimbus SaaS, and why?",
    "aiAnswer": "<b>Critical.</b> Score dropped <b>11 pts to 48</b> with renewal in <b>55 days</b>, broad utilization decline, an <b>overdue AR balance</b>, and <b>Measurement billed at 7% usage</b>. Needs immediate cross-functional intervention.",
    "insights": [
      {
        "tag": "risk",
        "label": "⚠ Renewal Risk · CSM",
        "title": "Renewal in 55 days, score falling",
        "desc": "Utilization down across the board — high churn probability.",
        "action": "→ Escalate to exec sponsor now"
      },
      {
        "tag": "fin",
        "label": "⇄ Reconciliation · Finance",
        "title": "Overdue AR + billing mismatch",
        "desc": "Payment slippage plus Measurement billed at 7% compounds renewal risk.",
        "action": "→ AR follow-up + reconciliation"
      },
      {
        "tag": "risk",
        "label": "⚠ Adoption · CSM",
        "title": "Measurement collapsed to 7%",
        "desc": "A core product’s usage is cratering — likely an onboarding or integration failure.",
        "action": "→ Technical enablement session"
      }
    ],
    "narrative": "Nimbus SaaS is an urgent account: <b>48 (▼11)</b> with renewal in just <b>55 days</b>. Utilization is falling across products, <b>Measurement collapsed to 7%</b>, and <b>Measurement is billed at only 7% usage</b>. Combined with an overdue AR balance, this is a red account needing immediate CSM escalation, a Finance AR + reconciliation pass, and technical enablement."
  }
];

export const PMETA: Record<string, ProductMeta> = {
  "datacollab": {
    "unit": "queries/mo",
    "base": 420,
    "mil": false
  },
  "activation": {
    "unit": "destinations",
    "base": 58,
    "mil": false
  },
  "identity": {
    "unit": "records matched/mo",
    "base": 240,
    "mil": true
  },
  "measurement": {
    "unit": "reports/mo",
    "base": 130,
    "mil": false
  },
  "marketplace": {
    "unit": "data records/mo",
    "base": 75,
    "mil": true
  },
  "ctv": {
    "unit": "impressions/mo",
    "base": 160,
    "mil": true
  }
};

export const SCALE: Record<string, number> = {
  "orionautogroup": 1.6,
  "meridianairlin": 2.75,
  "cascadebeverag": 1.9,
  "atlasfinancial": 2.4,
  "lumenstreaming": 1.42,
  "vaultlineinsur": 1.75,
  "brightwavetele": 2.58,
  "harborretailco": 0.61,
  "cedargrocerygr": 0.9,
  "ironcladlogist": 0.75,
  "northstarbank": 1.5,
  "northwindappar": 1,
  "summithealthsy": 1.12,
  "deltapharma": 2,
  "pinnaclefitnes": 0.5,
  "auroracosmetic": 0.69,
  "riverstonehote": 0.81,
  "quantumgaming": 0.94,
  "vertexmediahol": 1.29,
  "emberfoods": 0.79,
  "halcyontravel": 1.17,
  "nimbussaas": 1.46
};

// [Utilization, Product Adoption, ROI / Value, Payment / AR, Relationship] — must sum to 1.
export const WEIGHTS: number[] = [0.3,0.25,0.2,0.15,0.1];
