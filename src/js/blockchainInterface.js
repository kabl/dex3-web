import Web3 from 'web3';
import erc20abi from '../abi/erc20abi';
import dex3Abi from '../abi/dex3';

var web3 = new Web3(window.ethereum || "ws://localhost:8545");

window.ethereum.enable().then(function (addresses) {
    console.log("Your Address:", addresses[0]);
});

var blockchain = {

    getDex3Addr() {
        return "0xd9cfCeedE09a5273923f0B758bC4276a8647d3CE";
    },

    getWeb3() {
        return web3;
    },

    showMessage() {
        console.log("Message");
    },

    async getERC20Instance(address) {
        var coinbase = await web3.eth.getCoinbase();
        console.log("Coinbase:", coinbase);
        var erc20Instance = new web3.eth.Contract(erc20abi, address, {
            from: coinbase, // default from address
            gasPrice: "20000000000" // default gas price in wei, 20 gwei in this case
        });

        return erc20Instance;
    },

    async getPersonalTokenInfo(tokenaddress) {
        var coinbase = await web3.eth.getCoinbase();
        var erc20Instance = await blockchain.getERC20Instance(tokenaddress);
        var balance = await erc20Instance.methods.balanceOf(coinbase).call();
        var name = await erc20Instance.methods.name().call();
        var symbol = await erc20Instance.methods.symbol().call();
        var dexAllowance = await erc20Instance.methods
            .allowance(coinbase, blockchain.getDex3Addr())
            .call();

        var erc20 = {
            address: tokenaddress,
            name: name,
            symbol: symbol,
            balance: balance,
            dexAllowance: dexAllowance
        };

        return erc20;
    },
    async dexAllow(erc20address, balanceToApprove) {
        console.log("dexAllow", blockchain);
        var erc20 = await blockchain.getERC20Instance(erc20address);
        await erc20.methods.approve(blockchain.getDex3Addr(), balanceToApprove).send();
    },
    async dexDeny(erc20address) {
        console.log("dexDeny", blockchain);
        var erc20 = await blockchain.getERC20Instance(erc20address);
        await erc20.methods.approve(blockchain.getDex3Addr(), 0).send();
    },

    async getDex3Instance() {
        var coinbase = await web3.eth.getCoinbase();
        console.log("Coinbase:", coinbase);
        var dex3Instance = new web3.eth.Contract(dex3Abi, blockchain.getDex3Addr(), {
            from: coinbase, // default from address
            gasPrice: "20000000000" // default gas price in wei, 20 gwei in this case
        });

        return dex3Instance;
    },

    async getDex3BaseToken() {
        var dex3 = await blockchain.getDex3Instance();
        var baseTokenAddr = await dex3.methods.getBaseToken().call();
        return await blockchain.getPersonalTokenInfo(baseTokenAddr);
    },

    async calcHash(order) {
        var dex3 = await blockchain.getDex3Instance();
        var hash = await dex3.methods.createMakerHash(order.token,
            order.amount,
            order.price,
            order.ttl,
            order.isSellOrder,
            order.partialFillAllowed).call();
        if (hash == null) {
            console.error("Failed to generate hash");
        }

        return hash;
    },

    async signHash(hash) {
        var coinbase = await web3.eth.getCoinbase();
        var sig = await web3.eth.personal.sign(hash, coinbase);
        return sig;
    },

    async fillOrder(order, takerAmount) {
        var dex3 = await blockchain.getDex3Instance();
        var result = await dex3.methods.exchange(
            order.token,
            order.amount,
            order.price,
            order.ttl,
            order.isSellOrder,
            order.partialFillAllowed,
            order.sig,
            takerAmount
        ).send();
    
        console.dir(result);
    }
}


export default blockchain