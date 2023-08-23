export type Currency = "UYU" | "USD";

export type Money = {
  currency: Currency;
  amount: number;
};

export const EXCHANGES = {
  UYU_TO_USD: 0.026,
  USD_TO_UYU: 37.85,
};

// @TODO: USD to UYU for tax calculations require using the exchange at the date of the bill, allow using an arbitrary exchange rate (as parameter?)
export const inUYU = (money: Money): number => {
  switch (money.currency) {
    case "USD":
      return money.amount * EXCHANGES.USD_TO_UYU;
    case "UYU":
      return money.amount;
  }
};

export const inUSD = (money: Money): number => {
  switch (money.currency) {
    case "USD":
      return money.amount;
    case "UYU":
      return money.amount * EXCHANGES.UYU_TO_USD;
  }
};

export const asUYU = (amount: number): Money => ({ amount, currency: "UYU" });
export const asUSD = (amount: number): Money => ({ amount, currency: "USD" });
