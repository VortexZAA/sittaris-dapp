import ApexChart from "@/components/charts/mixed";
import MainLayout from "@/layout/mainLayout";
import synaptiq from "@/services/synaptiq";
import { useEffect, useState } from "react";

export default function Home() {
  return (
    <MainLayout title="Test">
      <h1>Deneme</h1>
      <div className="max-w-md w-full">
        <ApexChart />
      </div>
    </MainLayout>
  );
}
