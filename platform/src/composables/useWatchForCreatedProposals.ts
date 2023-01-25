import API from  '@/helpers/api';
import useCookies from  '@/composables/useCookies';
import { IProposalTransactionCookie } from  '@/types/services/ProposalService';
import emitter from '@/plugins/mitt';
import { notify } from '@kyvg/vue3-notification';

function useWatchForCreatedProposals() {
    const cookies = useCookies();

    function watch() {
        setInterval(() => {
            const transactions: IProposalTransactionCookie[] = cookies.get('pendingProposalTransactions') || [];

            transactions.forEach(async item => {
                const receipt = await API.provider.getTransactionReceipt(item.hash);

                if (!receipt) return;

                const address = receipt.logs[0].address as string;

                deleteTransaction(item.hash);

                await showMessage(address, item);
            })
        }, 2000);
    }

    function add(dao: IProposalTransactionCookie) {
        const transactions: IProposalTransactionCookie[] = cookies.get('pendingProposalTransactions') || [];

        cookies.set('pendingProposalTransactions', JSON.stringify([...transactions, dao]));
    }

    async function showMessage(address: string, data: IProposalTransactionCookie) {
        if (address) {
            notify({
                title: 'Success',
                text: `The proposal <a>${ data.name }</a> was created.`,
                data: {
                    view: 'shadow',
                    theme: 'success'
                }
            });

            emitter.emit('proposalCreated');
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
        const transactions: IProposalTransactionCookie[] = cookies.get('pendingProposalTransactions');
        const transactionIndex = transactions.findIndex(item => item.hash === hash);

        transactions.splice(transactionIndex, 1);

        cookies.set('pendingProposalTransactions', transactions);
    }

    return {
        watch,
        add
    }
}

export default useWatchForCreatedProposals;
