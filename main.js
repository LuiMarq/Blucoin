const { Blockchain, Transaction } = require("./blockchain");

// Create a new instance of the Blockchain class
let luCoin = new Blockchain();

// Create first transaction
luCoin.createTransaction(new Transaction("address1", "address2", 100));

// Create second transaction
luCoin.createTransaction(new Transaction("address2", "address1", 60));

// Mine block
console.log("\nStarting the miner...");
luCoin.minePendingTransactions("mine-addrress");
console.log(
	`\nBalance of mine-addrress: ${luCoin.getBalanceOfAddress("mine-addrress")}`
);

// Mine block of the reward transaction
console.log("\nStarting the miner again...");
luCoin.minePendingTransactions("mine-addrress");
console.log(
	`\nBalance of mine-addrress: ${luCoin.getBalanceOfAddress("mine-addrress")}`
);

// Test of tempering with the chain
// luCoin.chain[1].transactions[0].amount = 9999;

// Check if the chain is valid
console.log("\nBlockchain valid?", luCoin.isChainValid() ? "Yes" : "No");

// console.log("\n", luCoin.chain);
