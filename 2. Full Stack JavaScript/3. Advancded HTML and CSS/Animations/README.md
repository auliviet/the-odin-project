# CSS ANIMATIONS

[The Oding Project](https://www.theodinproject.com): CSS Animations.
Exercise as part of the Full-stack JavaScript curriculum on animations using CSS.

## Preview links

[Github Pages - Button hover](https://auliviet.github.io/the-odin-project/css-animations/button)
[Github Pages - Pop up](https://auliviet.github.io/the-odin-project/css-animations/popup)
[Github Pages - Drop down](https://auliviet.github.io/the-odin-project/css-animations/dropdown)

## Instructions

### Button Hover

Use a transition to scale the button when you hover your mouse over it.

#### Self Check

- Does the button grow when you hover it?
- Do other properties of the button remain unchanged?
- Does the `:hover` pseudo-class trigger the transition?

### Popup

In this exercise we have set up a simple pop-up dialog for you. It already works! Load up index.html and give it a shot!

You don't need to worry about the actual functionality here; we've just written a little javascript that adds and removes a `.show` class to the popup and the backdrop. Your task then is to make it _move_, as in the desired-outcome image below.

#### Hints

- "modal" is another word for 'pop-up'
- In the code we've provided, the popup is sitting in its final position. You'll need to change its initial position and then use a transition to move it back to the center.
- You might want to change the initial opacity from 0% to something like 20% while you're working on it, so you can easily see where it is coming from before you click the button.
- Don't overthink this one... it might seem complicated, but it requires just a few lines of code.

#### Self Check

- The pop-up slides down into position when you click the open button and slides back up when you click 'close modal'
- The opacity fades smoothly in and out when toggling the modal

### Dropdown Menu

We've set up a dropdown menu in this exercise. Load up the page, you can see a single menu title, with a dropdown menu that will open upon clicking on the title.

Your task is to add animation to the dropdown menu so that it will have an effect of expanding. Check out the desired outcome below, and notice the _bounce_ illusion when the dropdown expands close to its final end state.

#### Hints

- You need to specify a _transform-origin_ property to make the dropdown menu start transforming from the top
- You need to add an intermediate step to the keyframe at rule to implement the _bounce_ illusion.

#### Self Check

- The dropdown menu expands after you click on the menu title
- There's a _bounce_ illusion towards the end of the animation
