import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Vehicle, VehicleSize } from "@/lib/definitions";

interface CurrentlyParkedCardProps {
    parkedVehicles: Vehicle[]
}

export default function CurrentlyParkedCard({ parkedVehicles }: CurrentlyParkedCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Currently Parked</CardTitle>
                <CardDescription>{parkedVehicles.length} vehicles</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                    {parkedVehicles.length === 0 ? (
                        <p className="text-muted-foreground text-sm">Parking is empty.</p>
                    ) : (
                        parkedVehicles.map((vehicle) => (
                            <div key={vehicle.plateNumber} className="flex items-center justify-between p-2 bg-muted rounded">
                                <div>
                                    <p className="font-medium">{vehicle.plateNumber}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {vehicle.assignedSlot} • entered {vehicle.entryTime.toLocaleString()}
                                    </p>
                                </div>
                                <Badge className={getBadgeColor(vehicle.size)}>{vehicle.size}</Badge>
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

const getBadgeColor = (size: VehicleSize): string => {
    switch (size) {
        case VehicleSize.SMALL:
            return "bg-green-100 text-green-800 hover:bg-green-200"
        case VehicleSize.MEDIUM:
            return "bg-blue-100 text-blue-800 hover:bg-blue-200"
        case VehicleSize.LARGE:
            return "bg-purple-100 text-purple-800 hover:bg-purple-200"
        default:
            return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
}