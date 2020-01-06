import store from '../store'
import blockchain from './blockchainInterface'

var events = {

    eventListener(error, result) {
        if (error) {
            console.error("Event Err: " + error);
        }
        console.log("Event1: " + result.address);
        console.log("Event2: " + result.event);

        store.dispatch("updateToken", result.address);
    },

    async registerERC20Events(address) {
        const erc20Instance = await blockchain.getERC20Instance(address);
        const contractEvents = erc20Instance.events;
        contractEvents.allEvents(this.eventListener);
    }
}

export default events;