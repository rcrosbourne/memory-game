// Based on Fisher-Yates shuffle

import { Token } from "../data/models";

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export default function shuffle(inputArray: Token[]): Token[] {
  let currentIndex = inputArray.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [inputArray[currentIndex], inputArray[randomIndex]] = [
      inputArray[randomIndex],
      inputArray[currentIndex],
    ];
  }

  return inputArray;
}
