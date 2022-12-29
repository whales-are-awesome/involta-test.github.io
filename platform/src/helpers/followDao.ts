import sign from '@/helpers/sign';
import FollowerService from '@/services/FollowerService';
import emitter from '@/plugins/mitt';
import { notify } from '@kyvg/vue3-notification';

async function followDao(address: string, network: string, alert: any, isDelete = false) {
    const [signInfo, err] = await sign(`Do you want to ${ isDelete ? 'delete' : 'follow' } this dao?`);

    if (err) {
        return [null, err] as const;
    }

    const [response, error] = await FollowerService[isDelete ? 'unFollowDao' : 'followDao'](
        {
            address,
            network
        },
        {
            headers: {
                'Auth-Hash': signInfo!.hash,
                'Auth-Signature': signInfo!.sign
            }
        }
    );

    if (!error) {
        notify({
            title: `You have successfully ${ isDelete ? 'unfollowed' : 'followed' } the dao`
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
