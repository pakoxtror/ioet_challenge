import { processInput } from "./utils/processInput"
import { getTotalPayment } from './utils/getTotalPayment';

console.log("Welcome to IOET Challenge")

const input = "RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00"

const processed_input = processInput(input)

const totalToPay = getTotalPayment(processed_input)

console.log(totalToPay)