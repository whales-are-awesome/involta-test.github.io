import sign from '@/helpers/sign';
import FollowerService from '@/services/FollowerService';
import { store } from '@/store';
import emitter from '@/plugins/mitt';

async function followDao(address: string, network: string, alert: any) {
    const [signInfo, err] = await sign('Do you want to follow this dao?');

    if (err) {
        return [null, err] as const;
    }

    const [response, error] = await FollowerService.followDao(
        {
            address,
            network
        },
        {
            headers: {
                'Auth-Hash': signInfo!.hash,
                'Auth-Signature': signInfo!.sign,
                'Auth-Address': store.state.wallet.address as string
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
