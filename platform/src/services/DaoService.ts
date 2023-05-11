import API from '@/helpers/api';
import daoControllerABI from '@/abi/daoControllerABI';
import cutAddress from '@/helpers/cutAddress';
import addSpacesToNumber from '@/helpers/addSpacesToNumber';
import cropPercents from '@/helpers/cropPercents';
import { IResponsePagination, Config, IPaginationParams } from '@/types/api';
import {
    IDao,
    IDaoPath,
    INormalizedDaoAsDefault,
    ICreateDaoParams,
    ICreateDaoResponse,
    IChangeDaoParams,

    INormalizedSubDaoItemAsDefault,
    ISubDaoItem,
    ISubDaoItemQuery,

    IFollower,

    IDaoItem,
    IDaoItemParams,
    INormalizedDaoItemAsTable,
} from '@/types/services/DaoService';
import { store } from '@/store';
import { NetworksType } from '@/types/networks';

export default class DaoService {
    static chain = {
        fetchVotingPower(address: string, contractAddress: string) {
            return API.getFromChain<number>({
                contractAddress,
                params: [address],
                contractABI: daoControllerABI,
                methodName: 'votingPowerOf'
            });
        },

        fetchTotalVotingPower(contractAddress: string) {
            return API.getFromChain<number>({
                contractAddress,
                params: [],
                contractABI: daoControllerABI,
                methodName: 'totalVotingPower'
            });
        },
        createDao(params: ICreateDaoParams) {
            return API.sendChain<ICreateDaoResponse>({
                contractName: 'daoFactory',
                methodName: 'deployDao',
                network: params.network,
                params: [
                    +params.proposalExpirationTime,
                    +params.quorumRequired,
                    params.parentRegistry,
                    params.name,
                    params.governanceTokenSupply,
                    params.governanceTicker
                ]
            });
        },
    }

    static sample = {
        fetch(path: IDaoPath) {
            async function raw() {
                const [votingPower] = await DaoService.chain.fetchVotingPower(store.state.wallet.address!, path.address);

                const [data, error] = await API.get<IDao>(`/${ path.network }/dao/${ path.address }`);

                return [{ ...data, votingPower: +votingPower! } as IDao, error, () => {}] as const;
            }

            async function def() {
                const [data, ...rest] = await raw();

                return [data && normalizeDaoAsDefault(data), ...rest] as const;
            }

            return {
                raw,
                default: def
            };
        },

        change(path: IDaoPath, params: IChangeDaoParams, config: Config) {
            return API.put<never>(`/${ path.network }/dao/${ path.address }`, params, config);
        },

        create: DaoService.chain.createDao
    };

    static follow = {
        follow(path: IDaoPath, config: Config) {
            return API.post<never>(`/${ path.network }/dao/${ path.address }/follow`, {}, config);
        },

        unfollow(path: IDaoPath, config: Config) {
            return API.delete<never>(`/${ path.network }/dao/${ path.address }/follow`, config);
        }
    }

    static sampleItems = {
        fetch(params?: IDaoItemParams, network?: NetworksType) {
            async function raw() {
                return API.get<IResponsePagination<IDaoItem>>(`/${ network ? network + '/' : '' }dao`, params);
            }

            async function table() {
                const [data, ...rest] = await raw();

                return [data && normalizeDaoItemsAsTable(data), ...rest] as const;
            }

            return {
                raw,
                table
            };
        }
    }

    static subDaoItems = {
        fetch(path: IDaoPath, params: ISubDaoItemQuery) {
            async function raw() {
                return API.get<IResponsePagination<ISubDaoItem>>('/' + path.network + `/dao/${ path.address }` + `/subdao`, params);
            }

            async function def() {
                const [data, ...rest] = await raw();

                return [data && normalizeSubDaoItemsAsDefault(data), ...rest] as const;
            }

            return {
                raw,
                default: def
            };
        }
    }

    static followerItems = {
        fetch(path: IDaoPath, params: IPaginationParams) {
            async function raw() {
                const [data, ...rest] = await API.get<IResponsePagination<IFollower>>(`/${ path.network }/dao/${ path.address }/followers`, params);
                const [totalVotingPower] = (await DaoService.chain.fetchTotalVotingPower(path.address));

                await Promise.all(data?.items.map(async item => {
                    await Promise.all([
                        DaoService.chain.fetchVotingPower(item.address, path.address)
                            .then(result => {
                                item.tokens = result[0] || 0;
                                item.votingPower = cropPercents((item.tokens / (totalVotingPower || 0) * 100) || 0);
                            }),
                        API.lookupAddress(item.address)
                            .then((result: string) => item.name = result)
                    ]);
                }) || []);

                return [data, ...rest] as const;
            }

            return {
                raw
            };
        },
    }
}



function normalizeDaoAsDefault(data: IDao): INormalizedDaoAsDefault {
    return {
        ...data,
        fullName: data.name || cutAddress(data.address),
        path: data.path?.map(item => ({
            ...item,
            fullName: item.name || cutAddress(item.address),
        })),
        get followersAmountFormatted() {
            return addSpacesToNumber(this.followersAmount);
        }
    };
}

function normalizeDaoItemsAsTable(data: IResponsePagination<IDaoItem>): IResponsePagination<INormalizedDaoItemAsTable> {
    return {
        ...data,
        items: data.items.map(item => ({
            ...item,
            fullName: item.name || cutAddress(item.address),
            get followersAmountFormatted() {
                return addSpacesToNumber(this.followersAmount);
            }
        }))
    };
}

function normalizeSubDaoItemsAsDefault(data: IResponsePagination<ISubDaoItem>): IResponsePagination<INormalizedSubDaoItemAsDefault> {
    return {
        ...data,
        items: data.items.map(item => ({
            ...item,
            fullName: item.name || cutAddress(item.address),
            isHovered: false
        }))
    };
}
