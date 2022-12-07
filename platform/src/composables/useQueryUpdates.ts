import { isEqual } from 'lodash';
import { watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

function useQueryUpdates(formData: any) {
    const route = useRoute();
    const router = useRouter();

    watch(formData.value, (val: any, prevVal: any) => {
        if (isEqual(val, prevVal)) {
            updateQuery();
        }
    });

    function updateQuery() {
        router.push({ name: route.name!, query: { ...route.query, ...formData.value } });
    }
}

export default useQueryUpdates;
