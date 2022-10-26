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

    static async createSubDao(params: any): Promise<any> {
        const [trxReceipt, error] = await API.send<any>({
            contractName: 'daoFactory',
            methodName: 'deployDao',
            params: [API.address, 1, 1, params.parentDaoAddress],
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
