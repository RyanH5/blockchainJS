const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
  }

  mineBlock(difficulty) {
    while(this.hash.substring(0, difficulty) != Array(difficulty + 1).join('0')) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log('BLOCK MINED: ' + this.hash)
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
  }

  createGenesisBlock() {
    return new Block(0, "01/01/2017", "Genesis Block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty);    
    this.chain.push(newBlock);
  }

  isChainValid() {
    for(let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i -1];

      if(currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if(currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}

let savjeeCoin = new Blockchain();
savjeeCoin.addBlock(new Block(1, '10/17/2017', { amount: 4}));
savjeeCoin.addBlock(new Block(2, "12/07/2017", { amount: 4}))


// THIS SHOWS THE BLOCKCHAIN PRETTY
// console.log(JSON.stringify(savjeeCoin, null, 4))

// THIS SHOWS THE BLOCKCHAIN VALIDATED
// console.log('Is block chain valid', savjeeCoin.isChainValid());

// THIS ALTERS THE DATA IN  BLOCK
// savjeeCoin.chain[1].data = { amount: 100 }

// THIS CALCULATES A NEW HASH FOR BLOCK[1]
// savjeeCoin.chain[1].hash = savjeeCoin.chain[1].calculateHash();

// THIS SHOWS THE BLOCKCHAIN INVALID AFTER ALTERING BLOCK[1] OR GIVING BLOCK[1] NEW HASH
// console.log('Is block chain valid', savjeeCoin.isChainValid());

// +++++++++++++++++++++++++ PROOF OF WORK VIDEO+++++++++++++++++++++++++

console.log('MINING BLOCK 1...');
savjeeCoin.addBlock(new Block(1, "20/07/2017", { amount: 5 }))

console.log('MINING BLOCK 2...');
savjeeCoin.addBlock(new Block(1, "20/07/2017", { amount: 10 }))
