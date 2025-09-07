import { ParkingSlot, ParkingStatus, SlotSize, Vehicle, VehicleSize } from "@/lib/definitions"

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

    private canParkInSlot(vehicleSize: VehicleSize, slotSize: SlotSize): boolean {
        switch (vehicleSize) {
            case VehicleSize.SMALL:
                return true // Can park in any slot
            case VehicleSize.MEDIUM:
                return slotSize === "medium" || slotSize === "large"; // Can park in medium or large
            case VehicleSize.LARGE:
                return slotSize === "large" // Can only park in large
            default:
                return false
        }
    }

    private findClosestAvailableSlot(vehicleSize: VehicleSize, entryPointIndex: number): ParkingSlot | null {
        const availableSlots = this.parkingSlots.filter((slot) => !slot.isOccupied && this.canParkInSlot(vehicleSize, slot.size))

        if (availableSlots.length === 0) {
            return null
        }

        // Find slot with minimum distance from given entry point
        let closestSlot = availableSlots[0]
        let minDistance = closestSlot.distances[entryPointIndex]

        for (const slot of availableSlots) {
            const slotMinDistance = slot.distances[entryPointIndex]
            if (slotMinDistance < minDistance) {
                minDistance = slotMinDistance
                closestSlot = slot
            }
        }

        return closestSlot
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

    public getAvailableSlotsForSize(vehicleSize: VehicleSize): number {
        return this.parkingSlots.filter((slot) => !slot.isOccupied && this.canParkInSlot(vehicleSize, slot.size)).length
    }

    public getVehicleSizeDisplayName(size: VehicleSize): string {
        switch (size) {
            case VehicleSize.SMALL:
                return "Small"
            case VehicleSize.MEDIUM:
                return "Medium"
            case VehicleSize.LARGE:
                return "Large"
            default:
                return "Unknown"
        }
    }

    public parkVehicle(
        plateNumber: string,
        vehicleSize: VehicleSize,
        entryPointIndex: number,
        entryTime?: Date
    ): { success: boolean; message: string; slotId?: string } {
        // Check if vehicle is already parked
        if (this.parkedVehiclesMap.has(plateNumber)) {
            return { success: false, message: `${plateNumber} vehicle is already parked` }
        }

        const availableSlot = this.findClosestAvailableSlot(vehicleSize, entryPointIndex)
        const sizeDisplayName = this.getVehicleSizeDisplayName(vehicleSize)

        if (!availableSlot) {
            return { success: false, message: `No available parking slots for this vehicle size (${sizeDisplayName})` }
        }

        const vehicle: Vehicle = {
            plateNumber,
            size: vehicleSize,
            entryTime: entryTime || new Date(),
            assignedSlot: availableSlot.id,
            entryPoint: entryPointIndex
        }

        availableSlot.isOccupied = true
        availableSlot.occupiedBy = vehicle
        this.parkedVehiclesMap.set(plateNumber, vehicle)

        return {
            success: true,
            message: `${plateNumber} vehicle parked successfully in slot ${availableSlot.id} via entry ${entryPointIndex}`,
            slotId: availableSlot.id,
        }
    }
}