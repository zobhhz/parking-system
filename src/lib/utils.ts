import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const createDateFromInputs = (date: string | undefined, time: string | undefined): Date | undefined => {
  if (!date && !time) return undefined

  const now = new Date()

  // If only date is provided, use current time for hours/minutes
  if (date && !time) {
    const [year, month, day] = date.split("-").map(Number)
    return new Date(year, month - 1, day, now.getHours(), now.getMinutes(), now.getSeconds())
  }

  // If only time is provided, use today's date
  if (!date && time) {
    const [hours, minutes] = time.split(":").map(Number)
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes)
  }

  // If both are provided
  return new Date(`${date}T${time}`)
}
