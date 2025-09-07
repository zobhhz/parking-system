export enum VehicleSize {
    SMALL = "S",
    MEDIUM = "M",
    LARGE = "L",
}

export type SlotSize = "small" | "medium" | "large"

export interface ParkingSlot {
    /** Naming convention follows Slot Size + Number. For example, SP1 is for small parking lots */
    id: string
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

export type ParkingStatus = {
    totalSlots: number
    occupiedSlots: number
    availableSlots: number
    slotsBySize: { small: number; medium: number; large: number }
}