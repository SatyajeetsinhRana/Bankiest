"use strict";
// BANKIST APP

// Data
const account1 = {
  owner: "Rana Satyajeetsinh",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    "2023-11-18T21:31:17.178Z",
    "2023-05-23T07:42:02.383Z",
    "2023-05-28T09:15:04.904Z",
    "2023-05-01T10:17:24.185Z",
    "2023-05-08T14:11:59.604Z",
    "2023-05-27T17:01:17.194Z",
    "2023-05-11T23:36:17.929Z",
    "2023-05-12T10:51:36.790Z",
  ],
};

const account2 = {
  owner: "Raj Patel",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    "2024-01-01T13:15:33.035Z",
    "2024-01-30T09:48:16.867Z",
    "2024-04-25T06:04:23.907Z",
    "2024-01-25T14:18:46.235Z",
    "2024-02-05T16:33:06.386Z",
    "2024-04-10T14:43:26.374Z",
    "2024-03-25T18:49:59.371Z",
    "2024-05-26T12:01:20.894Z",
  ],
};

const account3 = {
  owner: "Meet Patel",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    "2024-03-18T21:31:17.178Z",
    "2024-03-23T07:42:02.383Z",
    "2024-03-28T09:15:04.904Z",
    "2024-03-01T10:17:24.185Z",
    "2024-03-08T14:11:59.604Z",
    "2024-03-27T17:01:17.194Z",
    "2024-03-11T23:36:17.929Z",
    "2024-03-12T10:51:36.790Z",
  ],
};

const account4 = {
  owner: "Tirth Patel",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    "2024-04-01T13:15:33.035Z",
    "2024-04-30T09:48:16.867Z",
    "2024-04-25T06:04:23.907Z",
    "2024-04-25T14:18:46.235Z",
    "2024-04-05T16:33:06.386Z",
    "2024-04-10T14:43:26.374Z",
    "2024-04-25T18:49:59.371Z",
    "2024-04-26T12:01:20.894Z",
  ],
};

const accounts = [account1, account2, account3, account4];
let current_account = account1;
let sorted = false;

// make username by their first word of name
const username = accounts.map(function (element) {
  return element.owner.trimStart().split(" ").at(0);
});

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////
/////////////////////////////////////////////////

// create functions

// function for displaying time
function formatDateTo12Hour(isoString) {
  const date = new Date(isoString);

  const ISTOffset = 5 * 60 + 30; // IST offset in minutes
  const localTime = new Date(date.getTime() + ISTOffset * 60 * 1000);

  let hours = localTime.getUTCHours();
  const minutes = localTime.getUTCMinutes();

  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  const strTime = `${hours}:${formattedMinutes} ${ampm}`;

  return strTime;
}

// function for calculate current balance x = current_account
const current_balance = function (x) {
  // here reduce method will return only one value and that is sum of all elements
  let sum = x.movements.reduce((sum, value) => sum + value, 0);
  // to fix metod get x digit after point
  return sum.toFixed(2) + "$";
};

// function for display the summary
const display_summary = function (x) {
  const caldiposit = x.movements
    .filter((ele) => ele > 0)
    .reduce((sum, ele) => sum + ele);
  labelSumIn.textContent = caldiposit.toFixed(2) + "$";

  const calwith = x.movements
    .filter((ele) => ele < 0)
    .reduce((sum, ele) => sum + ele);
  labelSumOut.textContent = calwith.toFixed(2) + "$";

  const calinterest =
    caldiposit.toFixed(2) * (current_account.interestRate / 100);
  labelSumInterest.textContent = calinterest.toFixed(2) + "$";
};
// fucntion to add current_account row on dashboard
const addnewrow = function (movements) {
  containerMovements.textContent = "";
  movements.forEach(function (element, index) {
    let check = element > 0 ? "deposit" : "withdrawal";
    const nowww = new Date(current_account.movementsDates[index]);
    const year = nowww.getFullYear();
    const month = nowww.getMonth() + 1;
    const day = nowww.getDate();
    let string = `${day}/${month}/${year}`;
    const strtime = formatDateTo12Hour(current_account.movementsDates[index]);
    const html = `
          <div class="movements__row">
              <div class="index">${index + 1}.</div>
            <div class="movements__type movements__type--${check}"> ${check}</div>
            <div class="movements__date">${string}</div>
            <div class="time">${strtime}</div>
            <div class="movements__value">${element.toFixed(2)}$</div>
          </div>
      `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const transfermoney = function (e) {
  // prevent from reload
  e.preventDefault();

  // get account name from user
  let acc_name = inputTransferTo.value;
  // get money amount from user and convert in into number
  let money = Number(inputTransferAmount.value);

  // calculate current balance and it will return '1234$' so remove dollar and convert rest into number
  const str = current_balance(current_account).slice(0, -1);
  if (username.includes(acc_name) && Number(str) - money > 0) {
    // add money to current account
    current_account.movements.push(-money);

    // add money to transfered account
    accounts.at(username.indexOf(acc_name)).movements.push(money);

    // add current date to movementsDay
    const now = new Date();
    console.log(now);
    current_account.movementsDates.push(now);
    accounts.at(username.indexOf(acc_name)).movementsDates.push(now);

    // add new row to current account
    addnewrow(current_account.movements);

    // update current balance
    labelBalance.textContent = current_balance(current_account);

    // set button values to default
    inputTransferTo.value = "";
    inputTransferAmount.value = "";
  } else {
    inputTransferTo.value = "";
    inputTransferAmount.value = "";
    // display message error ***********pending
    console.log("enter valid details");
  }
  display_summary(current_account);
};

const close_account = function (e) {
  e.preventDefault();
  const acc_name = inputCloseUsername.value;
  const piin = Number(inputClosePin.value);
  const index = accounts.indexOf(current_account);

  const uname = username.at(accounts.indexOf(current_account));

  if (uname === acc_name && piin === current_account.pin) {
    accounts.splice(accounts.indexOf(current_account), 1);
    username.splice(index, 1);
    document.querySelector(".app").style.opacity = 0;
    window.scroll({
      left: window.pageXOffset - window.pageXOffset,
      top: window.pageYOffset - window.pageYOffset,
      behavior: "smooth",
    });
    labelWelcome.textContent = "Log in to get started";
  }
  inputCloseUsername.value = "";
  inputClosePin.value = "";
};

// approval for loan
// condition for loan is that if any transaction is any deposit is greter than 10% of request
const loanapproval = function () {
  event.preventDefault();
  const flag = current_account.movements.some(
    (ele) => ele > Number(inputLoanAmount.value) * 0.1
  );
  if (flag) {
    current_account.movements.push(Number(inputLoanAmount.value));
    labelBalance.textContent = current_balance(current_account);
    const now = new Date();
    current_account.movementsDates.push(now);
    addnewrow(current_account.movements);
    display_summary(current_account);
  }
  inputLoanAmount.value = "";
};

// method for sort values
// const duplicate = current_account.movements;
// const sortvalues = function (x) {
//   if (sorted) {
//     addnewrow(duplicate);
//     sorted = false;
//   } else {
//     x.movements.sort(function (a, b) {
//       return a - b;
//     });
//     console.log(x.movements);
//     addnewrow(x.movements);
//     sorted = true;
//   }
// };

// make alternate column colorfull
const makecolorfull = function () {
  [...document.querySelectorAll(".movements__row")].forEach(function (row, i) {
    if (i % 2 == 0) {
      row.style.backgroundColor = "#f3f7b0";
    }
  });
};

// timer function
let tick;
let flag = true;
const logouttimer = function () {
  clearTimeout(tick);
  let time = 300;
  labelTimer.textContent = "";
  tick = function () {
    let min = String(Math.trunc(time / 60)).padStart(2, 0);
    let sec = String(time % 60).padStart(2, 0);

    labelTimer.textContent = `${min}:${sec}`;
    time--;

    if (time == 0) {
      clearInterval(timerr);
      document.querySelector(".app").style.opacity = 0;
      window.scroll({
        left: window.pageXOffset - window.pageXOffset,
        top: window.pageYOffset - window.pageYOffset,
        behavior: "smooth",
      });
      labelWelcome.textContent = "Log in to get started";
    }
  };

  const timerr = setInterval(tick, 1000);
  // tick = true;
};

const successfullyLogin = function (e) {
  // prevent from reload
  e.preventDefault();

  // display current date
  const now = new Date();
  document.querySelector(".date").textContent = `${now.getDate()}/${
    now.getMonth() + 1
  }/${now.getFullYear()}`;
  console.log(now);
  // get username and password from user
  let usernamee = String(inputLoginUsername.value);
  let passwordd = inputLoginPin.value;

  if (username.includes(usernamee)) {
    let index = username.indexOf(usernamee);
    if (accounts.at(index).pin === Number(passwordd)) {
      if (flag) {
        logouttimer();
        flag = false;
      }
      document.querySelector(".app").style.opacity = 100;
      inputLoginUsername.value = null;
      inputLoginPin.value = null;
      current_account = accounts.at(index);
      labelWelcome.textContent = `Welcome back , ${
        current_account.owner.split(" ")[0]
      }`;
      addnewrow(current_account.movements);
      labelBalance.textContent = current_balance(current_account);
      display_summary(current_account);

      btnTransfer.addEventListener("click", transfermoney);

      btnClose.addEventListener("click", close_account);

      btnLoan.addEventListener("click", loanapproval);

      // btnSort.addEventListener("click", sortvalues(current_account));

      labelBalance.addEventListener("click", makecolorfull);
    } else {
      inputLoginUsername.value = null;
      inputLoginPin.value = null;
    }
  } else {
    inputLoginUsername.value = null;
    inputLoginPin.value = null;
  }
};
document
  .querySelector(".login__btn")
  .addEventListener("click", successfullyLogin);
