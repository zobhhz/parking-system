import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, } from "@/components/ui/card";
import PricingCard from "@/components/features/PricingCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Home() {
  return (
    <main className="w-full max-w-4xl mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Park Vehicle</CardTitle>
          <CardDescription>Enter the vehicle number and select its size</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium mb-2">Plate Number</p>
            <Input id="plateNum" type="text" placeholder="Enter plate number" />
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Vehicle Size</p>
            <Select>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue id="vehicleSize" placeholder="Select vehicle size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small (S)</SelectItem>
                <SelectItem value="medium">Medium (M)</SelectItem>
                <SelectItem value="large">Large (L)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter><Button className="w-full">Park Vehicle</Button></CardFooter>
      </Card>
      <PricingCard />
    </main>
  );
}
