import { watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

function useQueryUpdates(formData: any, includes?: string[]) {
    const route = useRoute();
    const router = useRouter();

    watch([formData.value, () => formData.value], () => {
        updateQuery();
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
            if (resultQuery[key] === '') {
                delete resultQuery[key];
            }
        }

        router.push({ name: route.name!, query: resultQuery, params: route.params });
    }
}

export default useQueryUpdates;
