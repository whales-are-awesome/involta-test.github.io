interface IPathItem {
    name: string
    address: string
}

interface IDao {
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

interface IDaoOnChain {

}
