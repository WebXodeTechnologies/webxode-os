"use client";

import React from "react";
import { WidgetCard } from "../common/WidgetCard";
import { MoreHorizontal, Laptop, Watch, Smartphone, Headphones } from "lucide-react";

interface DeliverableItem {
  id: string;
  name: string;
  subText: string;
  code: string;
  value: string;
  status: "In Stock" | "Out of Stock" | "In Delivery";
  icon: any;
}

export function ProjectDeliveryWidget() {
  const items: DeliverableItem[] = [
    {
      id: "1",
      name: "Wireless Earbuds Pro",
      subText: "(430)",
      code: "P-1001",
      value: "$210",
      status: "In Stock",
      icon: Headphones,
    },
    {
      id: "2",
      name: "Smart Fitness Watch",
      subText: "(124)",
      code: "P-1002",
      value: "$125",
      status: "Out of Stock",
      icon: Watch,
    },
    {
      id: "3",
      name: "Portable Blender",
      subText: "(200)",
      code: "P-1003",
      value: "$256",
      status: "In Stock",
      icon: Laptop,
    },
    {
      id: "4",
      name: "Gaming Mouse RGB",
      subText: "(85)",
      code: "P-1004",
      value: "$89",
      status: "In Stock",
      icon: Smartphone,
    },
  ];

  const statusStyles = {
    "In Stock": "bg-emerald-50 text-emerald-600 border-emerald-100",
    "Out of Stock": "bg-rose-50 text-rose-600 border-rose-100",
    "In Delivery": "bg-amber-50 text-amber-600 border-amber-100",
  };

  return (
    <WidgetCard>
      {/* Header matching Image 2: "Most Popular Products" with Purple Dot */}
      <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="h-3 w-3 rounded-full bg-indigo-600 ring-4 ring-indigo-100"></span>
          <h3 className="text-base font-bold text-slate-900 sm:text-lg">Most Popular Products</h3>
        </div>
      </div>

      {/* List Table matching Image 2 */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase">
              <th className="pb-3 font-bold">Product Name</th>
              <th className="pb-3 text-center font-bold">ID</th>
              <th className="pb-3 text-center font-bold">Price</th>
              <th className="pb-3 text-center font-bold">Status</th>
              <th className="pb-3 text-right font-bold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
            {items.map((prod) => {
              const Icon = prod.icon;
              return (
                <tr key={prod.id} className="transition hover:bg-slate-50/60">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{prod.name}</p>
                        <p className="text-[10px] font-medium text-slate-400">{prod.subText}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-center font-mono text-xs text-slate-500">{prod.code}</td>
                  <td className="py-3 text-center font-extrabold text-slate-900">{prod.value}</td>
                  <td className="py-3 text-center">
                    <span
                      className={`rounded-md border px-2 py-0.5 text-[10px] font-bold ${statusStyles[prod.status]}`}
                    >
                      {prod.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button type="button" className="text-slate-400 hover:text-slate-900">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </WidgetCard>
  );
}
