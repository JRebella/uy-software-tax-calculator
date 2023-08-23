import { Money, inUYU } from "@/core/currency";
import { min } from "lodash";

export type TaxTemplate = {
  /** In % */
  IVA: number;
  /** In % */
  IRPF: number;
  /** In % */
  FONASA: number;
  /** In UYU */
  TOPE_FONASA: number;
};

export type TaxResults = {
  IVA: Money;
  IRPF: Money;
  FONASA: Money;
};

/** % based taxes for exported software, IRPF company (quick example) */
export const SOFTWARE_EXTERIOR_IRPF: TaxTemplate = {
  IVA: 0,
  IRPF: 0,
  FONASA: 4.5,
  TOPE_FONASA: 55500,
} as const;

export const calculateTaxes = (salary: Money, template: TaxTemplate) => {
  return {
    FONASA: min([inUYU(salary) * template.FONASA, template.TOPE_FONASA]),
    IRPF: inUYU(salary) * template.IRPF,
    IVA: inUYU(salary) * template.IVA,
  };
};
