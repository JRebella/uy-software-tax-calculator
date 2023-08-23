"use client";

import { CurrencyInput } from "@/components/CurrencyInput";
import { Money, inUYU } from "@/core/currency";
import {
  Autocomplete,
  Button,
  Card,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Option,
  Select,
} from "@mui/joy";
import { useState } from "react";

export default function Home() {
  const [salary, setSalary] = useState<Money>();
  return (
    <div className="bg-white px-10 py-6">
      <Card variant="outlined" className="flex flex-col items-start">
        <FormControl>
          <FormLabel>Sueldo (total facturado)</FormLabel>
          <CurrencyInput onChange={(money) => setSalary(money)} />
          <FormHelperText>This is a helper text.</FormHelperText>
        </FormControl>
        salary: {salary?.amount}
        {salary?.currency}
        <div>In uyu: {salary && inUYU(salary)} UYU</div>
      </Card>
    </div>
  );
}
