import API from '@/helpers/api';
import { IResponsePagination, Config } from '@/types/api';
import daoControllerABI from '@/abi/daoControllerABI';
import {
    IFollower,
    IPaginationParams
} from '@/types/services/FollowerService';
import {
    IDaoPath,
} from '@/types/services/DaoService';



export default class FollowerService {
    static async fetchFollowers(path: IDaoPath, params: IPaginationParams) {
        const [data, ...rest] = await API.get<IResponsePagination<IFollower>>(`/${ path.network }/dao/${ path.address }/followers`, params);

        await Promise.all(data?.items.map(async item => {
            await Promise.all([
                FollowerService.fetchVotingPower(item.address, path.address)
                    .then(result => item.votingPower = result[0] || 0),
                API.provider.lookupAddress(item.address)
                    .then((result: string) => item.name = result)
            ]);
        }) || []);

        return [data, ...rest] as const;
    }

    static async fetchVotingPower(address: string, contractAddress: string) {
        return API.getFromChain<number>({
            contractAddress,
            params: [address],
            contractABI: daoControllerABI,
            methodName: 'votingPowerOf'
        });
    }

    static async followDao(path: IDaoPath, config: Config) {
        return API.post<never>(`/${ path.network }/dao/${ path.address }/follow`, {}, config);
    }

    static async unFollowDao(path: IDaoPath, config: Config) {
        return API.delete<never>(`/${ path.network }/dao/${ path.address }/follow`, config);
    }
}
