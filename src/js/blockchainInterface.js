import Web3 from 'web3';
// import ethers from 'ethers'
import { ethers } from 'ethers';
import erc20abi from '../abi/erc20abi';
import dex3Abi from '../abi/dex3';

var web3 = new Web3(window.ethereum || "ws://localhost:8545");

window.ethereum.enable().then(function (addresses) {
    console.log("Your Address:", addresses[0]);
});

var blockchain = {

    getDex3Addr() {
        return "0x7bd8D3C2E363c157b50373840239dA24BC3F7d57";
    },

    getWeb3() {
        return web3;
    },

    async getERC20Instance(address) {
        var coinbase = await web3.eth.getCoinbase();
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
        var decimals = await erc20Instance.methods.decimals().call();
        var name = await erc20Instance.methods.name().call();
        var symbol = await erc20Instance.methods.symbol().call();
        var dexAllowance = await erc20Instance.methods
            .allowance(coinbase, blockchain.getDex3Addr())
            .call();

        const balanceHumanReadable = this.toHumanNumber(balance, decimals);
        const dexAllowanceHumanReadable = this.toHumanNumber(dexAllowance, decimals);

        var erc20 = {
            address: tokenaddress,
            name: name,
            symbol: symbol,
            balance: balance,
            dexAllowance: dexAllowance,
            decimals: decimals,
            balanceHumanReadable: balanceHumanReadable,
            dexAllowanceHumanReadable: dexAllowanceHumanReadable
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
        var dex3Instance = new web3.eth.Contract(dex3Abi, blockchain.getDex3Addr(), {
            from: coinbase, // default from address
            gasPrice: "20000000000" // default gas price in wei, 20 gwei in this case
        });

        return dex3Instance;
    },

    async getDex3BaseTokenAddr() {
        var dex3 = await blockchain.getDex3Instance();
        return await dex3.methods.getBaseToken().call();
    },

    async getDex3BaseToken() {
        var baseTokenAddr = await blockchain.getDex3BaseTokenAddr();
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
        console.log("Fill Order: ", order);
        console.log("Taker amount:", takerAmount)
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
    },

    toContractNumber(humanBalance, decimals) {
        const result = ethers.utils.parseUnits(humanBalance.toString(), parseInt(decimals));
        return result.toString(10);
    },

    toHumanNumber(balance, decimals) {
        return ethers.utils.formatUnits(balance, parseInt(decimals));
    }
}

export default blockchain