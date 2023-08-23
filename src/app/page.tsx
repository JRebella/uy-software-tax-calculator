"use client";

import { CurrencyInput } from "@/components/CurrencyInput";
import { Money, inUYU } from "@/core/currency";
import { SOFTWARE_EXTERIOR_IRPF, TaxResults, TaxTemplate, calculateTaxes } from "@/core/tax";
import { Card, FormControl, FormHelperText, FormLabel, Radio, RadioGroup, Table, Typography } from "@mui/joy";
import React, { useMemo, useState } from "react";

export default function Home() {
  const [salary, setSalary] = useState<Money>();
  const [template, setTemplate] = useState<TaxTemplate>(SOFTWARE_EXTERIOR_IRPF);

  const results = useMemo(() => {
    if (salary && template) {
      return calculateTaxes(salary, template);
    }
  }, [salary, template]);
  return (
    <div className="bg-white px-10 py-6 flex flex-col gap-10">
      <Card variant="outlined" className="flex flex-col items-start">
        <FormControl>
          <FormLabel>Sueldo</FormLabel>
          <CurrencyInput onChange={(money) => setSalary(money)} />
          <FormHelperText>Total facturado por mes</FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel>Tipo de contrato</FormLabel>
          <RadioGroup defaultValue="outlined" name="radio-buttons-group">
            {/* @TODO */}
            <Radio checked value={1} label="Exportacion de software al exterior (empresa IRPF)" />
            <Radio disabled value={2} label="Exportacion de software al exterior (empresa IRAE)" />
            <Radio disabled value={3} label="Independiente empresa uruguaya (empresa IRPF)" />
            <Radio disabled value={3} label="Independiente empresa uruguaya (empresa IRAE)" />
            <Radio disabled value={3} label="Dependiente empresa uruguaya" />
          </RadioGroup>
        </FormControl>
      </Card>

      {results && <Results results={results} />}
    </div>
  );
}

type ResultsProps = {
  results: TaxResults;
};

const Results: React.FC<ResultsProps> = ({ results: { Total, ...results } }) => {
  return (
    <Card variant="outlined">
      <Typography level="h3">Impuestos mensuales</Typography>

      <Table>
        <thead>
          <tr>
            <th style={{ width: "40%" }}>Impuesto</th>
            <th>A pagar (UYU)</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(results).map(([tax, amount]) => (
            <tr key={tax}>
              <td>{tax}</td>
              <td>${inUYU(amount)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="font-bold">
            <td>Total</td>
            <td>${inUYU(Total)}</td>
          </tr>
        </tfoot>
      </Table>
    </Card>
  );
};
