"use client"

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VehicleSize } from "@/lib/definitions";
import { ParkingSystem } from "@/lib/parking-system";
import { useState } from "react";

type OperationsCardProps = {
    parkingSystem: ParkingSystem
    onPark: (
        plateNumber: string,
        vehicleSize: VehicleSize,
        entryPointIndex: number,
        entryDate?: string,
        entryTime?: string
    ) => void
    // onUnpark: (
    //     plateNumber: string,
    //     exitDate?: string,
    //     exitTime?: string
    // ) => void
}

export default function OperationsCard({ parkingSystem, onPark }: OperationsCardProps) {
    const [plateNumber, setPlateNumber] = useState("")
    const [unparkPlateNumber, setUnparkPlateNumber] = useState("")
    const [vehicleSize, setVehicleSize] = useState<VehicleSize | null>(null)
    const [entryPointIndex, setEntryPointIndex] = useState<number | null>(null)
    const [entryDate, setEntryDate] = useState("")
    const [entryTime, setEntryTime] = useState("")
    const [exitDate, setExitDate] = useState("")
    const [exitTime, setExitTime] = useState("")
    const [useManualTime, setUseManualTime] = useState(false)
    const [unparkError, setUnparkError] = useState("")

    const isPlateAlreadyParked = plateNumber ? parkingSystem.isVehicleParked(plateNumber) : false
    const noSlotsAvailable = vehicleSize !== null ? parkingSystem.getAvailableSlotsForSize(vehicleSize) === 0 : false

    const getCurrentDate = () => {
        const today = new Date()
        return today.toISOString().split("T")[0]
    }

    const handleParkOnClick = () => {
        if (vehicleSize !== null && entryPointIndex !== null) {
            onPark(
                plateNumber,
                vehicleSize,
                entryPointIndex,
                useManualTime ? entryDate : undefined,
                useManualTime ? entryTime : undefined,
            )

            // Reset fields
            setPlateNumber("")
            setVehicleSize(null)
            setEntryPointIndex(null)
            setEntryDate("")
            setEntryTime("")
        }
    }

    const handleUnparkOnClick = () => {
        if (!unparkPlateNumber) return // no input

        if (!parkingSystem.isVehicleParked(unparkPlateNumber)) { // not parked
            setUnparkError(`Vehicle ${unparkPlateNumber} is not currently parked`)
            return
        }
        // onUnpark(
        //     unparkPlateNumber,
        //     useManualTime ? exitDate : undefined,
        //     useManualTime ? exitTime : undefined,
        // )

        // Reset fields
        setUnparkError("")
        setUnparkPlateNumber("")
        setExitDate("")
        setExitTime("")
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
                            <Input
                                type="text"
                                value={plateNumber}
                                onChange={(e) => setPlateNumber(e.target.value.toUpperCase())}
                                placeholder="Enter plate number"
                            />
                        </div>
                        {/* Select Size & Entry Point */}
                        <div className="flex flex-col lg:flex-row justify-between space-y-4">

                            <div>
                                <p className="text-sm font-medium mb-2">Vehicle Size</p>
                                <Select
                                    value={vehicleSize ?? ""}
                                    onValueChange={(val) => setVehicleSize(val as VehicleSize)}
                                >
                                    <SelectTrigger className="w-full lg:w-[180px]">
                                        <SelectValue placeholder="Select vehicle size" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={VehicleSize.SMALL}>Small (S)</SelectItem>
                                        <SelectItem value={VehicleSize.MEDIUM}>Medium (M)</SelectItem>
                                        <SelectItem value={VehicleSize.LARGE}>Large (L)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <p className="text-sm font-medium mb-2">Entry Point</p>
                                <Select
                                    value={entryPointIndex === null ? "" : String(entryPointIndex)}
                                    onValueChange={(val) => setEntryPointIndex(Number(val))}
                                >
                                    <SelectTrigger className="w-full lg:w-[180px]">
                                        <SelectValue placeholder="Select entry point" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Array.from({ length: parkingSystem.getEntryPointsCount() }).map((_, index) => (
                                            <SelectItem key={index} value={String(index)}>
                                                Entry {String.fromCharCode(65 + index)} {/* A, B, C, ... */}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
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
                        {/* Warnings */}
                        {isPlateAlreadyParked && (<WarningMessage text={`Vehicle ${plateNumber} is already parked`} />)}
                        {noSlotsAvailable && (<WarningMessage text={`No available slots for ${vehicleSize} vehicles`} />)}
                        <Button
                            className="w-full disabled:cursor-not-allowed"
                            onClick={handleParkOnClick}
                            disabled={
                                !plateNumber ||                // missing plate number
                                vehicleSize === null ||        // no vehicle size chosen
                                entryPointIndex === null ||    // no entry point chosen
                                isPlateAlreadyParked ||        // already parked
                                noSlotsAvailable
                            }
                        >Park Vehicle
                        </Button>
                    </TabsContent>
                    {/* Unpark Vehicle Tab */}
                    <TabsContent value="unpark" className="space-y-4">
                        <div>
                            <p className="text-sm font-medium mb-2">Plate Number</p>
                            <Input
                                type="text"
                                value={unparkPlateNumber}
                                onChange={(e) => setUnparkPlateNumber(e.target.value.toUpperCase())}
                                placeholder="Enter plate number to unpark"
                            />
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
                        {unparkError && <WarningMessage text={unparkError} />}
                        <Button onClick={handleUnparkOnClick} disabled={!unparkPlateNumber} className="w-full">Unpark Vehicle</Button>
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