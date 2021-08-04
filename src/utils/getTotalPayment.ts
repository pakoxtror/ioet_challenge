
import { dayWorked, WorkerWeekResume } from "../models/workerWeekResume"
import  Weekday  from "../schedule/weekday"
import Weekend from "../schedule/weekend"

const  isWeekend = (day: string ): boolean => {
    return  (day == "SA" || day == "SU")
}

const getHoursWorked = (fee: {initHour: string, endHour: string, price: number}, day: dayWorked): number =>{

    //Important to consider the "00:00" depending if it is init or end to calculate prices
    const init = day.initHour ==  "00:00"? new Date("01/01/2021 " + day.initHour).getHours() -0.1 : new Date("01/01/2021 " + day.initHour).getHours()
    const end = day.endHour == "00:00"? new Date("01/01/2021 " +  "23:59" ).getHours() + 1 : new Date("01/01/2021 " +  day.endHour  ).getHours()
    const feeInit = fee.initHour == "00:00"? new Date("01/01/2021 " +  fee.initHour).getHours() - 0.1 :  new Date("01/01/2021 " +  fee.initHour).getHours()
    const feeEnd = fee.endHour == "00:00"? new Date("01/01/2021 " +  "23:59").getHours() + 1 : new Date("01/01/2021 " +  fee.endHour  ).getHours()
    

    //Case 0: It is not on the Interval
    if (init > feeEnd  || end < feeInit) {
        return 0
    }
    //Case 1: It is greater than the Fee Interval 
    else if (init < feeInit && end > feeEnd) {
        return feeEnd - feeInit
    }
    //Case 2: Start and End times are inside the Fee Interval
    else if (init >= feeInit && end <= feeEnd){
        return end - init
    } 
    //Case 3: Start Time is outside  the Fee Inteval and End Time is inside the Fee Inteval
    else if (init < feeInit && end <= feeEnd){
        return end - feeInit 
    } 
    //Case 4: Start Time is  inside the Fee Interval and End Time  is outside the Fee Interval
    else if (init >= feeInit && end > feeEnd){
        return feeEnd - init
    } else {
        return 0
    }
}

const getDayPayment = (day: dayWorked) : number => {
    const tablePrices = isWeekend(day.dayName) ? Weekend: Weekday 
    let dayPay = 0
    tablePrices.fees.forEach((fee)=>{
        const hoursWorked: number = getHoursWorked(fee, day)
        dayPay += hoursWorked * fee.price
    })
    return dayPay
}

export const getTotalPayment = (workerInfo: WorkerWeekResume ): string => {
    const daysInfo = workerInfo.daysWorked
    let totalPay = 0
    daysInfo.forEach((day: dayWorked)=>{
        totalPay +=  getDayPayment(day)
    })
    return "The amount to pay " + workerInfo.name + " is: " + totalPay + " USD" 
}