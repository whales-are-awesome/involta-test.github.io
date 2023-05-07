enum Networks {
    Polygon = 'polygon',
    Goerli = 'goerli'
}

type NetworksType = 'polygon' | 'goerli';

enum NetworksChains {
    Polygon = '0x89',
    Goerli = '0x5'
}

const networksChains: Record<NetworksType, NetworksChains> = {
    polygon: NetworksChains.Polygon,
    goerli: NetworksChains.Goerli
}

type NetworksChainsType = '0x89' | '0x5';


export {
    Networks,
    NetworksChains,
    networksChains,
    NetworksType,
    NetworksChainsType
}
