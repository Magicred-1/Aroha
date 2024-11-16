"use client";

import React, { useState } from "react";
import Image from "next/image";
import EmptyPortfolioState from "./components/EmptyPortfolioState";
import { PortofolioItem, portfolioItems } from "./data/userBalance";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type ChartData = {
  date: string;
  value: number;
  formattedValue: string;
};
const generateChartData = () => {
  const baseValue = 17500;
  const data = [];
  const startDate = new Date("2024-01-11");

  for (let i = 0; i < 20; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i * 15);

    const randomChange = (Math.random() - 0.5) * 1000;
    const previousValue: any = i > 0 ? data[i - 1].value : baseValue;
    const newValue = previousValue + randomChange;

    data.push({
      date: currentDate.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      value: newValue,
      formattedValue: `${Math.round(newValue).toLocaleString("fr-FR")} €`,
    });
  }
  return data;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 border border-gray-700 p-3 rounded-lg shadow-lg">
        <p className="text-gray-400 text-sm mb-1">{label}</p>
        <p className="text-white font-semibold">{Math.round(payload[0].value).toLocaleString("fr-FR")} $</p>
      </div>
    );
  }
  return null;
};

const getYAxisTicks = (data: any) => {
  const minValue = Math.min(...data.map((item: any) => item.value));
  const maxValue = Math.max(...data.map((item: any) => item.value));
  const step = (maxValue - minValue) / 4;
  return Array.from({ length: 5 }, (_, i) => minValue + step * i);
};

const MiniChart = ({ data }: any) => (
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={data.slice(-10)}>
      <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={1.5} dot={false} />
    </LineChart>
  </ResponsiveContainer>
);

type PortfolioItemCardProps = {
  item: PortofolioItem;
  chartData: ChartData[];
};

const PortfolioItemCard = ({ item, chartData }: PortfolioItemCardProps) => (
  <Card className="bg-gray-900 border-gray-800">
    <CardContent className="pt-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <Image src={item.logo_url} alt="logo" width={40} height={40} />
          <div>
            <h4 className="font-medium">{item.name}</h4>
            <p className="text-xs text-gray-400">{item.symbol}</p>
          </div>
        </div>
        <div className="h-12 w-24">
          <MiniChart data={chartData} />
        </div>
      </div>
      <p className="text-sm">Quantity : {item.quantity}</p>
      <div className="flex justify-between items-end">
        <span className="text-lg font-bold">{item.value} €</span>
        <div className="text-right">
          <span className="text-emerald-400 text-sm">+100 €</span>
          <p className="text-emerald-400 text-xs">+10%</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const PortfolioDashboard = () => {
  const hasAssets = portfolioItems.length > 0;

  if (!hasAssets) {
    return <EmptyPortfolioState />;
  }
  const chartData = generateChartData();
  const totalValue = 26785;
  const yearGain = 748;
  const yearGainPercent = 2.87;
  const yAxisTicks = getYAxisTicks(chartData);

  return (
    <div className="w-full space-y-6 p-4 bg-black text-white">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-2 bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row justify-between items-center">
            <div>
              <p className="text-gray-400">15 Nov, 2024</p>
              <h2 className="text-3xl font-bold">{totalValue.toLocaleString("fr-FR")} $</h2>
            </div>
            <Select defaultValue="YTD">
              <SelectTrigger className="w-32 bg-gray-800 border-gray-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="1J">1J</SelectItem>
                <SelectItem value="7J">7J</SelectItem>
                <SelectItem value="1M">1M</SelectItem>
                <SelectItem value="YTD">YTD</SelectItem>
                <SelectItem value="1A">1A</SelectItem>
                <SelectItem value="TOUT">ALL</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#d4a574" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#d4a574" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#666", fontSize: 12 }}
                    padding={{ left: 20, right: 20 }}
                  />
                  <YAxis
                    domain={["auto", "auto"]}
                    ticks={yAxisTicks}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#666", fontSize: 12 }}
                    tickFormatter={value => `${(value / 1000).toFixed(1)}k €`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#d4a574"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, fill: "#d4a574" }}
                    fill="url(#colorValue)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400">Plus-value - Année en cours</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-emerald-400">+{yearGain} €</span>
                  <span className="text-emerald-400">+{yearGainPercent}%</span>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                La plus-value latente est la différence entre votre prix d'achat unitaire et le prix actuel à un instant
                donné. Ce montant ne tient pas compte des plus-values réalisées.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl">Ma performance</h3>
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-40 bg-gray-800 border-gray-700">
                <SelectValue placeholder="Toutes les catégories" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all">Toutes les catégories</SelectItem>
                <SelectItem value="stocks">Actions</SelectItem>
                <SelectItem value="crypto">Crypto</SelectItem>
                <SelectItem value="etf">ETF</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="default">
              <SelectTrigger className="w-32 bg-gray-800 border-gray-700">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="value">Value</SelectItem>
                <SelectItem value="change">Variation</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {portfolioItems.map(item => (
            <PortfolioItemCard key={item.id} item={item} chartData={chartData} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioDashboard;
