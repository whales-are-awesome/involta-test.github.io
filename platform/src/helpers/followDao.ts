import sign from '@/helpers/sign';
import DaoFactoryService from '@/services/DaoFactoryService';
import { store } from '@/store';
import emitter from '@/plugins/mitt';

async function followDao(address: string, network: string, alert: any) {
    const [signInfo, err] = await sign('Do you want to follow this dao?');

    if (err) {
        return [null, err] as const;
    }

    const [response, error] = await DaoFactoryService.followDao(
        {
            address,
            network
        },
        {
            account: store.state.wallet.address as string
        },
        {
            headers: {
                'Auth-Hash': signInfo!.hash,
                'Auth-Signature': signInfo!.sign
            }
        }
    );

    if (!error) {
        alert({
            title: 'Success!',
            text: 'You have successfully followed the dao',
            buttonText: 'OK',
            status: 'success'
        });

        emitter.emit('daoFollowed');
    } else {
        alert({
            title: 'Warning message!',
            text: 'Something go wrong',
            buttonText: 'OK',
            status: 'error'
        })
    }

    return [response, error] as const;
}

export default followDao;
