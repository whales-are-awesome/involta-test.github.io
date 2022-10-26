interface IValue {
    [key: string]: any
}

function removeUnderscoreKeys(value: IValue) {
    return Object.fromEntries(
        Object.entries(value)
            .map(item => [item[0].startsWith('_') ? item[0].replace('_', ''): item[0], item[1]])
    )
}

export default removeUnderscoreKeys;
