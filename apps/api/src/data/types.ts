export type DriverColor = 'green' | 'amber' | 'red';
export type TrendClass = 'up' | 'down' | 'flat';
export type ProductStatus = 'healthy' | 'under' | 'gap' | 'billnouse' | 'usenobill' | 'over';
export type InsightTag = 'risk' | 'grow' | 'fin';

export interface DriverRecord {
  name: string;
  value: number;
  delta: number;
  color: DriverColor;
  related: string[];
}

export interface ProductRecord {
  id: string;
  name: string;
  category: string;
  bought: number;
  used: number;
  billed: number;
  util: number;
  trend: TrendClass;
  status: ProductStatus;
}

export interface InsightRecord {
  tag: InsightTag;
  label: string;
  title: string;
  desc: string;
  action: string;
}

export interface ClientRecord {
  id: string;
  name: string;
  sub: string;
  avatar: string;
  acv: string;
  tenure: string;
  renewal: string;
  delta: number;
  drivers: DriverRecord[];
  products: ProductRecord[];
  aiQuestion: string;
  aiAnswer: string;
  insights: InsightRecord[];
  narrative: string;
}

export interface ProductMeta {
  unit: string;
  base: number;
  mil: boolean;
}
