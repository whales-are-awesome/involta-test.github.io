import API from '@/helpers/api';

async function isContract(address: string): Promise<boolean> {
    const code = await API.provider.getCode(address);

    return code !== '0x';
}

export default isContract;
