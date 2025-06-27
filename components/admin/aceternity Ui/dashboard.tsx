"use client";

import { OverviewStats } from "./dashboard/overview-stats";
import { RevenueChart } from "./dashboard/revenue-chart";

interface DashboardPageProps {
  activeAccount: number;
  paidPromotion: number;
  totalAccount: number;
  totalMerchant: number;
}

export default function DashboardPage({
  activeAccount,
  paidPromotion,
  totalAccount,
  totalMerchant,
}: DashboardPageProps) {
  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>

        <OverviewStats
          activeAccount={activeAccount}
          paidPromotion={paidPromotion}
          totalAccount={totalAccount}
          totalMerchant={totalMerchant}
        />

        <div className="grid gap-6">
          <RevenueChart />
        </div>
      </div>
    </div>
  );
}
