const SHA256 = require("crypto-js/sha256");

class Transaction {
	constructor(fromAddress, toAddress, amount) {
		this.fromAddress = fromAddress;
		this.toAddress = toAddress;
		this.amount = amount;
	}
}
class Block {
	constructor(timestamp, transactions, previousHash = "") {
		this.previousHash = previousHash;
		this.timestamp = timestamp;
		this.transactions = transactions;
		this.hash = this.calculateHash();
		this.nonce = 0;
	}

	calculateHash() {
		return SHA256(
			this.previousHash +
				this.timestamp +
				JSON.stringify(this.transactions) +
				this.nonce
		).toString();
	}

	mineBlock(difficulty) {
		while (
			this.hash.substring(0, difficulty) !==
			Array(difficulty + 1).join("0")
		) {
			this.nonce++;
			this.hash = this.calculateHash();
		}

		console.log("Block mined: " + this.hash);
	}
}

class Blockchain {
	constructor() {
		this.chain = [this.createGenesisBlock()];
		this.difficulty = 4;
		this.pendingTransactions = [];
		this.miningRewad = 100;
	}

	createGenesisBlock() {
		return new Block("01/01/2021", "Genesis block", "0");
	}

	getLatestBlock() {
		return this.chain[this.chain.length - 1];
	}

	minePendingTransactions(miningRewadAddress) {
		let block = new Block(
			Date.now(),
			this.pendingTransactions,
			this.getLatestBlock().hash
		);
		block.mineBlock(this.difficulty);

		console.log("Block successfully mined!");
		this.chain.push(block);

		this.pendingTransactions = [
			new Transaction(null, miningRewadAddress, this.miningRewad),
		];
	}

	createTransaction(transaction) {
		this.pendingTransactions.push(transaction);
	}

	getBalanceOfAddress(address) {
		let balance = 0;

		for (const block of this.chain) {
			for (const trans of block.transactions) {
				if (trans.fromAddress === address) {
					balance -= trans.amount;
				}

				if (trans.toAddress === address) {
					balance += trans.amount;
				}
			}
		}

		return balance;
	}

	isChainValid() {
		for (let i = 1; i < this.chain.length; i++) {
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i - 1];

			if (currentBlock.hash !== currentBlock.calculateHash()) {
				return false;
			}

			if (currentBlock.previousHash !== previousBlock.hash) {
				return false;
			}
		}

		return true;
	}
}

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
