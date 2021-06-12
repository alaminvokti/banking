/* 'use strict';
// ....................Challenge #1 ..................
const dogsJulia = [3, 5, 2, 12, 7];

const dogsKete = [4, 1, 15, 8, 3];

const checkDogs = function (arr1, arr2) {
  const corJulia = arr1.slice(1, -2);
  const corKete = arr2.slice();
  const allDog = [...corJulia, ...corKete];

  allDog.forEach(function (val, i) {
    if (val >= 3) {
      console.log(`Dog Number ${i + 1} is and adult, and is ${val} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy`);
    }
  });
};

// checkDogs(dogsJulia, dogsKete);
*/
// ....................Challenge #2 ..................

// const calcAverageHumanAge = function (ages) {
//   const convertAge = ages
//     .map(function (dogAge, i, arr) {
//       if (dogAge <= 2) {
//         return dogAge * 2;
//       } else {
//         return 16 + dogAge * 4;
//       }
//     })
//     .filter(dogAge => dogAge >= 18);

//   const adultDog =
//     convertAge.reduce((acc, cur) => acc + cur, 0) / convertAge.length;
//   return adultDog;
// };

// ....................Challenge #2 ..............
/* const calcAverageHumanAge = ages =>
  ages
    .map(dogAge => (dogAge <= 2 ? dogAge * 2 : 16 + dogAge * 4))
    .filter(dogAge => dogAge >= 18)
    .reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));
 */
