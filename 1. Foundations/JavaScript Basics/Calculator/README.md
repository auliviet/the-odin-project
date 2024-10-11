# odin-calculator
Final project for the Odin Project - Foundations

## Preview link
https://auliviet.github.io/odin-calculator/

## Instructions
- Start by creating functions for the following:
-- add
-- subtract
-- multiply
-- divide
- A calculator operation will consist of a number, an operator, and another number. Create three variables for each of the parts of a calculator operation. 
- Create a new function operate that takes an operator and 2 numbers and then calls one of the above functions on the numbers.
- Create a basic HTML calculator with buttons for each digit, each of the above functions and an “Equals” key.
- There should also be a display for the calculator. 
- Add a “clear” button.
- Create the functions that populate the display when you click the number buttons. 
- Make the calculator work! 
-- You’ll need to store the first number and second number that are input into the calculator, utilize the operator that the user selects, and then operate() on the two numbers when the user presses the “=” key.
-- You should already have the code that can populate the display, so once operate() has been called, update the display with the ‘solution’ to the operation.

## Gotchas: watch out for and fix these bugs if they show up in your code:
- Users should be able to string together several operations and get the right answer, with each pair of numbers being evaluated at a time. For example, 12 + 7 - 5 * 3 = should yield 42.
- Your calculator should not evaluate more than a single pair of numbers at a time. 
- You should round answers with long decimals so that they don’t overflow the screen.
- Pressing = before entering all of the numbers or an operator could cause problems!
- Pressing “clear” should wipe out any existing data.. make sure the user is really starting fresh after pressing “clear”
- Display a snarky error message if the user tries to divide by 0… and don’t let it crash your calculator!

## Extra credit
- Add a . button and let users input decimals! Make sure you don’t let them type more than one though: 12.3.56.5.
- Make it look nice! 
- Add a “backspace” button, so the user can undo if they click the wrong number.
- Add keyboard support!