import { computed, watch, Ref } from 'vue';
import { useFetchDataWithTotal } from '@/composables/useFetchData';
import { INormalizedMessageAsMessenger, IMessageQuery } from '@/types/services/MessageService';
import MessageService from '@/services/MessageService';

function useMessageItems(_data: Ref<IMessageQuery> | IMessageQuery) {
    const items = useFetchDataWithTotal<INormalizedMessageAsMessenger>();
    const dataResult = computed<IMessageQuery>(() => {
        const data = 'value' in _data ? _data.value : _data;

        return {
            ...data,
            offset: data.offset || 0
        }
    });

    fetchItems();
    watch(dataResult, fetchItems);
    async function fetchItems(val?: IMessageQuery, prevVal?: IMessageQuery) {
        const isAddMore = val?.offset !== prevVal?.offset && val?.offset !== 0;

        items.value.pending = true;
        items.value.cancel();

        const [data, error, cancel] = await MessageService.sampleItems.fetch(dataResult.value).messenger();

        if (!data) {
            items.value.pending = false;
            items.value.error = error;

            console.log(error);

            await fetchItems(val, prevVal);

            return;
        }

        if (isAddMore) {
            items.value.data?.items.push(...(data?.items || []))
        } else {
            //@ts-ignore
            items.value.data = data;
        }

        items.value = { ...items.value, cancel, pending: false };
    }

    return [items, fetchItems] as const;
}

export default useMessageItems;
