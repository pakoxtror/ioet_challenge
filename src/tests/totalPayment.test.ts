import { getTotalPayment } from '../utils/getTotalPayment';
import { processInput } from '../utils/processInput';

describe("Test RENE payment", () => {
    it("Should return 215 USD", ()=>{
        expect(getTotalPayment(processInput("RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00"))).toBe(
            "The amount to pay RENE is: 215 USD"
        )
    })
})

describe("Test ASTRID payment", () => {
    it("Should return 215 USD", ()=>{
        expect(getTotalPayment(processInput("ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00"))).toBe(
            "The amount to pay ASTRID is: 85 USD"
        )
    })
})

describe("Test DANIEL payment", () => {
    it("Should return 480 USD", ()=>{
        expect(getTotalPayment(processInput("DANIEL=MO00:00-00:00"))).toBe(
            "The amount to pay DANIEL is: 480 USD"
        )
    })
})
