export interface WorkerWeekResume {
    name: string,
    daysWorked: dayWorked[]
}


export interface dayWorked {
    dayName: string,
    initHour: string,
    endHour: string
}