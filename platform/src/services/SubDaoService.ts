import API from '@/helpers/api';
import cutAddress from '@/helpers/cutAddress';
import { IResponsePagination } from '@/types/api';
import {
    ISubDaoItem,
    ISubDaoItemQuery,
    INormalizedSubDaoItemAsDefault
} from '@/types/services/SubDaoService';

import {
    IDaoPath
} from '@/types/services/DaoService';



export default class SubDaoService {
    static async fetchSubDaoItems(path: IDaoPath, params: ISubDaoItemQuery) {
        return API.get<IResponsePagination<ISubDaoItem>>('/' + path.network + `/dao/${ path.address }` + `/subdao`, params);
    }

    static async fetchSubDaoItemsAsDefault(path: IDaoPath, params: ISubDaoItemQuery) {
        const [data, ...rest] = await SubDaoService.fetchSubDaoItems(path, params);

        return [data && normalizeSubDaoItemsAsTable(data), ...rest] as const;
    }
}

function normalizeSubDaoItemsAsTable(data: IResponsePagination<ISubDaoItem>): IResponsePagination<INormalizedSubDaoItemAsDefault> {
    return {
        ...data,
        items: data.items.map(item => ({
            ...item,
            fullName: item.name || cutAddress(item.address),
            isHovered: false
        }))
    };
}
