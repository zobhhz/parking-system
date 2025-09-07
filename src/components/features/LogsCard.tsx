import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type LogsCardProps = {
    logs: string[]
}

export default function LogsCard({ logs }: LogsCardProps) {
    // get the 10 most recent messages only
    const recentLogs = logs.slice(-10).reverse()

    return (
        <Card>
            <CardHeader>
                <CardTitle>Parking Activity Log</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-1 max-h-48 overflow-y-auto">
                    {recentLogs.length === 0 ? (
                        <p className="text-muted-foreground text-sm">No activity yet... park a vehicle!</p>
                    ) : (
                        recentLogs.map((message, index) => (
                            <p key={index} className="text-xs p-2 bg-muted rounded">
                                {message}
                            </p>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    );

}