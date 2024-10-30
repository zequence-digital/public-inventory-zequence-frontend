"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartTotalSalesData = [
  { item: "rice", sales: 4000 },
  { item: "beans", sales: 3000 },
  { item: "yam", sales: 2000 },
  { item: "plantain", sales: 2300 },
  { item: "garri", sales: 1800 },
  { item: "milk", sales: 2500 },
  { item: "sugar", sales: 1000 },
];

const charTotalSalesConfig = {
  item: {
    label: "Item",
    color: "#000000",
  },
} satisfies ChartConfig;

export function NewSalesChart() {
  return (
    <Card className=" w-28 h-12 -mb-4 shadow-none border-none">
      <CardContent className="p-0 border-none">
        <ChartContainer className=" border-none" config={charTotalSalesConfig}>
          <AreaChart accessibilityLayer data={chartTotalSalesData}>
            <CartesianGrid vertical={false} horizontal={false} />
            <XAxis
              className="hidden"
              dataKey="item"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="sales"
              type="natural"
              fill="#fef3f2"
              fillOpacity={0.4}
              stroke="#f04438"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
