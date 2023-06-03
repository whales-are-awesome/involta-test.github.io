interface IItem<T> {
    id: T
}

function getQueryParam<T>(queryParamId: any | null, options: IItem<T>[]): T {
    const find = queryParamId && options.find(item => item.id === queryParamId || +item.id === +queryParamId);

    if (find) {
        return find.id;
    }

    return options[0].id;
}

export default getQueryParam;
