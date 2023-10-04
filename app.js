const balance = document.getElementById("balance");
const inflow = document.getElementById("income");
const outflow = document.getElementById("expense");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// Get transaction from local storage
const localStorageTransactions = JSON.parse(localStorage.getItem("transactions"));

let transactions = 
localStorage.getItem("transactions") !== null ?
localStorageTransactions : [];

//Add transaction function

function addTransaction(e){
       e.preventDefault();
       //conditional if the fields are empty or not
       if(text.value.trim() === "" || amount.value.trim() === ""){
        document.getElementById("error_msg").innerHTML = "<span> Error. Enter text and amount first </span>";
        setTimeout(
            () => (document.getElementById("error_msg").innerHTML = ""),
            5000
        );
        }else{
          const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value, 
          };

          transactions.push(transaction);
          
          //Add transaction to document object model DOM - for local storage
          addTransactionDOM(transaction);
          //update the values
          updateValues();
          //update local storage
          updateLocalStorage();
          // set text and amount to
          text.value = "";
          amount.value = "";
       }
}

// Generate random ID for delete button

function generateID(){
    return Math.floor(Math.random() * 10000000);
}

// Transaction History
function addTransactionDOM(transaction) {
//Sign (+ or -)
   const sign = transaction.amount < 0 ? "-" : "+"
   const item = document.createElement("li");

//Add list element based on the sign
   item.classList.add(transaction.amount < 0 ? "minus" : "plus");

//Rendering the list element with delete button
   item.innerHTML = `${transaction.text} ${sign} ${Math.abs(transaction.amount)}

   <button
   class="delete-btn"
   onclick="removeTransaction($ {transaction.id})"
   X 
   </button>`;

  list.appendChild(item);
}

// Update the balance  
function updateValues (){
    const amounts = transactions.map((transaction) => transaction.amount);
    const total = amounts.reduce((bal, value) => (bal += value), 0);
    const income = amounts
    .filter((value) => value > 0)
    .reduce((bal, value) => (bal += value), 0);
    const expense = amounts
    .filter((value) => value < 0)
    .reduce((bal, value) => (bal += value), 0 * (-1));

    //displaying balance inflow and outflow                                                                                         
    balance.innerText = `$${total}`;
    inflow.innerText = `$${income}`;
    outflow.innerText = `$${expense}`;    
}


// Remove transaction by ID
function removeTransaction(id){
    transactions = transactions.filter((transaction) => transaction.id !== id);

    //update storage after removing
    updateLocalStorage();
    //need to start the whole app
    start();
}

// Update local storage function
function updateLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify
    (transactions));
}

// Starting the application
function start() {
    list.innerHTML = "";
    transactions.forEach(addTransactionDOM);
    updateValues();      
 
}

//invoke the start function
start(); 

form.addEventListener("submit", addTransaction)