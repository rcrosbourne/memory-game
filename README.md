# Frontend Mentor - Memory game solution

This is a solution to the [Memory game challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/memory-game-vse4WFPvM). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the game depending on their device's screen size
- See hover states for all interactive elements on the page
- Play the Memory game either solo or multiplayer (up to 4 players)
- Set the theme to use numbers or icons within the tiles
- Choose to play on either a 6x6 or 4x4 grid

### Screenshot

![Mobile New Game Screen](https://github.com/rcrosbourne/memory-game/blob/main/.screenshots/Screen%20Shot%202022-01-01%20at%2006.25.38.png)
![Mobile Game Menu](https://github.com/rcrosbourne/memory-game/blob/main/.screenshots/Screen%20Shot%202022-01-01%20at%2006.25.28.png)
![Tablet Layout](https://github.com/rcrosbourne/memory-game/blob/main/.screenshots/Screen%20Shot%202022-01-01%20at%2006.25.03.png)

I will udpate this

**Note: Delete this note and the paragraphs above when you add your screenshot. If you prefer not to add a screenshot, feel free to remove this entire section.**

### Links

- Solution URL: [Github Repo](https://github.com/rcrosbourne/memory-game)
- Live Site URL: [Live](https://memory-game.rcrosbourne.dev)

## My process

I started with updating my tailwind config file to incorporate the design system. I also added a few new components to the project. Then I started working on the layout for mobile (solo player). After that I worked on the logic for the game. Lastly I updated the layout for tablet and desktop.

I had a few friends test the game on their devices and I was able to get the game to work on all of them.

### Built with

- Semantic HTML5 markup
- Mobile-first workflow
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/) - A utility-first CSS framework
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- [Headless UI](https://headlessui.dev/) - UI Components

### What I learned

Use tailwind defaults when possible even if makes the implementation a pixel or of off. Using the defaults helps tremendously with maintainability and readability.
For the next challenge I may take the spacing from the design system and update my tailwind config to get pixel perfect implementations.

### Continued development

The current solution only supports solo play. I will continue to work on multiplayer feature as well as maybe a score board. I may also add more animations and effects to the game.

### Useful resources

- [Using React Context for state management in Next.js](https://www.netlify.com/blog/2020/12/01/using-react-context-for-state-management-in-next.js/) - This helped clarified the Context API.
- [How to use Context, useReducer and LocalStorage in Next JS](https://medium.com/geekculture/how-to-use-context-usereducer-and-localstorage-in-next-js-cc7bc925d3f2) - This article, although has a few typos, it helped me understand the Context API and how to use it with useReducer and LocalStorage. I also learned how to use the useEffect hook to update the LocalStorage.

## Author

- Frontend Mentor - [@rcrosbourne](https://www.frontendmentor.io/profile/rcrosbourne)
