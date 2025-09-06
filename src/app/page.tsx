import OperationsCard from "@/components/features/OperationsCard";
import PricingCard from "@/components/features/PricingCard";
import StatusCard from "@/components/features/StatusCard";

export default function Home() {
  return (
    <main className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <OperationsCard />
        <StatusCard />
      </div>
      <PricingCard />
    </main>
  );
}
