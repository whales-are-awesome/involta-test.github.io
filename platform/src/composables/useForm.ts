import { ref, Ref, watch, computed } from 'vue';
import _ from 'lodash';

interface IProps {
    [key: string]: {
        value: any
        required?: string
        pattern?: ICheckTypeValue<RegExp>
    }
}

interface IResult {
    checkErrors: () => boolean
    errors: Ref<{
        [key: string]: any
    }>
    data: Ref<{
        [key: string]: any
    }>
}

type Result = [
    IResult['data'],
    IResult['errors'],
    IResult['checkErrors']
]

interface ICheckTypeValue<T> {
    value?: T
    text: string
}

function useForm(props: IProps): Result {
    const errors: IResult['errors'] = ref({});
    const data: IResult['data'] = ref(
        Object.fromEntries(
            Object.entries(props)
                .map(item => [item[0], item[1].value])
        )
    );
    const formData = computed(() => _.cloneDeep(data.value));

    watch(formData, (newValue, prevValue) => {
        for (const key in newValue) {
            const newItem = newValue[key];
            const prevtem = prevValue[key];

            if (newItem !== prevtem) {
                const newErrors = { ...errors.value };

                delete newErrors[key];

                errors.value = { ...newErrors };
            }
        }
    });

    function checkErrors(): ReturnType<IResult['checkErrors']> {
        for (const key in props) {
            const field = props[key];
            const item = data.value[key];

            if (field.required) {
                if (_.isEmpty(item)) {
                    errors.value[key] = field.required;

                    continue;
                } else {
                    delete errors.value[key];
                }
            }

            if (field.pattern?.value) {
                if (!field.pattern.value.test(item)) {
                    errors.value[key] = field.pattern.text;

                    continue;
                } else {
                    delete errors.value[key];
                }
            }
        }

        return !!Object.keys(errors.value).length;
    }

    return [data, errors, checkErrors];
}



export default useForm
