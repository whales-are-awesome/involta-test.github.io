import API from '@/helpers/api';
import parseEventData from '@/helpers/parseEventData';
import DaoFactoryJSON from '@/abi/DaoFactory.json';

export default class DaoFactoryService {
    static async createDao(params: object): Promise<any> {
        const contract = API.contracts.daoFactory;
        const trx = await contract.methods.deployDao(API.address, 1, 1, API.address).send({ from: API.address });
        const trxReceipt = await API.eth.getTransactionReceipt(trx.transactionHash);
        const result = parseEventData({
            JSON: DaoFactoryJSON,
            eventName: 'DaoCreated',
            trxReceipt
        });

        console.log(result);

        return result;
    }

    static async createSubDao(params: object): Promise<any> {
        const contract = API.contracts.daoFactory;
        const trx = await contract.methods.deployDao(API.address, 1, 1, API.address).send({ from: API.address });
        const trxReceipt = await API.eth.getTransactionReceipt(trx.transactionHash);

        // totalCompanies.value = +(await contract.value.methods.totalCampaigns().call());
    }
    // static fetchCompany(config?: RequestConfig): Promise<any> {
    //     return api.get('/api/companies', config);
    // }
    //
    // static normalizeCompanyAsDefault(data: ICompany): any {
    //     return {
    //         ...data
    //     };
    // }
}
