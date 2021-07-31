Welcome to the IOET Challenge Exercise:

To execute the code on your local computer:
    1. npm i
    2. npm run start

If tests want to be executed: 
    1. npm run test

The exericise was programmed using typescript, because it allows to specify types on variables and functions,
thus resulting in a more solid and understandable code. I have defined  a couple of models and interfaces that 
allow me to perform logic analysis correctly.

Here is how I structured the problem and define tis solution:
    - Process Input Data: from the string received, I created an object containing the worker name information
    and its start and end time of each day.
    - Get Payment Information:  I took each day of work and passed it to a function that returns me the number of 
    hours that it has worked on an specific interval (To calculate different prices), taking into consideration 
    the case when is weekend or not, and the five possible cases that can occur on an interval of time. 
    Please check getHoursWorked() function on getTotalPayment.ts 

I have defined also a couple of tests to prove its efficiency, 3 main cases, which all returned correctly as expected.
