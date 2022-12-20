import { useRouter } from  'vue-router';
import API from  '@/helpers/api';
import useCookies from  '@/composables/useCookies';
import useLayer from  '@/composables/useLayer';
import { IDaoTransactionCookie } from  '@/types/dao';
import emitter from '@/plugins/mitt';
import sign from '@/helpers/sign';
import DaoFactoryService from '@/services/DaoFactoryService';

function useWatchForCreatedDaos() {
    const cookies = useCookies();
    const layer = useLayer();

    function watch() {
        setInterval(() => {
            const transactions: IDaoTransactionCookie[] = cookies.get('pendingTransactions') || [];

            transactions.forEach(async item => {
                const receipt = await API.provider.getTransactionReceipt(item.hash);

                if (!receipt) return;

                const address = receipt.logs[0].address as string;

                deleteTransaction(item.hash);

                await showMessage(address, item);
            })
        }, 2000);
    }

    function add(dao: IDaoTransactionCookie) {
        const transactions: IDaoTransactionCookie[] = cookies.get('pendingTransactions') || [];

        cookies.set('pendingTransactions', JSON.stringify([...transactions, dao]));
    }

    async function showMessage(address: string, data: IDaoTransactionCookie) {
        const router = useRouter();

        if (address) {
            await layer.alert({
                title: 'Dao was created!',
                text: 'You’ve <strong>successfully created new DAO</strong>. We need your sign to put it\'s data',
                buttonText: 'Sign',
                status: 'success',
                callback: () => tryToPutData(address, data)
            });

            emitter.emit('daoCreated');
        } else {
            const isTake = await layer.alert({
                title: 'Dao wasn\'t created!',
                text: 'The <strong>Transaction was cancelled</strong> due current mistake',
                buttonText: 'Take me Home',
                status: 'error'
            });

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

    async function putData(address: string, data: IDaoTransactionCookie, signInfo: Awaited<ReturnType<typeof sign>>[0]) {
        return DaoFactoryService.changeDao(
            {
                address,
                network: 'goerli'
            },
            {
                name: data.name,
                description: data.description,
                link: data.link,
            },
        {
                headers: {
                    'Auth-Hash': signInfo!.hash,
                    'Auth-Signature': signInfo!.sign
                }
            }
        );
    }

    async function tryToPutData(address: string, data: IDaoTransactionCookie) {
        const [signInfo, err] = await sign('Put data?');

        if (err) {
            return;
        }

        const [_, error] = await putData(address, data, signInfo);

        if (!error) {
            await layer.alert({
                title: 'Success',
                text: `Your ${ address } dao was created`,
                buttonText: 'OK',
                status: 'success'
            });
        }

        layer.alert({
            title: 'Dao is not indexed yet.',
            text: 'Please wait some time for dao to be indexed',
            buttonText: 'OK',
            status: 'error'
        });

        const int = setInterval(async() => {
            const [response] = await putData(address, data, signInfo);

            if (response) {
                clearInterval(int);

                await layer.alert({
                    title: 'Dao was successfuly indexed',
                    text: `Index process of ${ address } dao was success`,
                    buttonText: 'OK',
                    status: 'success'
                });
            }
        }, 5000);
    }

    return {
        watch,
        add
    }
}

export default useWatchForCreatedDaos;

// 0x74dfbff8ec36a1a2ccafe92837d4d3a4722cecf417af67a078045e195419c46a
