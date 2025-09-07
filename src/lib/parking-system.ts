import { ParkingSlot, ParkingStatus, SlotSize, Vehicle } from "@/lib/definitions"

export class ParkingSystem {
    private entryPointCount: number
    private parkingSlots: ParkingSlot[]
    private parkedVehiclesMap: Map<string, Vehicle>
    private readonly FLAT_RATE = 40
    private readonly FLAT_RATE_HOURS = 3
    private readonly DAILY_RATE = 5000

    constructor(
        entryPoints: number,
        slotDistances: number[][],
        slotSizes: SlotSize[],
    ) {
        // error handling
        if (entryPoints < 3) {
            throw new Error("Minimum 3 entry points required")
        }

        if (slotDistances.length !== slotSizes.length) {
            throw new Error("Slot distances and sizes arrays must have same length")
        }

        // setting fields
        this.entryPointCount = entryPoints
        this.parkedVehiclesMap = new Map()
        this.parkingSlots = this.initializeSlots(slotDistances, slotSizes)
    }

    /** Helper method to initialize slots */
    private initializeSlots(slotDistances: number[][], slotSizes: SlotSize[]): ParkingSlot[] {
        const slotCounters = { small: 0, medium: 0, large: 0 }
        return slotDistances.map((distances, index) => {
            const size = slotSizes[index]
            slotCounters[size]++
            const prefix = size === "small" ? "SP" : size === "medium" ? "MP" : "LP"
            return { id: `${prefix}${slotCounters[size]}`, size, distances, isOccupied: false }
        })
    }

    /** Getter for entry points count */
    public getEntryPointsCount(): number {
        return this.entryPointCount
    }

    /** Getter for the current slot availability */
    public getParkingStatus(): ParkingStatus {
        const occupiedSlots = this.parkingSlots.filter((slot) => slot.isOccupied).length
        const slotsBySize = {
            small: this.parkingSlots.filter((slot) => slot.size === "small").length,
            medium: this.parkingSlots.filter((slot) => slot.size === "medium").length,
            large: this.parkingSlots.filter((slot) => slot.size === "large").length,
        }

        return {
            totalSlots: this.parkingSlots.length,
            occupiedSlots,
            availableSlots: this.parkingSlots.length - occupiedSlots,
            slotsBySize,
        }
    }

    /** Getter for all parked vehicles */
    public getParkedVehicles(): Vehicle[] {
        return Array.from(this.parkedVehiclesMap.values())
    }

    /** Checks if a plate number is parked or not */
    public isVehicleParked(plateNumber: string): boolean {
        return this.parkedVehiclesMap.has(plateNumber)
    }
}