import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ParkingStatus } from "@/lib/definitions";

type StatusCardProps = {
    status: ParkingStatus
    entryPoints: number
}

export default function StatusCard({ status, entryPoints }: StatusCardProps) {
    return (
        <Card>
            <CardHeader><CardTitle>Parking Status</CardTitle></CardHeader>
            <CardContent>
                {/* Slots Overview */}
                <div className="grid grid-cols-2 gap-4">
                    <StatusItem title="Total Slots" value={status.totalSlots} />
                    <StatusItem title="Available" value={status.availableSlots} />
                    <StatusItem title="Entry Points" value={entryPoints} />
                    <StatusItem title="Occupied" value={status.occupiedSlots} />
                </div>
                {/* Number of Slots per Size */}
                <div className="mt-4 pt-4 border-t">
                    <p className="font-medium mb-2">Number of Slots per Size</p>
                    <div className="flex flex-row gap-2 text-sm">

                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Small (SP): {status.slotsBySize.small}</Badge>
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Medium (MP): {status.slotsBySize.medium}</Badge>
                        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Large (LP): {status.slotsBySize.large}</Badge>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function StatusItem({ title, value }: { title: string, value: number }) {
    let valueColor = "";

    if (title === "Available") {
        valueColor = "text-green-600"
    }
    else if (title === "Occupied") {
        valueColor = "text-red-600"
    }
    return (
        <div>
            <h3 className="font-medium">{title}</h3>
            <p className={`text-2xl font-bold ${valueColor}`}>{value}</p>
        </div>
    );
}