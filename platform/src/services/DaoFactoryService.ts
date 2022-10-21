import API from '@/helpers/api';
import DaoFactoryJSON from '@/abi/DaoFactory.json';

export default class DaoFactoryService {
    static async createDao(params: object): Promise<any> {
        const api = new API();
        const address =  (await api.eth.getAccounts())[0];
        const contract = new api.eth.Contract(JSON.parse(JSON.stringify(DaoFactoryJSON)), process.env.VUE_APP_DAO_FACTORY_ADDRESS);
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
