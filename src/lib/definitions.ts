export enum VehicleSize {
    SMALL = "S",
    MEDIUM = "M",
    LARGE = "L",
}

export enum SlotSize {
    SMALL = 0,
    MEDIUM = 1,
    LARGE = 2,
}

export interface ParkingSlot {
    id: number
    size: SlotSize
    distances: number[] // Distance from each entry point
    isOccupied: boolean
    occupiedBy?: Vehicle
}

export interface Vehicle {
    plateNumber: string
    size: VehicleSize
    entryTime: Date
    exitTime?: Date
    lastExitTime?: Date // For continuous rate calculation
    assignedSlot?: number
}

export interface ParkingFee {
    totalHours: number
    excessHours: number
    flatRateFee: number
    hourlyFee: number
    dailyFee: number
    totalFee: number
    breakdown: string
}