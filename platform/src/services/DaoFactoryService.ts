import API, { FetchResult } from '@/helpers/api';
import parseEventData from '@/helpers/parseEventData';
import DaoFactoryJSON from '@/abi/DaoFactory.json';

export default class DaoFactoryService {
    static async createDao(params: object): FetchResult<any> {
        const [trxReceipt, error] = await API.send<any>({
            contractName: 'daoFactory',
            methodName: 'deployDao',
            params: [API.address, 1, 1, API.address],
            needReceipt: true
        });

        if (error) {
            return [null, error];
        }

        const result = parseEventData({
            JSON: DaoFactoryJSON,
            eventName: 'DaoCreated',
            trxReceipt
        });

        return [result, null];
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
