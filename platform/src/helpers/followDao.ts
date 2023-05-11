import sign from '@/helpers/sign';
import DaoService from '@/services/DaoService';
import emitter from '@/plugins/mitt';
import { notify } from '@kyvg/vue3-notification';
import { store } from '@/store';
import { uuidv4 } from '@/helpers/uuid';
import { NetworksType } from '@/types/networks';

async function followDao(name: string, address: string, network: NetworksType, alert: any, isUnfollow = false) {
    const actionText = isUnfollow ? 'unfollow' : 'follow';

    const text = [
        `By signing this message you will ${ actionText } "${ name || address }"`,
        '\n',
        'This request will not trigger a blockchain transaction or cost any gas fees.' +
        '\n',
        'Wallet address: ' + store.state.wallet.address,
        'Nonce: ' + uuidv4()
    ].join('\n')
    const [signInfo, err] = await sign(text);

    if (err) {
        return [null, err] as const;
    }

    const [response, error] = await DaoService.follow[isUnfollow ? 'unfollow' : 'follow'](
        {
            address,
            network
        },
        {
            headers: {
                'X-Auth-Hash': signInfo!.hash,
                'X-Auth-Signature': signInfo!.sign
            }
        }
    );

    if (!error) {
        notify({
            title: 'Success',
            text: `You have successfully ${ isUnfollow ? 'unfollowed' : 'followed' } the dao`,
            data: {
                view: 'shadow',
                theme: 'success'
            }
        });

        emitter.emit('daoFollowed');
    } else {
        notify({
            title: 'Error',
            text: 'Something go wrong',
            data: {
                view: 'shadow',
                theme: 'alert'
            }
        });
    }

    return [response, error] as const;
}

export default followDao;
