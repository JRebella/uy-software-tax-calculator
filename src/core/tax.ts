import { Money, asUYU, inUYU } from "@/core/currency";
import { min, round, sumBy } from "lodash";

export type TaxTemplate = {
  label: string;
  /** In % */
  IVA: number;
  /** In % */
  IRPF: number;
  /** In % */
  FONASA_BASE: number;
  /** In % */
  FONASA: number;

  /** In UYU @TODO no se como se calcula esto */
  BPS: Money;
  /** Tope anual fonasa */
  TOPE_FONASA: number;
};

export type TaxResults = {
  IVA: Money;
  IRPF: Money;
  FONASA: Money;
  BPS: Money;
  Total: Money;
};

/** % based taxes for exported software, IRPF company (quick example) */
export const SOFTWARE_EXTERIOR_IRPF: TaxTemplate = {
  label: "Exportación de software al exterior (empresa IRPF)",
  IVA: 0,
  IRPF: 0,
  FONASA_BASE: 70 / 100,
  FONASA: 4.5 / 100,
  BPS: { amount: 3000, currency: "UYU" },
  TOPE_FONASA: 555222200,
} as const;

export const TAX_TEMPLATES: TaxTemplate[] = [SOFTWARE_EXTERIOR_IRPF];

export const calculateTaxes = (salary: Money, template: TaxTemplate): TaxResults => {
  const partial = {
    FONASA: asUYU(
      round(min([inUYU(salary) * template.FONASA_BASE * template.FONASA, template.TOPE_FONASA]) as number, 1)
    ),
    IRPF: asUYU(inUYU(salary) * template.IRPF),
    IVA: asUYU(inUYU(salary) * template.IVA),
    BPS: template.BPS,
  };

  return {
    ...partial,
    Total: {
      amount: sumBy(Object.values(partial), (v) => inUYU(v)),
      currency: "UYU",
    },
  };
};
