import API from '@/helpers/api';

export default class DaoFactoryService {
    static async createDao(params: object): Promise<any> {
        const api = new API();
        const address =  (await api.eth.getAccounts())[0];
        const contract = API.contracts.daoFactory;
        const trx = await contract.methods.deployDao(address, 1, 1, address).send({ from: address });
        console.log(trx);
        const trxReceipt = await api.eth.getTransactionReceipt(trx.transactionHash);
        console.log(trxReceipt.logs);



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
