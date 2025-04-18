# Bankist Website

## Overview

Bankist is a simple banking application that allows users to manage their accounts, transfer money, request loans, and close accounts. This project demonstrates various JavaScript functionalities, including DOM manipulation, event handling, and basic financial calculations.

## Features

- **User Authentication**: Users can log in using their username and PIN.
- **Account Summary**: Display the current balance, summary of deposits, withdrawals, and interest earned.
- **Money Transfer**: Transfer money to other users' accounts.
- **Loan Request**: Request a loan based on the deposit criteria.
- **Close Account**: Close the user account by providing the correct username and PIN.
- **Transaction History**: View a list of all transactions with dates and times.
- **Auto Logout**: Automatically log out the user after a period of inactivity.

## Data Structure

The application uses an array of objects to represent user accounts. Each account object contains the following properties:

- `owner`: The name of the account owner.
- `movements`: An array of transaction amounts.
- `interestRate`: The interest rate for the account.
- `pin`: The account's PIN for authentication.
- `movementsDates`: An array of dates corresponding to each transaction.

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, etc.)
- Basic knowledge of HTML, CSS, and JavaScript

### Usage

1. Open the `index.html` file in your web browser.
2. Log in with one of the predefined accounts:
   - Username: `Rana`, PIN: `1111`
   - Username: `Raj`, PIN: `2222`
   - Username: `Meet`, PIN: `3333`
   - Username: `Tirth`, PIN: `4444`

### Functionality

- **Login**: Enter the username and PIN to log in.
- **Transfer Money**: Enter the recipient's username and the amount to transfer.
- **Request Loan**: Enter the loan amount to request a loan (must meet deposit criteria).
- **Close Account**: Enter the username and PIN to close the account.
- **Sort Transactions**: Click on the balance label to highlight transactions.

### Example Code

Here's a brief overview of some key functions:

- **Format Date to 12-Hour Format**:

  ```javascript
  function formatDateTo12Hour(isoString) {
    // Code for formatting date
  }
  ```

- **Calculate Current Balance**:

  ```javascript
  const current_balance = function (x) {
    let sum = x.movements.reduce((sum, value) => sum + value, 0);
    return sum.toFixed(2) + "$";
  };
  ```

- **Display Summary**:

  ```javascript
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
  ```

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request.
