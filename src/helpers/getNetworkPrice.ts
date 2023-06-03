import axios from 'axios';
import { NetworksType, NetworksCurrency, networksCurrencies } from '@/types/networks';


async function getNetworkPrice(network: NetworksType): Promise<number> {
    const currency: NetworksCurrency = networksCurrencies[network];

    const price = await axios('https://min-api.cryptocompare.com/data/price', {
        method: 'get',
        params: {
            fsym: currency,
            sign: true,
            tsyms: 'BTC,USD,EUR,AUD,CHF,CAD,GBP'
        }
    })

    return price?.data?.USD || 0;
}

export default getNetworkPrice;
