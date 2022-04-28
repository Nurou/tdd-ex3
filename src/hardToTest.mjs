import fs from "fs";

function convertToDate(str) {
  return new Date(str.substring(0, 10));
}

function randomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* 
a function that reads user data from a file, and from the 3 that registered last by date and had not been suggested today,
it returns one of them by random

- time — 'registered' property on user✅
- file system — user data ✅
- randomness — selecting at random from among users  ✅
- global variables — file path ✅

 */
export function getSuggestedUser(filePath) {
  let data = JSON.parse(fs.readFileSync(filePath));

  const sortedByRegistration = data.sort(
    (a, b) => convertToDate(a.registered) - convertToDate(b.registered)
  );

  const lastThree = sortedByRegistration.slice(-3);

  const randomUser = randomElement(lastThree);

  data.find((user) => user._id === randomUser._id).lastSuggested = new Date();

  fs.writeFileSync(filePath, JSON.stringify(data));

  return randomUser;
}
