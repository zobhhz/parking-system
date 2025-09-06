import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
export default function StatusCard() {
    return (
        <Card>
            <CardHeader><CardTitle>Parking Status</CardTitle></CardHeader>
            <CardContent>
                {/* Slots Overview */}
                <div className="grid grid-cols-2 gap-4">
                    <StatusItem title="Total Slots" value="10" />
                    <StatusItem title="Available" value="10" />
                    <StatusItem title="Entry Points" value="3" />
                    <StatusItem title="Occupied" value="0" />
                </div>
                {/* Number of Slots per Size */}
                <div className="mt-4 pt-4 border-t">
                    <p className="font-medium mb-2">Number of Slots per Size</p>
                    <div className="flex flex-row gap-2 text-sm">
                        <Badge>Small: 3</Badge>
                        <Badge>Medium: 4</Badge>
                        <Badge>Large: 3</Badge>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function StatusItem({ title, value }: { title: string, value: string }) {
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