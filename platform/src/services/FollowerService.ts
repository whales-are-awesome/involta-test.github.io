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
    static sample = {
        fetchVotingPower(address: string, contractAddress: string) {
            return API.getFromChain<number>({
                contractAddress,
                params: [address],
                contractABI: daoControllerABI,
                methodName: 'votingPowerOf'
            });
        }
    }

    static sampleItems = {
        fetch(path: IDaoPath, params: IPaginationParams) {
            async function raw() {
                const [data, ...rest] = await API.get<IResponsePagination<IFollower>>(`/${ path.network }/dao/${ path.address }/followers`, params);

                await Promise.all(data?.items.map(async item => {
                    await Promise.all([
                        FollowerService.sample.fetchVotingPower(item.address, path.address)
                            .then(result => item.votingPower = result[0] || 0),
                        API.lookupAddress(item.address)
                            .then((result: string) => item.name = result)
                    ]);
                }) || []);

                return [data, ...rest] as const;
            }

            return {
                raw
            }
        },
    }
}
