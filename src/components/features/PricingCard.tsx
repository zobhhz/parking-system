import { Card, CardHeader, CardTitle, CardDescription, CardContent, } from "@/components/ui/card";

export default function PricingCard() {
    return (
        <Card className="mt-6">
            <CardHeader>
                <CardTitle>Pricing Structure</CardTitle>
                <CardDescription>Vehicles returning within 1 hour after leaving are charged continously</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 ">
                <div className="pb-4 md:py-0 md:pr-4 border-b md:border-b-0 md:border-r">
                    <h3 className="font-medium mb-2">Base Rate</h3>
                    <p>₱40 for first 3 hours (all vehicle types)</p>
                </div>
                <div className="py-4 md:py-0 md:px-4 border-b md:border-b-0 md:border-r">
                    <h3 className="font-medium mb-2">Hourly Rates (after first 3 hours)</h3>
                    <ul className="space-y-1">
                        <li>Small slots: ₱20/hour</li>
                        <li>Medium slots: ₱60/hour</li>
                        <li>Large slots: ₱100/hour</li>
                    </ul>
                </div>
                <div className="pt-4 md:py-0 md:pl-4">
                    <h3 className="font-medium mb-2">Extended Parking</h3>
                    <p>₱5,000 per 24-hour period (all vehicles types)</p>
                </div>
            </CardContent>
        </Card>
    );
}