const { Blockchain, Transaction } = require("./blockchain");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

const myKey = ec.keyFromPrivate(
	"f7fc47d4d091b02d4112f91127688aef428e893aca33ea11ca259bc095425ab0"
);
const myWalletAddress = myKey.getPublic("hex");

// Create a new instance of the Blockchain class
let luCoin = new Blockchain();

const tx1 = new Transaction(
	myWalletAddress,
	"public key of transaction receiver",
	10
);
tx1.signTransaction(myKey);
luCoin.addTransaction(tx1);

// Mine block
console.log("\nStarting the miner...");
luCoin.minePendingTransactions(myWalletAddress);
console.log(
	`\nBalance of miner-addrress: ${luCoin.getBalanceOfAddress(
		myWalletAddress
	)}`
);

// Mine block of the reward transaction
console.log("\nStarting the   again...");
luCoin.minePendingTransactions(myWalletAddress);
console.log(
	`\nBalance of miner-addrress: ${luCoin.getBalanceOfAddress(
		myWalletAddress
	)}`
);

// Test of tempering with the chain
// luCoin.chain[1].transactions[0].amount = 9999;

// Check if the chain is valid
console.log("\nBlockchain valid?", luCoin.isChainValid() ? "Yes" : "No");

// console.log("\n", luCoin.chain);
