const transactionContainerEl = document.querySelector(".transaction-container");
// const transactionFormEl = document.querySelector(".transaction-form");
const transactionFormEl = document.getElementById("trans-form");
const inputEl = document.querySelector(".input-container");
let textInput = document.querySelector("#text");
let AmountInput = document.querySelector("#amount");
// const transactionContainer=document

let isUpadte = false;
let UpdateId;

const state = {
	earning: 0,
	expense: 0,
	net: 0,
	transactions: [
		{
			id: 5,
			text: 'demo',
			amount: 500,
			type:'credit',
		},
		{
			id: 6,
			text: 'demo debit',
			amount: 400,
			type:'debit',
		}
	],
}
const renderTransaction = () => {
	const netAmountEl = document.querySelector("#balance");
	const earnEl = document.querySelector("#earning");
	const expenseEl = document.querySelector("#expense");

	const transactions = state.transactions;
	
	let earning = 0;
	let net = 0;
	let expense = 0;
	transactionContainerEl.innerHTML = "";
	transactions.forEach((transaction) => {
		const { id, type, amount, text } = transaction;
		const isCredit = type === "earn" ? true : false;
		const sign = type === "earn" ? "+" : "-";
		const transactionEl = 
		`<div class="transaction" id="${id}">
				<div class="upper"  onClick="showedit(${id})">
				<div class="left">
				<p>${text}</p>
				<p>${sign}${amount}$</p>
			</div>
			<div class="right ${isCredit ? "credit" : "debit"}">
				${type == "earn" ? "C" : "D"}
			</div>
			</div>
				<div class="lower">
					<p><i class="fa fa-pencil edit" onClick="handelUpdate(${id})" ></i></p>
					<p><i class="fa fa-trash delete" onClick="handelDelete(${id})" ></i></p>
				</div>
			</div>`
		earning += isCredit ? amount : 0;
		expense += !isCredit ? amount : 0;
		net = earning - expense;




		transactionContainerEl.insertAdjacentHTML("afterbegin", transactionEl);
		

	});
	netAmountEl.innerHTML = `${net}$`;
	earnEl.innerHTML = `${earning}$`;
	expenseEl.innerHTML = `${expense}$`;

}


const addTransaction = (e) => {
	e.preventDefault();
	// console.log("harshit");
	console.log(e.submitter.id);
	const isEarn = e.submitter.id === "earn" ? true : false;
	console.log(isEarn);


	// const Data = new FormData(transactionFormEl);
	// console.log(Data);
	// Data.forEach((value,key) => {
	// 	tData[value] = key;
	// })
	// console.log({tData});
	const tData = {};
	const textValue = textInput.value;
	const amountValue = parseInt(AmountInput.value);
	tData[textValue] = amountValue;
	console.log({ tData });
	// console.log(textValue, amountValue);
	const { text, amount } = tData;
	console.log(text);
	const transaction = {
		id: isUpadte? UpdateId: (new Date).getTime(),
		text: textValue,
		amount: amountValue,
		type: isEarn ? "earn" : "expense",
	}

	if (isUpadte) {
		const Tindex = state.transactions.findIndex((t) => t.id === UpdateId);
		console.log(Tindex);
		state.transactions[Tindex] = transaction;
		isUpadte = false;
		UpdateId = null;
	}
	else {
		state.transactions.push(transaction);
	}
	transactionFormEl.reset();
	console.log({ state });
	renderTransaction();
	// textInput.value = text;
	// AmountInput.value = amount;

}


const showedit = (id) => {
	console.log(id);
	const selectedTransaction = document.getElementById(id);
	console.log(selectedTransaction);
	// const lowerEl = selectedTransaction.parentElement.nextElementSibling;
	// console.log(lowerEl);
	const lowerEl = selectedTransaction.querySelector(".lower");

	lowerEl.classList.toggle("showIcon");

}
const handelUpdate = (id) => {
	const transaction = state.transactions.find((t) => t.id === id);
	console.log(transaction);
	const { text, amount } = transaction;
	textInput.value = text;
	AmountInput.value = amount;

	UpdateId = id;
	isUpadte = true;
	console.log(id, typeof (id));


}
const handelDelete = (id) => {
	const filterTransaction = state.transactions.filter((t) => t.id !== id);

	state.transactions = filterTransaction;
	renderTransaction();
}

// transactionContainerEl.addEventListener("click", (e) => {
// 	console.log(e.target.parentElement.nextElementSibling);
// 	const lower = e.target.parentElement.nextElementSibling;
// 	if (lower.classList.contains("lower")) {
// 		lower.classList.toggle("showIcon");
// 		const transactionEL = e.target.parentNode.parentNode;
// 		console.log(transactionEL);
// 		// const transactionId = e.currentTarget.parentElement.parentElement.id;
// 		// console.log(transactionId);
// 	};
// })




renderTransaction();
transactionFormEl.addEventListener("submit", addTransaction);