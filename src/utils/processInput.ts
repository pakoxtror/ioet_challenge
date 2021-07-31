import { WorkerWeekResume } from "../models/workerWeekResume";
import { dayWorked } from "../models/workerWeekResume";

export const processInput = (inputWorker: string) : WorkerWeekResume  =>  {
    
    const name: string = inputWorker.split("=")[0]
    const daysStr: string = inputWorker.split("=")[1]
    const daysList: Array<string> =daysStr.split(",")

    const daysWorked: Array<dayWorked> = []
    daysList.forEach((day: string)=>{
            const dayName = day.substring(0,2)
            const hoursWorkedStr =  day.substring(2)
            daysWorked.push({dayName: dayName, 
                            initHour: hoursWorkedStr.split("-")[0], 
                            endHour: hoursWorkedStr.split("-")[1] })
    })
    return  { name: name, daysWorked: daysWorked}
} 