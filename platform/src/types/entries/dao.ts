interface IPathItem {
    name: string
    address: string
}

interface IDaoAPI {
    address: string
    creationTx: string
    followersAmount: number
    isFollowed: boolean
    network: string
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
