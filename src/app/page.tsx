"use client"

import { useState } from "react";
import OperationsCard from "@/components/features/OperationsCard";
import PricingCard from "@/components/features/PricingCard";
import StatusCard from "@/components/features/StatusCard";
import CurrentlyParkedCard from "@/components/features/CurrentlyParkedCard";
import LogsCard from "@/components/features/LogsCard";
import { ParkingSystem } from "@/lib/parking-system";
import { SlotSize } from "@/lib/definitions";

export default function Home() {
  // initialize constructor with sample parking layout: 3 entry points, 10 slots
  const [parkingSystem] = useState(() => {
    const slotDistances = [
      [1, 4, 5], // Slot 0: distances from entry points A, B, C
      [2, 3, 4],
      [3, 2, 3],
      [4, 1, 2],
      [5, 2, 1],
      [2, 5, 4],
      [3, 4, 3],
      [1, 6, 5],
      [4, 3, 2],
      [5, 1, 3],
    ]

    const slotSizes: SlotSize[] = ["small", "medium", "large", "small", "medium", "large", "small", "medium", "large", "medium"]

    return new ParkingSystem(3, slotDistances, slotSizes)
  })

  const [status, setStatus] = useState(parkingSystem.getParkingStatus())
  const [parkedVehicles, setParkedVehicles] = useState(parkingSystem.getParkedVehicles())
  const [logs, setLogs] = useState<string[]>([])

  const updateStatus = () => {
    setStatus(parkingSystem.getParkingStatus())
    setParkedVehicles(parkingSystem.getParkedVehicles())
  }

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setLogs((prev) => [...prev, `${timestamp}: ${message}`])
  }
  return (
    <main className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <OperationsCard />
        <StatusCard status={status} entryPoints={parkingSystem.getEntryPointsCount()} />
        <CurrentlyParkedCard parkedVehicles={parkedVehicles} />
        <LogsCard logs={logs} />
      </div>
      <PricingCard />
    </main>
  );
}
