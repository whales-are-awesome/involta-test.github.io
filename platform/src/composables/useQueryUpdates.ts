import { watch, computed } from 'vue';
import { isEqual } from 'lodash';
import { useRoute, useRouter } from 'vue-router';

interface IFormData {
    [key: string]: any
    offset?: number
    limit?: number
}

function useQueryUpdates(formData: IFormData, includes?: string[]) {
    const route = useRoute();
    const router = useRouter();

    const formDataCached = computed(() => JSON.parse(JSON.stringify(formData.value)));

    watch(() => formDataCached.value, (current, prev) => {
        if (formData.value.offset && formData.value.offset !== 0) {
            formData.value.offset = 0;

            return;
        }
        if (!isEqual(current, prev)) {
            updateQuery();
        }
    });

    function updateQuery() {
        const resultQuery = { ...formData.value };

        includes?.forEach(item => {
            if (item in route.query && !(item in resultQuery)) {
                resultQuery[item] = route.query[item];
            }
        });

        delete resultQuery.limit;
        delete resultQuery.offset;

        for (const key in resultQuery) {
            if (resultQuery[key] === '' || resultQuery[key] === null) {
                delete resultQuery[key];
            }
        }

        router.push({ name: route.name!, query: resultQuery, params: route.params });
    }
}

export default useQueryUpdates;
