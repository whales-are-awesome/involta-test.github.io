import { useRouter } from  'vue-router';
import API from  '@/helpers/api';
import useCookies from  '@/composables/useCookies';
import useLayer from  '@/composables/useLayer';
import { IDaoTransactionCookie } from  '@/types/dao';
import emitter from '@/plugins/mitt';
import sign from '@/helpers/sign';
import { uuidv4 } from '@/helpers/uuid';
import DaoService from '@/services/DaoService';
import { store } from '@/store';
import { notify } from '@kyvg/vue3-notification';

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
        if (address) {
            await layer.alert({
                title: 'Dao was created!',
                text: 'You’ve successfully created a new DAO. Sign the message in your wallet to update it\'s metadata.',
                buttonText: 'Sign',
                status: 'success',
                callback: () => tryToPutData(address, data)
            });

            emitter.emit('daoCreated');
        } else {
            notify({
                text: 'The <strong>transaction was cancelled</strong>',
                data: {
                    view: 'shadow',
                    theme: 'alert'
                }
            });
        }
    }

    function deleteTransaction(hash: string) {
        const transactions: IDaoTransactionCookie[] = cookies.get('pendingTransactions');
        const transactionIndex = transactions.findIndex(item => item.hash === hash);

        transactions.splice(transactionIndex, 1);

        cookies.set('pendingTransactions', transactions);
    }

    async function putData(address: string, data: IDaoTransactionCookie, signInfo: Awaited<ReturnType<typeof sign>>[0]) {
        return DaoService.changeDao(
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
        const text = [
            'By signing this message you will update DAO metadata to:\n',
            'Name: ' + data.name,
            'Description: ' + data.description,
            'Link: ' + data.link + '\n',
            'This request will not trigger a blockchain transaction or cost any gas fees.\n',
            'Wallet address: ' + store.state.wallet.address,
            'Nonce: ' + uuidv4()
        ].join('\n');

        const [signInfo, err] = await sign(text);


        if (err) {
            return;
        }

        const [_, error] = await putData(address, data, signInfo);

        if (!error) {
            notify({
                title: 'Success',
                text: 'You\'ve successfully update dao metadata',
                data: {
                    view: 'shadow',
                    theme: 'success'
                }
            });
        } else {
            notify({
                title: 'Error',
                text: 'Dao is not indexed yet. Please wait some time for dao to be indexed',
                data: {
                    view: 'shadow',
                    theme: 'alert'
                }
            });
        }

        const int = setInterval(async() => {
            const [response] = await putData(address, data, signInfo);

            if (response) {
                clearInterval(int);

                notify({
                    title: 'Success',
                    text: 'You\'ve successfully update dao metadata',
                    data: {
                        view: 'shadow',
                        theme: 'success'
                    }
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
