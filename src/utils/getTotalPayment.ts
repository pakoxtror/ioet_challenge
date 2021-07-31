
import { dayWorked, WorkerWeekResume } from "../models/workerWeekResume"
import  Weekday  from "../schedule/weekday"
import Weekend from "../schedule/weekend"

const  isWeekend = (day: string ): boolean => {
    return  (day == "SA" || day == "SU")
}

const getHoursWorked = (fee: {initHour: string, endHour: string, price: number}, day: dayWorked): number =>{

    //Important to consider the "00:00" depending if it is init or end to calculate prices
    let init = day.initHour ==  "00:00"? new Date("01/01/2021 " + day.initHour).getHours() -0.1 : new Date("01/01/2021 " + day.initHour).getHours()
    let end = day.endHour == "00:00"? new Date("01/01/2021 " +  "23:59" ).getHours() + 1 : new Date("01/01/2021 " +  day.endHour  ).getHours()
    let feeInit = fee.initHour == "00:00"? new Date("01/01/2021 " +  fee.initHour).getHours() - 0.1 :  new Date("01/01/2021 " +  fee.initHour).getHours()
    let feeEnd = fee.endHour == "00:00"? new Date("01/01/2021 " +  "23:59").getHours() + 1 : new Date("01/01/2021 " +  fee.endHour  ).getHours()
    

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
    let tablePrices = isWeekend(day.dayName) ? Weekend: Weekday 
    let dayPay: number = 0
    tablePrices.fees.forEach((fee)=>{
        let hoursWorked: number = getHoursWorked(fee, day)
        dayPay += hoursWorked * fee.price
    })
    return dayPay
}

export const getTotalPayment = (workerInfo: WorkerWeekResume ): string => {
    let daysInfo = workerInfo.daysWorked
    let totalPay: number = 0
    daysInfo.forEach((day: dayWorked)=>{
        totalPay +=  getDayPayment(day)
    })
    return "The amount to pay " + workerInfo.name + " is: " + totalPay + " USD" 
}