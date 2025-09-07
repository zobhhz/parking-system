"use client"

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function OperationsCard() {
    const [entryDate, setEntryDate] = useState("")
    const [entryTime, setEntryTime] = useState("")
    const [exitDate, setExitDate] = useState("")
    const [exitTime, setExitTime] = useState("")
    const [useManualTime, setUseManualTime] = useState(false)

    const getCurrentDate = () => {
        const today = new Date()
        return today.toISOString().split("T")[0]
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Park Vehicle</CardTitle>
                <CardDescription>Enter the vehicle number and select its size</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Time Config */}
                <div className="pb-4 border-b">
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="useManualTime"
                            checked={useManualTime}
                            onChange={(e) => setUseManualTime(e.target.checked)}
                            className="rounded"
                        />
                        <label htmlFor="useManualTime" className="text-sm font-medium">
                            Use manual time input
                        </label>
                    </div>
                </div>
                <Tabs defaultValue="park">
                    <TabsList className="w-full grid grid-cols-2">
                        <TabsTrigger value="park">Park Vehicle</TabsTrigger>
                        <TabsTrigger value="unpark">Unpark Vehicle</TabsTrigger>
                    </TabsList>
                    {/* Park Vehicle Tab */}
                    <TabsContent value="park" className="space-y-4">
                        {/* Plate Number Input */}
                        <div>
                            <p className="text-sm font-medium mb-2">Plate Number</p>
                            <Input id="plateNum" type="text" placeholder="Enter plate number" />
                        </div>
                        {/* Select Size */}
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
                        {/* Manual Time */}
                        {useManualTime && (
                            <div className="space-y-3 p-3 bg-muted rounded-lg">
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="text-xs font-medium mb-1 block">Entry Date</label>
                                        <Input
                                            type="date"
                                            value={entryDate}
                                            onChange={(e) => setEntryDate(e.target.value)}
                                            max={getCurrentDate()}
                                            className="text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium mb-1 block">Entry Time</label>
                                        <Input
                                            type="time"
                                            value={entryTime}
                                            onChange={(e) => setEntryTime(e.target.value)}
                                            className="text-sm"
                                        />
                                    </div>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Entry date cannot be in the future. Leave fields empty to use current time for parking.
                                </p>
                            </div>
                        )}
                        <Button className="w-full">Park Vehicle</Button>
                    </TabsContent>
                    {/* Unpark Vehicle Tab */}
                    <TabsContent value="unpark" className="space-y-4">
                        <div>
                            <p className="text-sm font-medium mb-2">Plate Number</p>
                            <Input id="plateNum" type="text" placeholder="Enter plate number to unpark" />
                        </div>

                        {useManualTime && (
                            <div className="space-y-3 p-3 bg-muted rounded-lg">
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="text-xs font-medium mb-1 block">Exit Date</label>
                                        <Input
                                            type="date"
                                            value={exitDate}
                                            onChange={(e) => setExitDate(e.target.value)}
                                            min={getCurrentDate()}
                                            className="text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium mb-1 block">Exit Time</label>
                                        <Input
                                            type="time"
                                            value={exitTime}
                                            onChange={(e) => setExitTime(e.target.value)}
                                            className="text-sm"
                                        />
                                    </div>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Exit date cannot be in the past. Leave fields empty to use current time for unparking.
                                </p>
                            </div>
                        )}
                        <Button className="w-full">Unpark Vehicle</Button>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}

function WarningMessage({ text }: { text: string }) {
    return (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800 font-medium">⚠️ {text}</p>
        </div>
    );
}