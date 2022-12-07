import { useRouter } from  'vue-router';
import API from  '@/helpers/api';
import useCookies from  '@/composables/useCookies';
import useLayer from  '@/composables/useLayer';
import { IDaoTransactionCookie } from  '@/types/dao';
import emitter from '@/plugins/mitt';

function useWatchForCreatedDaos() {
    const cookies = useCookies();
    const layer = useLayer();

    function watch() {
        setInterval(() => {
            const transactions: IDaoTransactionCookie[] = cookies.get('pendingTransactions') || [];

            transactions.forEach(async item => {
                const receipt = await API.provider.getTransactionReceipt(item.hash);

                if (receipt) {
                    const address = receipt?.logs[0].address || null;

                    deleteTransaction(item.hash);
                    await showMessage(address);
                }
            })
        }, 5000);
    }

    function add(dao: IDaoTransactionCookie) {
        const transactions: IDaoTransactionCookie[] = cookies.get('pendingTransactions') || [];

        cookies.set('pendingTransactions', JSON.stringify([...transactions, dao]));
    }

    async function showMessage(address: string) {
        const router = useRouter();

        if (address) {
            const isCreate = await layer.alert({
                title: 'Dao was created!',
                text: 'You’ve <strong>successfully created new DAO</strong>. You can add SubDAOs, manage proposals and use Dapps on the page of your DAO any time.',
                buttonText: 'Create new SubDAO',
                status: 'success'
            });

            emitter.emit('daoCreated');

            if (isCreate) {
                layer.open('CreateSubDaoLayer', { parentDaoAddress: address })
            }
        } else {
            const isTake = await layer.alert({
                title: 'Dao wasn\'t created!',
                text: 'The <strong>Transaction was cancelled</strong> due current mistake',
                buttonText: 'Take me Home',
                status: 'error'
            })

            if (isTake) {
                router.push({ name: 'home' });
            }
        }
    }

    function deleteTransaction(hash: string) {
        const transactions: IDaoTransactionCookie[] = cookies.get('pendingTransactions');
        const transactionIndex = transactions.findIndex(item => item.hash === hash);

        transactions.splice(transactionIndex, 1);

        cookies.set('pendingTransactions', transactions);
    }

    return {
        watch,
        add
    }
}

export default useWatchForCreatedDaos;

// 0x74dfbff8ec36a1a2ccafe92837d4d3a4722cecf417af67a078045e195419c46a
