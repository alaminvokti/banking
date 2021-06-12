'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// ............. Part:144- DOM elements.........

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    // Use html elemnt on JS

    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i} ${type}</div>
          <div class="movements__value">${mov} €</div>
      </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} €`;
};

//..................Part: 151...............

const calcDisplaySummery = function (acc) {
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur, 0);

  labelSumIn.textContent = `${income} €`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, cur) => acc + cur, 0);

  labelSumOut.textContent = `${Math.abs(out)} €`;
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(diposite => (diposite * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      return int > 1;
    })
    .reduce((acc, inst) => acc + inst, 0);
  labelSumInterest.textContent = `${interest} €`;
};

const createUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUserName(accounts);

// Updated UI Function

const updateUI = function (acc) {
  // Dislplay movement
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummery(acc);
};
// Evenet handelar
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and Message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    // Clear input Field
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Updated uI

    updateUI(currentAccount);
  }
});
// ............. Part:156 Implementing Transfer money......

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);

  // Transfar money
  const receiverAcc = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.userName !== currentAccount.userName
  ) {
    // Doing the transfar
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    // Updated uI

    updateUI(currentAccount);
  }
});

// Loan From the bank

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Updated UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

// Delete the account

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('Delet the account');

  // const userName = inputCloseUsername.value;
  // const pin = Number(inputClosePin.value);

  if (
    inputCloseUsername.value === currentAccount.userName &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.userName === currentAccount.userName
    );
    console.log(index);

    accounts.splice(index, 1);

    // Hide UI

    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// ............. Part:140- Array slice and splice.........
/* 
let arr = ['a', 'b', 'c', 'd', 'e'];

// Slice Array... Don't change the orginal array

console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-3));
console.log(arr.slice(1, -3));
console.log(arr.slice(2, -2));
console.log(arr.slice());
console.log([...arr]);
console.log(arr);

// Splice Array... Change the orginal array
// console.log(arr.splice(2));
// arr.splice(-1);
arr.splice(1, 3);

console.log(arr);

// Reverse Array

arr = ['a', 'b', 'c', 'd', 'e'];

const arr2 = ['e', 'd', 'c', 'b', 'a'];
console.log(arr2.reverse());

// Concat

const letter = arr.concat(arr2);
console.log(letter);
console.log([...arr, ...arr2]);

// JOIN

console.log(letter.join('-'));
 */
// ............. Part:141- Looping Array .........

/* const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You diposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

console.log('---------Other way -----------');

movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You diposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
});
 */
// ............. Part:142- forEach  with map and set .........
/* 
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// console.log(currencies);

currencies.forEach(function (value, key, map) {
  console.log(`${key} : ${value}`);
});

// SET

const cirrenciesUnique = new Set(['USD', 'EUR', 'USD', 'GBP', 'GBP']);

console.log(cirrenciesUnique);

cirrenciesUnique.forEach(function (value, _, map) {
  console.log(`${value},`);
}); */

// ............. Part:146- Data Transformation.........
// ............. Part:147- The MAP methods.........
/* 
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1;

// const moveUSD = movements.map(function (mov) {
//   return mov * eurToUsd;
// });
const moveUSD = movements.map(mov => mov * eurToUsd);

console.log(movements, moveUSD);

const movDris = movements.map(
  (mov, i, arr) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'diposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);
console.log(movDris);
 */
// ............. Part:149- The filter Methods .........
/* 
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const diposite = movements.filter(function (mov) {
  return mov > 0;
});

console.log(movements);
console.log(diposite);

const dipositeFor = [];

for (const mov of movements) if (mov > 0) dipositeFor.push(mov);
console.log(dipositeFor);

const withdorew = movements.filter(mov => mov < 0);
console.log(withdorew);

const wihthdrewFor = [];

for (const move of movements) if (move < 0) wihthdrewFor.push(move);

console.log(wihthdrewFor);
 */

// ............. Part:150- The Reduce Methods .........
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const balance = movements.reduce(function (acc, cur) {
//   return acc + cur;
// }, 0);
/* 
const balance = movements.reduce((acc, cur) => acc + cur, 0);

console.log(balance);

let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

// MAX Value

const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
console.log(max);
 */

// ............. Part:152- Magic of chaining .........
/* const eurToUsd = 1.1;

const change = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((acc, cur) => acc + cur, 0);

console.log(movements);
console.log(change);
 */

// ............. Part:154- The find Methods .........

/* const firstWithdrewal = movements.find(mov => mov < 0);

console.log(movements);
console.log(firstWithdrewal);

console.log(accounts);

const acccounttt = accounts.find(acc => acc.owner === 'Jessica Davis');

console.log(acccounttt);

const acccounttt2 = accounts.map(acc => {
  const accoo = acc.owner === 'Jessica Davis';
  return accoo.owner;
});
console.log(acccounttt2);
 */
// ............. Part:158 The some and every......
/* 
console.log(movements);
console.log(movements.includes(-130));

const anyDoposite = movements.some(mov => mov > 5000);

console.log(anyDoposite);

// Every Methods

console.log(account4.movements.every(mov => mov > 0));
 */
// ............. Part:159 flat and flatMap......
/* 
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];

console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [[4, 5], 6], 7, 8];
console.log(arrDeep.flat(2));

// flat
const overallBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, cur) => acc + cur, 0);
console.log(overallBalance);

// flatMap
const overallBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, cur) => acc + cur, 0);
console.log(overallBalance2);
 */

// ............. Part:160 shorting Array......
// String

const woner = ['Fazle', 'Rabbi', 'Jumur', 'Maria'];
console.log(woner.sort());

// Number

console.log(movements);

// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (a < b) return -1;
// });

movements.sort((a, b) => a - b);

console.log(movements);
