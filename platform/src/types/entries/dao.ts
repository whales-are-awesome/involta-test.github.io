import { NetworksType } from '@/types/networks';

interface IPathItem {
    name: string
    address: string
}

interface IDaoAPI {
    owner: string
    address: string
    creationTx: string
    followersAmount: number
    isFollowed: boolean
    network: NetworksType
    parentDao: string
    rootDao: string
    creator: string
    name: string
    description: string
    link: string
    image: string
    path: IPathItem[]
}

interface IDaoChain {

}

export {
    IDaoAPI,
    IDaoChain
}
