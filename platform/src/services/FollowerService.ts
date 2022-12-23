import API from '@/helpers/api';
import { IResponsePagination, Config } from '@/types/api';
import {
    IFollower,
    IPaginationParams
} from '@/types/services/FollowerService';
import {
    IDaoPath,
} from '@/types/services/DaoService';



export default class DaoService {
    static async fetchFollowers(path: IDaoPath, params: IPaginationParams) {
        const [data, ...rest] = await API.get<IResponsePagination<IFollower>>(`/${ path.network }/dao/${ path.address }/followers`, params);

        await Promise.all(data?.items.map(async item => {
            item.name = await API.provider.lookupAddress(item.address);
        }) || []);

        return [data, ...rest] as const;
    }

    static async followDao(path: IDaoPath, config: Config) {
        return API.post<never>(`/${ path.network }/dao/${ path.address }/follow`, {}, config);
    }
}
