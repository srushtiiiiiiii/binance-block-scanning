const Web3 = require('web3');

class TransactionChecker {
    web3;
    account;

    constructor(BSCSCAN_ENDPOINT, account) {
        this.web3 = new Web3(new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/'));
        
        this.account = account.toLowerCase();
    }

    async checkBlock() {
        let block = await this.web3.eth.getBlock('latest');
        let number = block.number;
        console.log('Searching block ' + number);

        if (block && block.transactions ) {
            for (let txHash of block.transactions) {
                let tx = await this.web3.eth.getTransaction(txHash);
                
                    console.log('Transaction found on block: ' + number);
                    console.log({from: tx.from, to:tx.to,transactionHash:txHash, value: this.web3.utils.fromWei(tx.value, 'ether'),  timestamp: new Date()});
                
            }
        }
    }
}

let txChecker = new TransactionChecker(process.env.BSCSCAN_ID, '0xe1Dd30fecAb8a63105F2C035B084BfC6Ca5B1493');
setInterval(() => {
    txChecker.checkBlock();
}, 15 * 1000);

