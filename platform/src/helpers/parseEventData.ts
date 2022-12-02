import camelize from '@/helpers/camelize';
import web3Abi from 'web3-eth-abi';

function parseEventData({ JSON = [{}], eventName = '', trxReceipt = {} }) {
    //@ts-ignore
    const methodInputs = JSON.find(item => item.name === eventName)!
        //@ts-ignore
        .inputs.map(item => ({ name: item.name, indexed: item.indexed, type: item.type }));
    const result = web3Abi.decodeLog(
        methodInputs,
        //@ts-ignore
        trxReceipt.logs[0].data,
        //@ts-ignore
        trxReceipt.logs[0].topics.slice(1)
    );

    return camelize(result);
}

export default parseEventData;
