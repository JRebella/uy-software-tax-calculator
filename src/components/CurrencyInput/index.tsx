import { Currency, Money } from "@/core/currency";
import { Divider, Input, Option, Select, SelectOption } from "@mui/joy";
import { ComponentPropsWithoutRef, useEffect, useState } from "react";

type Props = Omit<ComponentPropsWithoutRef<typeof Input>, "onChange"> & {
  onChange: (money: Money) => void;
};

const currencyOptions: { value: Currency; label: string }[] = [
  {
    label: "USD",
    value: "USD",
  },
  {
    label: "UYU",
    value: "UYU",
  },
];

export const CurrencyInput: React.FC<Props> = (props) => {
  const { onChange } = props;
  const [currency, setCurrency] = useState<Currency>("USD");
  const [amount, setAmount] = useState<string>();

  useEffect(() => {
    if (amount) {
      onChange({
        amount: parseInt(amount, 10),
        currency,
      });
    }
  }, [amount, currency, onChange]);

  return (
    <>
      <Input
        {...props}
        type="number"
        onChange={(e) => setAmount(e.target.value)}
        value={amount}
        endDecorator={
          <>
            <Divider orientation="vertical" />
            <Select variant="plain" value={currency} onChange={(_, value) => setCurrency(value!)}>
              {currencyOptions.map(({ label, value }) => (
                <Option value={value} key={value}>
                  {label}
                </Option>
              ))}
            </Select>
          </>
        }
      />
    </>
  );
};
